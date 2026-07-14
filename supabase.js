/* Shared Supabase client for Lern-App (anon key – use RLS carefully) */
(function (global) {
  const SB_URL = 'https://bjhdiiimrhvgnegvcpci.supabase.co';
  const SB_ANON =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqaGRpaWltcmh2Z25lZ3ZjcGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMTkzNTEsImV4cCI6MjA5MDY5NTM1MX0.xtra1oFgbM0a6rT6eOEaPO0_j0mpZnyGKYFFbPkK9nc';

  const PLAYER_KEY = 'learn_player_name';
  const PREFIX = 'learn:quiz:';
  const PLAYER_PREFIX = 'learn:player:';
  const GLOBAL_STATS_KEY = 'learn:stats:global';
  const VISIT_PREFIX = 'learn:visit:';
  // Simple admin password for school dashboard (change if needed)
  const ADMIN_PASS = 'H2FO3T';

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

  function clean(s) {
    return String(s || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(
        /[^a-z0-9._:\-àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi,
        ''
      );
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

  function clearPlayer() {
    try {
      localStorage.removeItem(PLAYER_KEY);
    } catch (_) {}
  }

  function scoreKey(subject, quiz, player) {
    return PREFIX + clean(subject) + ':' + clean(quiz) + ':' + clean(player);
  }

  function playerKey(player) {
    return PLAYER_PREFIX + clean(player);
  }

  async function getConfig(key) {
    const rows = await sbFetch(
      '/rest/v1/config?key=eq.' + encodeURIComponent(key) + '&select=key,value,updated_at'
    );
    return rows && rows[0] ? rows[0] : null;
  }

  async function upsertConfig(key, value) {
    const rows = await sbFetch('/rest/v1/config?on_conflict=key', {
      method: 'POST',
      headers: headers({ Prefer: 'return=representation,resolution=merge-duplicates' }),
      body: JSON.stringify({ key: key, value: value }),
    });
    return (rows && rows[0]) || { key: key, value: value };
  }

  async function listConfig(like, limit) {
    const lim = limit || 200;
    return (
      (await sbFetch(
        '/rest/v1/config?key=like.' +
          encodeURIComponent(like) +
          '&select=key,value,updated_at&order=updated_at.desc&limit=' +
          lim
      )) || []
    );
  }

  async function saveQuizScore({ subject, quiz, correct, total, player }) {
    const p = String(player || getPlayer() || '').trim();
    if (!p) throw new Error('Bitte Nickname eingeben / Hãy nhập nickname');
    const t = Number(total) || 0;
    const c = Number(correct) || 0;
    const pct = t ? Math.round((c / t) * 100) : 0;
    const at = new Date().toISOString();
    const key = scoreKey(subject, quiz, p);

    let history = [];
    try {
      const prev = await getConfig(key);
      if (prev && prev.value && Array.isArray(prev.value.history)) {
        history = prev.value.history.slice(-29);
      }
    } catch (_) {}

    history.push({ at: at, correct: c, total: t, pct: pct });

    const value = {
      player: p,
      subject: subject,
      quiz: quiz,
      correct: c,
      total: t,
      pct: pct,
      at: at,
      history: history,
      attempts: history.length,
      app: 'on-thi',
    };

    await upsertConfig(key, value);

    // also mirror into player profile quiz summary
    try {
      await touchPlayerQuiz(p, { subject, quiz, correct: c, total: t, pct, at });
    } catch (_) {}

    return value;
  }

  async function loadLeaderboard({ subject, quiz, limit }) {
    const lim = limit || 10;
    const like = PREFIX + clean(subject) + ':' + clean(quiz) + ':%';
    const rows = await listConfig(like, 100);
    const list = (rows || [])
      .map((r) => r.value || {})
      .filter((v) => v && v.player != null)
      .map((v) => ({
        player: v.player,
        correct: Number(v.correct) || 0,
        total: Number(v.total) || 0,
        pct: Number(v.pct) || 0,
        at: v.at || '',
        attempts: Number(v.attempts) || (Array.isArray(v.history) ? v.history.length : 1),
      }));
    list.sort(
      (a, b) =>
        b.pct - a.pct || b.correct - a.correct || String(b.at).localeCompare(String(a.at))
    );
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

  async function getPlayerProfile(player) {
    const p = String(player || getPlayer() || '').trim();
    if (!p) return null;
    const row = await getConfig(playerKey(p));
    return row ? row.value : null;
  }

  async function loadPlayerHistory(player) {
    const p = String(player || getPlayer() || '').trim();
    if (!p) return { profile: null, quizzes: [] };
    const profile = await getPlayerProfile(p);
    // all quiz keys for this player
    const rows = await listConfig(PREFIX + '%:' + clean(p), 100);
    // filter exact player suffix match
    const quizzes = (rows || [])
      .map((r) => {
        const v = r.value || {};
        return {
          key: r.key,
          subject: v.subject || '',
          quiz: v.quiz || '',
          correct: Number(v.correct) || 0,
          total: Number(v.total) || 0,
          pct: Number(v.pct) || 0,
          at: v.at || r.updated_at || '',
          attempts: Number(v.attempts) || (Array.isArray(v.history) ? v.history.length : 0),
          history: Array.isArray(v.history) ? v.history : [],
        };
      })
      .filter((q) => clean(q.key.split(':').slice(-1)[0]) === clean(p))
      .sort((a, b) => String(b.at).localeCompare(String(a.at)));
    return { profile: profile, quizzes: quizzes };
  }

  async function touchPlayerQuiz(player, attempt) {
    const p = String(player || '').trim();
    if (!p) return null;
    const key = playerKey(p);
    let profile = null;
    try {
      const row = await getConfig(key);
      profile = row && row.value ? row.value : null;
    } catch (_) {}
    const now = new Date().toISOString();
    if (!profile) {
      profile = {
        player: p,
        created_at: now,
        last_seen: now,
        visits: 0,
        quiz_attempts: 0,
        quizzes: {},
        app: 'on-thi',
      };
    }
    profile.last_seen = now;
    profile.quiz_attempts = (Number(profile.quiz_attempts) || 0) + 1;
    const qk = clean(attempt.subject) + ':' + clean(attempt.quiz);
    const prev = (profile.quizzes && profile.quizzes[qk]) || null;
    const bestPct = prev ? Math.max(Number(prev.best_pct) || 0, attempt.pct) : attempt.pct;
    profile.quizzes = profile.quizzes || {};
    profile.quizzes[qk] = {
      subject: attempt.subject,
      quiz: attempt.quiz,
      last_correct: attempt.correct,
      last_total: attempt.total,
      last_pct: attempt.pct,
      best_pct: bestPct,
      attempts: (prev ? Number(prev.attempts) || 0 : 0) + 1,
      last_at: attempt.at,
    };
    await upsertConfig(key, profile);
    return profile;
  }

  async function loginOrRegister(nickname) {
    const p = String(nickname || '').trim().slice(0, 32);
    if (!p) throw new Error('Nickname không được trống');
    if (p.length < 2) throw new Error('Nickname tối thiểu 2 ký tự');
    setPlayer(p);
    const key = playerKey(p);
    const now = new Date().toISOString();
    let existing = null;
    try {
      const row = await getConfig(key);
      existing = row && row.value ? row.value : null;
    } catch (_) {}

    const isNew = !existing;
    const profile = existing || {
      player: p,
      created_at: now,
      last_seen: now,
      visits: 0,
      quiz_attempts: 0,
      quizzes: {},
      app: 'on-thi',
    };
    profile.player = p;
    profile.last_seen = now;
    profile.visits = (Number(profile.visits) || 0) + 1;
    await upsertConfig(key, profile);

    // visit log (one row per visit event, capped key by timestamp)
    const visitKey = VISIT_PREFIX + now.slice(0, 10) + ':' + clean(p) + ':' + Date.now();
    try {
      await upsertConfig(visitKey, {
        player: p,
        at: now,
        day: now.slice(0, 10),
        app: 'on-thi',
      });
    } catch (_) {}

    // global counters
    try {
      const gRow = await getConfig(GLOBAL_STATS_KEY);
      const g = (gRow && gRow.value) || {
        total_visits: 0,
        unique_players: 0,
        app: 'on-thi',
      };
      g.total_visits = (Number(g.total_visits) || 0) + 1;
      if (isNew) g.unique_players = (Number(g.unique_players) || 0) + 1;
      g.updated_at = now;
      g.last_player = p;
      await upsertConfig(GLOBAL_STATS_KEY, g);
    } catch (_) {}

    const history = await loadPlayerHistory(p);
    return { player: p, isNew: isNew, profile: profile, history: history };
  }

  async function getAdminStats() {
    const [players, quizzes, visits, globalRow] = await Promise.all([
      listConfig(PLAYER_PREFIX + '%', 500),
      listConfig(PREFIX + '%', 500),
      listConfig(VISIT_PREFIX + '%', 500),
      getConfig(GLOBAL_STATS_KEY),
    ]);

    const playerList = (players || [])
      .map((r) => r.value || {})
      .filter((v) => v && v.player)
      .map((v) => ({
        player: v.player,
        visits: Number(v.visits) || 0,
        quiz_attempts: Number(v.quiz_attempts) || 0,
        created_at: v.created_at || '',
        last_seen: v.last_seen || '',
        quizzes: v.quizzes || {},
      }))
      .sort((a, b) => String(b.last_seen).localeCompare(String(a.last_seen)));

    const quizList = (quizzes || [])
      .map((r) => ({ key: r.key, ...(r.value || {}), updated_at: r.updated_at }))
      .filter((v) => v.player)
      .sort((a, b) => String(b.at || b.updated_at || '').localeCompare(String(a.at || a.updated_at || '')));

    const visitList = (visits || [])
      .map((r) => r.value || {})
      .filter((v) => v && v.player)
      .sort((a, b) => String(b.at || '').localeCompare(String(a.at || '')));

    // unique visitors from player profiles (more reliable than global counter races)
    const unique = playerList.length;
    const totalVisits = playerList.reduce((s, p) => s + (Number(p.visits) || 0), 0);
    const totalQuizAttempts = quizList.reduce(
      (s, q) => s + (Number(q.attempts) || (Array.isArray(q.history) ? q.history.length : 1)),
      0
    );

    // by subject/quiz aggregates
    const byQuiz = {};
    for (const q of quizList) {
      const k = (q.subject || '?') + ' / ' + (q.quiz || '?');
      if (!byQuiz[k]) byQuiz[k] = { label: k, players: 0, attempts: 0, avgPct: 0, _sum: 0 };
      byQuiz[k].players += 1;
      byQuiz[k].attempts += Number(q.attempts) || 1;
      byQuiz[k]._sum += Number(q.pct) || 0;
    }
    const quizAgg = Object.values(byQuiz).map((x) => {
      x.avgPct = x.players ? Math.round(x._sum / x.players) : 0;
      delete x._sum;
      return x;
    });

    return {
      unique_players: unique,
      total_visits: totalVisits,
      visit_events: visitList.length,
      total_quiz_rows: quizList.length,
      total_quiz_attempts: totalQuizAttempts,
      global: (globalRow && globalRow.value) || null,
      players: playerList,
      quizzes: quizList,
      visits: visitList.slice(0, 100),
      quizAgg: quizAgg,
    };
  }

  function checkAdminPassword(pass) {
    return String(pass || '') === ADMIN_PASS;
  }

  async function ping() {
    await sbFetch('/rest/v1/config?select=key&limit=1');
    return true;
  }

  global.LearnDB = {
    url: SB_URL,
    adminPass: ADMIN_PASS,
    getPlayer,
    setPlayer,
    clearPlayer,
    saveQuizScore,
    loadLeaderboard,
    loadPlayerHistory,
    getPlayerProfile,
    loginOrRegister,
    getAdminStats,
    checkAdminPassword,
    ping,
  };
})(typeof window !== 'undefined' ? window : globalThis);
