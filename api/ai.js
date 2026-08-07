// Vercel serverless proxy: AI chat
// Mặc định: gọi gateway opencode.ai (Zen, OpenAI-compatible) — cùng nguồn CLI opencode.
// Nếu đặt AI_ANTHROPIC=1: gọi Anthropic /v1/messages (dùng cho hhtechapi.net, api.anthropic.com...)
//
// Env (Settings -> Environment Variables):
//   AI_BASE_URL    = https://opencode.ai/zen/v1   (hoặc gateway Anthropic nếu AI_ANTHROPIC=1)
//   AI_AUTH_TOKEN  = token gateway (open code: key "opencode" trong ~/.local/share/opencode/auth.json)
//   AI_MODEL       = e.g. deepseek-v4-flash-free
//   AI_ANTHROPIC   = "1" khi base là Anthropic-compatible (tùy chọn)
//   AI_WEBSEARCH   = "0" để tắt tìm kiếm ngoài khi tài liệu không có (mặc định bật)
// Vision (đọc ảnh):
//   AI_VISION_BASE_URL   = https://openrouter.ai/api/v1
//   AI_VISION_AUTH_TOKEN = key OpenRouter (sk-or-v1-...)
//   AI_VISION_MODEL      = google/gemini-2.5-flash

const stripThought = (t) =>
  String(t || '')
    .replace(/^\+?\s*Thought:\s*[\d.]+\s*ms\s*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const stripTags = (s) =>
  String(s || '')
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const webSearch = async (q) => {
  try {
    const url = 'https://www.bing.com/search?q=' + encodeURIComponent(String(q || '').slice(0, 200)) + '&format=rss&count=6';
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!r.ok) return [];
    const xml = await r.text();
    const items = [];
    const re = /<item>([\s\S]*?)<\/item>/g;
    let m;
    while ((m = re.exec(xml)) && items.length < 4) {
      const t = /<title>([\s\S]*?)<\/title>/.exec(m[1]);
      const d = /<description>([\s\S]*?)<\/description>/.exec(m[1]);
      const l = /<link>([\s\S]*?)<\/link>/.exec(m[1]);
      const title = stripTags(t ? t[1] : '');
      const desc = stripTags(d ? d[1] : '');
      const link = (l ? l[1] : '').trim();
      if (title || desc) items.push([title || desc.slice(0, 60), desc, link].filter(Boolean).join(' — '));
    }
    return items;
  } catch (_) { return []; }
};

const extractJson = (text) => {
  if (!text) return null;
  let tt = String(text).replace(/```json?\s*([\s\S]*?)```/i, '$1').trim();
  let tj = null;
  try { tj = JSON.parse(tt); } catch (_) {}
  if (!tj) {
    const a = tt.indexOf('{'), b = tt.lastIndexOf('}');
    if (a >= 0 && b > a) { try { tj = JSON.parse(tt.slice(a, b + 1)); } catch (_) {} }
  }
  if (tj && typeof tj === 'object' && !Array.isArray(tj)) return JSON.stringify(tj);
  return null;
};

export default async function handler(req, res) {
  const base = (process.env.AI_BASE_URL || '').trim().replace(/\/+$/, '');
  const token = (process.env.AI_AUTH_TOKEN || '').trim();
  const model = (process.env.AI_MODEL || '').trim() || 'deepseek-v4-flash-free';
  const anthropic = (process.env.AI_ANTHROPIC || '').trim() === '1';

  const json = (code, obj) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(code).json(obj);
  };

  if (req.method === 'GET' || req.method === 'HEAD') {
    return json(200, { ok: !!(base && token), needsConfig: !(base && token) });
  }
  if (req.method !== 'POST') return json(405, { error: 'method not allowed' });

  let body;
  const raw = req.body || '';
  if (typeof raw === 'string') {
    try { body = JSON.parse(raw); } catch (_) { return json(400, { error: 'bad json' }); }
  } else if (typeof raw === 'object' && raw !== null) {
    body = raw;
  } else {
    return json(400, { error: 'bad body' });
  }

  if (!base || !token) {
    return json(200, { error: 'AI chưa cấu hình — chủ app cần thêm AI_BASE_URL / AI_AUTH_TOKEN trong Vercel env.', parts: [] });
  }

  const parts = Array.isArray(body.parts) ? body.parts : [];
  const messages = [];
  if (body.system) messages.push({ role: 'system', content: String(body.system) });
  for (const p of parts) {
    const role = p && (p.role === 'assistant' || p.role === 'user') ? p.role : 'user';
    const t = p && p.text != null ? String(p.text) : '';
    if (t.trim()) messages.push({ role: role, content: t });
  }
  messages.splice(0, Math.max(0, messages.length - 40));

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    };
    let text = '';
    const hasImage = parts.some((p) => p && p.image);
    if (hasImage) {
      const vtoken = (process.env.AI_VISION_AUTH_TOKEN || '').trim() || token;
      if (!(process.env.AI_VISION_BASE_URL || '').trim() || !vtoken) {
        return json(200, { error: 'AI chưa hỗ trợ đọc ảnh trên thiết bị này — chủ app cần thêm AI_VISION_BASE_URL / AI_VISION_AUTH_TOKEN.', parts: [] });
      }
      const vbaseRaw = (process.env.AI_VISION_BASE_URL || '').trim().replace(/\/+$/, '');
      const root = (vbaseRaw.replace(/\/(api\/)?v1(\/(chat\/completions|v1\/messages))?$/, '').replace(/\/+$/, '') || vbaseRaw);
      const vmodels = [];
      const vm1 = ((process.env.AI_VISION_MODEL || '').trim() || model || '').trim();
      if (vm1) vmodels.push(vm1);
      if (vmodels.indexOf('google/gemini-2.5-flash') === -1) vmodels.push('google/gemini-2.5-flash');
      const tries = [];
      const addT = (mode, url) => { if (!tries.some((t) => t[0] === mode && t[1] === url)) tries.push([mode, url]); };
      if (((process.env.AI_VISION_MODE || '').trim() === 'anthropic')) {
        for (const u of [vbaseRaw + '/v1/messages', root + '/v1/messages', root + '/api/v1/messages']) addT('anthropic', u);
        for (const u of [vbaseRaw + '/chat/completions', root + '/api/v1/chat/completions', root + '/v1/chat/completions']) addT('openai', u);
      } else {
        for (const u of [vbaseRaw + '/chat/completions', root + '/api/v1/chat/completions', root + '/v1/chat/completions']) addT('openai', u);
        for (const u of [vbaseRaw + '/v1/messages', root + '/v1/messages', root + '/api/v1/messages']) addT('anthropic', u);
      }
      let triedErr = '';
      const dbg = [];
      outer:
      for (const [vMode, vurl] of tries) {
        for (const vmodel of vmodels) {
        const content = [];
        if (vMode === 'anthropic') {
          for (const p of parts) {
            if (p && p.image) {
              const mm = /^data:([^;,]+);base64,(.+)$/.exec(String(p.image));
              const mt = mm ? mm[1] : 'image/jpeg';
              const data = mm ? mm[2] : String(p.image);
              content.push({ type: 'image', source: { type: 'base64', media_type: mt, data } });
            } else if (p && p.text) content.push({ type: 'text', text: String(p.text) });
          }
        } else {
          for (const p of parts) {
            if (p && p.image) content.push({ type: 'image_url', image_url: { url: String(p.image) } });
            else if (p && p.text) content.push({ type: 'text', text: String(p.text) });
          }
        }
        try {
          const vr = vMode === 'anthropic'
            ? await fetch(vurl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': vtoken,
                  'Authorization': 'Bearer ' + vtoken,
                  'anthropic-version': '2023-06-01',
                  'anthropic-dangerous-direct-browser-access': 'true',
                },
                body: JSON.stringify({ model: vmodel, max_tokens: 2048, messages: [{ role: 'user', content }] }),
              })
            : await fetch(vurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + vtoken },
                body: JSON.stringify({ model: vmodel, max_tokens: 2048, messages: [{ role: 'user', content }] }),
              });
          const vraw = await vr.text().catch(() => '');
          const vj = (() => { try { return JSON.parse(vraw); } catch (e) { return {}; } })();
          if (!vr.ok) {
            triedErr = (vj && vj.error && (vj.error.message || JSON.stringify(vj.error))) || ('gateway HTTP ' + vr.status);
            dbg.push({ m: vmodel, u: vurl, s: vr.status, e: (vj && vj.error && (vj.error.message || vj.error.code || JSON.stringify(vj.error))) || '' });
            continue;
          }
          if (vMode === 'anthropic') {
            text = (vj.content || []).filter((c) => c && c.type === 'text').map((c) => c.text).join('\n');
          } else {
            const vc0 = vj.choices && vj.choices[0] && vj.choices[0].message;
            text = (vc0 && vc0.content) || (vc0 && vc0.reasoning_content) || (vj.error && vj.error.message) || '';
          }
          if (text) break outer;
          dbg.push({ m: vmodel, u: vurl, s: vr.status, e: 'no-content', raw: vraw.slice(0, 200) });
          continue;
        } catch (e) { triedErr = String((e && e.message) || e); continue; }
        }
      }
      if (text) return json(200, { parts: [{ type: 'text', text: stripThought(text) || '' }] });
    return json(502, { error: 'AI đọc ảnh: ' + (triedErr || 'không có model khả dụng') });
  } else if (anthropic) {
      headers['x-api-key'] = token;
      headers['anthropic-version'] = '2023-06-01';
      headers['anthropic-dangerous-direct-browser-access'] = 'true';
      const r = await fetch(base + '/v1/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify({ model, max_tokens: 2048, messages }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        const msg = (j && j.error && (j.error.message || JSON.stringify(j.error))) || ('gateway HTTP ' + r.status);
        return json(502, { error: 'AI gateway: ' + msg });
      }
      text = (j.content || []).filter((c) => c && c.type === 'text').map((c) => c.text).join('\n');
    } else {
      const wantsJson = !!body.system && /\bJSON\b/.test(String(body.system));
      const chatAsk = async (msgsArr, wantJson) => {
        let payload = { model, max_tokens: 1600, messages: msgsArr };
        if (wantJson) payload.response_format = { type: 'json_object' };
        let r = await fetch(base + '/chat/completions', { method: 'POST', headers, body: JSON.stringify(payload) });
        let j = await r.json().catch(() => ({}));
        if (!r.ok && wantJson && (r.status === 400 || r.status === 404 || r.status === 422)) {
          try { delete payload.response_format; } catch (_) {}
          r = await fetch(base + '/chat/completions', { method: 'POST', headers, body: JSON.stringify(payload) });
          j = await r.json().catch(() => ({}));
        }
        if (!r.ok) {
          return { error: (j && j.error && (j.error.message || JSON.stringify(j.error))) || ('gateway HTTP ' + r.status) };
        }
        const c0 = j.choices && j.choices[0] && j.choices[0].message;
        return { text: (c0 && c0.content) || (c0 && c0.reasoning_content) || '' };
      };
      const ans = await chatAsk(messages, wantsJson);
      if (ans.error) return json(502, { error: 'AI gateway: ' + ans.error });
      text = ans.text;
      if (wantsJson && text) text = extractJson(text) || text;

      // Nếu câu trả lời báo "không có trong tài liệu" → tìm kiếm ngoài rồi trả lời lại
      const webOn = (process.env.AI_WEBSEARCH || '').trim() !== '0';
      if (webOn && wantsJson && text) {
        let o = null;
        try { o = JSON.parse(text); } catch (_) {}
        if (o && /không có trong tài liệu|ngoài tài liệu|không nằm trong tài liệu|không thuộc tài liệu|không có trong tài liệu ôn thi|nicht in den unterlagen|outside the (study )?documents/i.test(JSON.stringify(o))) {
          const lastUser = messages.filter((m) => m.role === 'user').pop() || { role: 'user', content: '' };
          const q = String(o.question || lastUser.content || '').replace(/^[-*#>\s]+/, '').slice(0, 200);
          const hits = await webSearch(q);
          if (hits.length) {
            const sysMsg = messages.filter((m) => m.role === 'system').slice(-1);
            const msgs2 = sysMsg.concat([lastUser, {
              role: 'user',
              content: '=== KẾT QUẢ TÌM KIẾM NGOÀI (bên ngoài tài liệu) ===\n' +
                hits.join('\n\n') +
                '\n\nHãy trả lời câu hỏi trên dựa vào kết quả tìm kiếm này, đưa nguồn (tên trang) vào references.',
            }]);
            const ans2 = await chatAsk(msgs2, true);
            if (!ans2.error && ans2.text) {
              const t2 = extractJson(ans2.text);
              if (t2) text = t2;
            }
          }
        }
      }
    }
    return json(200, { parts: [{ type: 'text', text: stripThought(text) || '' }] });
  } catch (e) {
    return json(502, { error: 'AI proxy: ' + String((e && e.message) || e) });
  }
}