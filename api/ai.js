// Vercel serverless proxy: AI chat (Anthropic-compatible gateway)
// Env (Settings -> Environment Variables):
//   AI_BASE_URL   = e.g. https://hhtechapi.net
//   AI_AUTH_TOKEN = gateway token (ANTHROPIC_AUTH_TOKEN / HHTECH_API_KEY)
//   AI_MODEL      = e.g. claude-sonnet-5 (optional)

export default async function handler(req, res) {
  const base = (process.env.AI_BASE_URL || '').trim().replace(/\/+$/, '');
  const token = (process.env.AI_AUTH_TOKEN || '').trim();
  const model = (process.env.AI_MODEL || '').trim() || 'claude-sonnet-5';

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
    return json(200, { error: 'AI chưa cấu hình — chủ app cần thêm AI_BASE_URL / AI_AUTH_TOKEN trong Vercel env.' });
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
    const r = await fetch(base + '/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': token,
        'Authorization': 'Bearer ' + token,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({ model: model, max_tokens: 2048, messages: messages }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      const msg = (j && j.error && (j.error.message || JSON.stringify(j.error))) || ('gateway HTTP ' + r.status);
      return json(502, { error: 'AI gateway: ' + msg });
    }
    const text = (j.content || []).filter((c) => c && c.type === 'text').map((c) => c.text).join('\n');
    return json(200, { parts: [{ type: 'text', text: text || '' }] });
  } catch (e) {
    return json(502, { error: 'AI proxy: ' + String((e && e.message) || e) });
  }
}