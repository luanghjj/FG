/* Shared Supabase client for Lern-App (anon key – RLS must protect data) */
(function (global) {
  const SB_URL = 'https://bjhdiiimrhvgnegvcpci.supabase.co';
  const SB_ANON =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqaGRpaWltcmh2Z25lZ3ZjcGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMTkzNTEsImV4cCI6MjA5MDY5NTM1MX0.xtra1oFgbM0a6rT6eOEaPO0_j0mpZnyGKYFFbPkK9nc';

  const PLAYER_KEY = 'learn_player_name';
  const PREFIX = 'learn:quiz:';

  function headers(extra) {
    return Object.assign(
      {
        apikey: SB_ANON,
        Authorization: 'Bearer ' + SB_ANON,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      extra || {}
    );
  }

  async function sbFetch(path, opts) {
    const res = await fetch(SB_URL + path, opts);
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (_) {
      data = text;
    }
    if (!res.ok) {
      const msg =
        (data && (data.message || data.error_description || data.hint)) ||
        res.statusText ||
        'Request failed';
      const err = new Error(msg);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  function getPlayer() {
    try {
      return (localStorage.getItem(PLAYER_KEY) || '').trim();
    } catch (_) {
      return '';
    }
  }

  function setPlayer(name) {
    const n = String(name || '').trim().slice(0, 32);
    try {
      if (n) localStorage.setItem(PLAYER_KEY, n);
      else localStorage.removeItem(PLAYER_KEY);
    } catch (_) {}
    return n;
  }

  function scoreKey(subject, quiz, player) {
    // config.key is text; keep it URL-safe-ish
    const clean = (s) =>
      String(s || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9._:\-àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi, '');
    return PREFIX + clean(subject) + ':' + clean(quiz) + ':' + clean(player);
  }

  async function saveQuizScore({ subject, quiz, correct, total, player }) {
    const p = String(player || getPlayer() || '').trim();
    if (!p) throw new Error('Bitte Namen eingeben / Hãy nhập tên');
    const t = Number(total) || 0;
    const c = Number(correct) || 0;
    const pct = t ? Math.round((c / t) * 100) : 0;
    const at = new Date().toISOString();
    const key = scoreKey(subject, quiz, p);

    // load previous history (best-effort)
    let history = [];
    try {
      const prev = await sbFetch(
        '/rest/v1/config?key=eq.' + encodeURIComponent(key) + '&select=value'
      );
      if (prev && prev[0] && prev[0].value && Array.isArray(prev[0].value.history)) {
        history = prev[0].value.history.slice(-19);
      }
    } catch (_) {}

    history.push({ at: at.slice(0, 10), correct: c, total: t, pct: pct });

    const value = {
      player: p,
      subject: subject,
      quiz: quiz,
      correct: c,
      total: t,
      pct: pct,
      at: at,
      history: history,
      app: 'on-thi',
    };

    // Upsert into flexible config table (key/value jsonb)
    const rows = await sbFetch('/rest/v1/config?on_conflict=key', {
      method: 'POST',
      headers: headers({
        Prefer: 'return=representation,resolution=merge-duplicates',
      }),
      body: JSON.stringify({ key: key, value: value }),
    });
    return (rows && rows[0] && rows[0].value) || value;
  }

  async function loadLeaderboard({ subject, quiz, limit }) {
    const lim = limit || 10;
    const sub = String(subject || '').toLowerCase();
    const qz = String(quiz || '').toLowerCase();
    // Prefix filter: learn:quiz:{subject}:{quiz}:
    const like = PREFIX + sub + ':' + qz + ':%';
    const rows = await sbFetch(
      '/rest/v1/config?key=like.' +
        encodeURIComponent(like) +
        '&select=key,value,updated_at&order=updated_at.desc&limit=100'
    );
    const list = (rows || [])
      .map((r) => r.value || {})
      .filter((v) => v && v.player != null)
      .map((v) => ({
        player: v.player,
        correct: Number(v.correct) || 0,
        total: Number(v.total) || 0,
        pct: Number(v.pct) || 0,
        at: v.at || '',
      }));
    // best pct, then correct, then recent
    list.sort((a, b) => b.pct - a.pct || b.correct - a.correct || String(b.at).localeCompare(String(a.at)));
    // unique players (keep best)
    const seen = new Set();
    const uniq = [];
    for (const row of list) {
      const k = String(row.player).toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      uniq.push(row);
      if (uniq.length >= lim) break;
    }
    return uniq;
  }

  async function ping() {
    // lightweight connectivity check
    await sbFetch('/rest/v1/config?select=key&limit=1');
    return true;
  }

  global.LearnDB = {
    url: SB_URL,
    getPlayer,
    setPlayer,
    saveQuizScore,
    loadLeaderboard,
    ping,
  };
})(typeof window !== 'undefined' ? window : globalThis);
