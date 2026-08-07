// Vercel serverless proxy: AI chat
// Mặc định: gọi gateway opencode.ai (Zen, OpenAI-compatible) — cùng nguồn CLI opencode.
// Nếu đặt AI_ANTHROPIC=1: gọi Anthropic /v1/messages (dùng cho hhtechapi.net, api.anthropic.com...)
//
// Env (Settings -> Environment Variables):
//   AI_BASE_URL    = https://opencode.ai/zen/v1   (hoặc gateway Anthropic nếu AI_ANTHROPIC=1)
//   AI_AUTH_TOKEN  = token gateway (open code: key "opencode" trong ~/.local/share/opencode/auth.json)
//   AI_MODEL       = e.g. deepseek-v4-flash-free
//   AI_ANTHROPIC   = "1" khi base là Anthropic-compatible (tùy chọn)

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
  try { body = JSON.parse(req.body || '{}'); } catch (_) { return json(400, { error: 'bad json' }); }

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
    if (anthropic) {
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
      const r = await fetch(base + '/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({ model, max_tokens: 2048, messages }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        const msg = (j && j.error && (j.error.message || JSON.stringify(j.error))) || ('gateway HTTP ' + r.status);
        return json(502, { error: 'AI gateway: ' + msg });
      }
      const c0 = j.choices && j.choices[0] && j.choices[0].message;
      text = (c0 && c0.content) || (c0 && c0.reasoning_content) || '';
    }
    return json(200, { parts: [{ type: 'text', text: text || '' }] });
  } catch (e) {
    return json(502, { error: 'AI proxy: ' + String((e && e.message) || e) });
  }
}