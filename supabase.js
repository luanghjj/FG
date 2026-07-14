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
  const SESSION_VISIT_KEY = 'learn_active_visit';
  // Simple admin password for school dashboard (change if needed)
  const ADMIN_PASS = 'H2FO3T';
  const HEARTBEAT_MS = 30000; // 30s

  let _hbTimer = null;
  let _activeVisit = null; // { key, player, startedAt, lastBeatAt }

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
    const options = opts ? Object.assign({}, opts) : {};
    // Always send apikey + Authorization (GET calls were missing this before)
    options.headers = headers(options.headers || {});
    const res = await fetch(SB_URL + path, options);
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

  const QUEUE_KEY = 'learn_score_queue_v1';

  function readQueue() {
    try {
      return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    } catch (_) {
      return [];
    }
  }
  function writeQueue(list) {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify((list || []).slice(-40)));
    } catch (_) {}
  }

  async function saveQuizScoreOnline({ subject, quiz, correct, total, player, at }) {
    const p = String(player || getPlayer() || '').trim();
    if (!p) throw new Error('Bitte Nickname eingeben');
    const t = Number(total) || 0;
    const c = Number(correct) || 0;
    const pct = t ? Math.round((c / t) * 100) : 0;
    const when = at || new Date().toISOString();
    const key = scoreKey(subject, quiz, p);

    let history = [];
    try {
      const prev = await getConfig(key);
      if (prev && prev.value && Array.isArray(prev.value.history)) {
        history = prev.value.history.slice(-29);
      }
    } catch (_) {}

    history.push({ at: when, correct: c, total: t, pct: pct });

    const value = {
      player: p,
      subject: subject,
      quiz: quiz,
      correct: c,
      total: t,
      pct: pct,
      at: when,
      history: history,
      attempts: history.length,
      app: 'on-thi',
    };

    await upsertConfig(key, value);
    try {
      await touchPlayerQuiz(p, { subject, quiz, correct: c, total: t, pct, at: when });
    } catch (_) {}
    return value;
  }

  async function flushScoreQueue() {
    const q = readQueue();
    if (!q.length) return { flushed: 0, left: 0 };
    const left = [];
    let flushed = 0;
    for (const item of q) {
      try {
        await saveQuizScoreOnline(item);
        flushed++;
      } catch (_) {
        left.push(item);
      }
    }
    writeQueue(left);
    return { flushed, left: left.length };
  }

  async function saveQuizScore(opts) {
    // Always try online first; queue if offline / network error
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        throw new Error('offline');
      }
      const saved = await saveQuizScoreOnline(opts);
      // also flush any backlog
      flushScoreQueue().catch(() => {});
      return saved;
    } catch (e) {
      const p = String((opts && opts.player) || getPlayer() || '').trim();
      if (!p) throw e;
      const t = Number(opts.total) || 0;
      const c = Number(opts.correct) || 0;
      const pct = t ? Math.round((c / t) * 100) : 0;
      const item = {
        subject: opts.subject,
        quiz: opts.quiz,
        correct: c,
        total: t,
        player: p,
        at: new Date().toISOString(),
        pct: pct,
      };
      const q = readQueue();
      q.push(item);
      writeQueue(q);
      const err = new Error('Offline gespeichert — wird später synchronisiert');
      err.queued = true;
      err.value = item;
      throw err;
    }
  }

  // Auto-flush when back online
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      flushScoreQueue().catch(() => {});
    });
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

  function readActiveVisit() {
    try {
      const raw = sessionStorage.getItem(SESSION_VISIT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function writeActiveVisit(v) {
    _activeVisit = v;
    try {
      if (v) sessionStorage.setItem(SESSION_VISIT_KEY, JSON.stringify(v));
      else sessionStorage.removeItem(SESSION_VISIT_KEY);
    } catch (_) {}
  }

  function durationSec(fromIso, toIso) {
    const a = Date.parse(fromIso || '');
    const b = Date.parse(toIso || '');
    if (!a || !b || b < a) return 0;
    return Math.max(0, Math.round((b - a) / 1000));
  }

  function formatDuration(sec) {
    const s = Math.max(0, Number(sec) || 0);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    if (h > 0) return h + 'h ' + String(m).padStart(2, '0') + 'm';
    if (m > 0) return m + 'm ' + String(r).padStart(2, '0') + 's';
    return r + 's';
  }

  async function persistVisitDuration(visit, ended, reason) {
    if (!visit || !visit.key || !visit.startedAt) return null;
    const endIso = ended || new Date().toISOString();
    const sec = durationSec(visit.startedAt, endIso);
    const value = {
      player: visit.player,
      at: visit.startedAt,
      started_at: visit.startedAt,
      last_seen: endIso,
      ended_at: endIso,
      duration_sec: sec,
      day: String(visit.startedAt).slice(0, 10),
      reason: reason || 'update',
      app: 'on-thi',
    };
    await upsertConfig(visit.key, value);

    // roll into player profile total duration (best-effort)
    try {
      const pk = playerKey(visit.player);
      const row = await getConfig(pk);
      const profile = (row && row.value) || { player: visit.player, app: 'on-thi' };
      // store last session duration + accumulate if this beat is higher than previous last
      const prevLast = Number(profile.last_session_sec) || 0;
      const prevTotal = Number(profile.total_duration_sec) || 0;
      // approximate total: replace last contribution with latest known duration
      profile.total_duration_sec = Math.max(0, prevTotal - prevLast) + sec;
      profile.last_session_sec = sec;
      profile.last_seen = endIso;
      await upsertConfig(pk, profile);
    } catch (_) {}

    return value;
  }

  function stopHeartbeat() {
    if (_hbTimer) {
      clearInterval(_hbTimer);
      _hbTimer = null;
    }
  }

  function startHeartbeat() {
    stopHeartbeat();
    _hbTimer = setInterval(() => {
      heartbeat('timer');
    }, HEARTBEAT_MS);
  }

  /** Resume duration tracking after navigation (same tab sessionStorage). */
  function resumeVisitTracking() {
    const visit = readActiveVisit();
    if (!visit || !visit.key) return false;
    _activeVisit = visit;
    bindVisitLifecycle();
    startHeartbeat();
    heartbeat('resume');
    return true;
  }

  async function heartbeat(reason) {
    const visit = _activeVisit || readActiveVisit();
    if (!visit) return null;
    const now = new Date().toISOString();
    visit.lastBeatAt = now;
    writeActiveVisit(visit);
    try {
      return await persistVisitDuration(visit, now, reason || 'heartbeat');
    } catch (_) {
      return null;
    }
  }

  async function endVisit(reason) {
    stopHeartbeat();
    const visit = _activeVisit || readActiveVisit();
    if (!visit) return null;
    try {
      const saved = await persistVisitDuration(visit, new Date().toISOString(), reason || 'end');
      writeActiveVisit(null);
      return saved;
    } catch (_) {
      writeActiveVisit(null);
      return null;
    }
  }

  function bindVisitLifecycle() {
    if (global.__learnVisitBound) return;
    global.__learnVisitBound = true;
    const flush = () => {
      // best-effort synchronous beacon-like update via sendBeacon is hard with headers;
      // use keepalive fetch instead
      const visit = _activeVisit || readActiveVisit();
      if (!visit) return;
      const endIso = new Date().toISOString();
      const sec = durationSec(visit.startedAt, endIso);
      const body = JSON.stringify({
        key: visit.key,
        value: {
          player: visit.player,
          at: visit.startedAt,
          started_at: visit.startedAt,
          last_seen: endIso,
          ended_at: endIso,
          duration_sec: sec,
          day: String(visit.startedAt).slice(0, 10),
          reason: 'pagehide',
          app: 'on-thi',
        },
      });
      try {
        fetch(SB_URL + '/rest/v1/config?on_conflict=key', {
          method: 'POST',
          headers: headers({ Prefer: 'resolution=merge-duplicates' }),
          body: body,
          keepalive: true,
        });
      } catch (_) {}
    };
    global.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') heartbeat('hidden');
      else if (document.visibilityState === 'visible') heartbeat('visible');
    });
    global.addEventListener('pagehide', flush);
    global.addEventListener('beforeunload', flush);
  }

  async function loginOrRegister(nickname) {
    const p = String(nickname || '').trim().slice(0, 32);
    if (!p) throw new Error('Nickname darf nicht leer sein');
    if (p.length < 2) throw new Error('Nickname: mindestens 2 Zeichen');
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
      total_duration_sec: 0,
      last_session_sec: 0,
      quizzes: {},
      app: 'on-thi',
    };
    profile.player = p;
    profile.last_seen = now;
    profile.visits = (Number(profile.visits) || 0) + 1;
    if (profile.total_duration_sec == null) profile.total_duration_sec = 0;
    await upsertConfig(key, profile);

    // close previous open session in this tab (if any)
    try { await endVisit('relogin'); } catch (_) {}

    // visit log (one row per visit event) with duration tracking
    const visitKey = VISIT_PREFIX + now.slice(0, 10) + ':' + clean(p) + ':' + Date.now();
    const visit = {
      key: visitKey,
      player: p,
      startedAt: now,
      lastBeatAt: now,
    };
    try {
      await upsertConfig(visitKey, {
        player: p,
        at: now,
        started_at: now,
        last_seen: now,
        ended_at: null,
        duration_sec: 0,
        day: now.slice(0, 10),
        reason: 'start',
        app: 'on-thi',
      });
    } catch (_) {}
    writeActiveVisit(visit);
    bindVisitLifecycle();
    startHeartbeat();

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
    return { player: p, isNew: isNew, profile: profile, history: history, visitKey: visitKey };
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
        total_duration_sec: Number(v.total_duration_sec) || 0,
        last_session_sec: Number(v.last_session_sec) || 0,
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
      .map((r) => {
        const v = r.value || {};
        const started = v.started_at || v.at || '';
        const ended = v.ended_at || v.last_seen || '';
        let sec = Number(v.duration_sec);
        if (!sec && started) sec = durationSec(started, ended || new Date().toISOString());
        return {
          key: r.key,
          player: v.player,
          at: started || v.at || '',
          started_at: started,
          ended_at: v.ended_at || '',
          last_seen: v.last_seen || ended || '',
          duration_sec: sec || 0,
          day: v.day || String(started || '').slice(0, 10),
          reason: v.reason || '',
        };
      })
      .filter((v) => v && v.player)
      .sort((a, b) => String(b.at || '').localeCompare(String(a.at || '')));

    // unique visitors from player profiles (more reliable than global counter races)
    const unique = playerList.length;
    const totalVisits = playerList.reduce((s, p) => s + (Number(p.visits) || 0), 0);
    const totalQuizAttempts = quizList.reduce(
      (s, q) => s + (Number(q.attempts) || (Array.isArray(q.history) ? q.history.length : 1)),
      0
    );
    const totalDurationSec = visitList.reduce((s, v) => s + (Number(v.duration_sec) || 0), 0);
    const avgDurationSec = visitList.length ? Math.round(totalDurationSec / visitList.length) : 0;

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
      total_duration_sec: totalDurationSec,
      avg_duration_sec: avgDurationSec,
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

  /* ===== Challenge rooms (realtime game) ===== */
  const CHALLENGE_PREFIX = 'learn:challenge:room:';
  const CHALLENGE_RESULT_PREFIX = 'learn:challenge:result:';

  function challengeRoomKey(code) {
    return CHALLENGE_PREFIX + String(code || '').toUpperCase();
  }

  function makeRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }

  async function getChallengeRoom(code) {
    const row = await getConfig(challengeRoomKey(code));
    return row ? { key: row.key, value: row.value, updated_at: row.updated_at } : null;
  }

  async function saveChallengeRoom(code, value) {
    const key = challengeRoomKey(code);
    value = value || {};
    value.code = String(code || value.code || '').toUpperCase();
    value.updated_at = new Date().toISOString();
    value.app = 'on-thi';
    const row = await upsertConfig(key, value);
    return row && row.value ? row.value : value;
  }

  async function createChallengeRoom({ host, settings }) {
    const player = String(host || getPlayer() || '').trim();
    if (!player) throw new Error('Bitte Nickname eingeben');
    let code = '';
    let tries = 0;
    while (tries < 8) {
      code = makeRoomCode();
      const existing = await getChallengeRoom(code);
      if (!existing) break;
      tries++;
    }
    const now = new Date().toISOString();
    const st = settings || {};
    const room = {
      code: code,
      host: player,
      status: 'lobby',
      created_at: now,
      updated_at: now,
      settings: {
        subjects: st.subjects && st.subjects.length ? st.subjects : ['bfk2'],
        count: Number(st.count) || 10,
        secondsPerQ: st.secondsPerQ == null ? 15 : Number(st.secondsPerQ),
        mixed: !!(st.subjects && st.subjects.length > 1),
        seed: Number(st.seed) || (Date.now() % 1000000000),
      },
      players: {},
      question_ids: [],
      q_index: 0,
      q_started_at: null,
      scores: {},
      answers: {},
      finished_at: null,
      app: 'on-thi',
    };
    room.players[player] = { ready: true, joined_at: now };
    room.scores[player] = { correct: 0, answered: 0, streak: 0 };
    await saveChallengeRoom(code, room);
    return room;
  }

  async function joinChallengeRoom(code, playerName) {
    const player = String(playerName || getPlayer() || '').trim();
    if (!player) throw new Error('Bitte Nickname eingeben');
    const c = String(code || '').trim().toUpperCase();
    if (c.length < 4) throw new Error('Code ungültig');
    const row = await getChallengeRoom(c);
    if (!row || !row.value) throw new Error('Raum nicht gefunden');
    const room = row.value;
    if (room.status === 'finished') throw new Error('Raum ist bereits beendet');
    const now = new Date().toISOString();
    room.players = room.players || {};
    room.scores = room.scores || {};
    if (!room.players[player]) {
      // limit players
      if (Object.keys(room.players).length >= 6) throw new Error('Raum ist voll (max 6)');
      room.players[player] = { ready: false, joined_at: now };
    }
    if (!room.scores[player]) room.scores[player] = { correct: 0, answered: 0, streak: 0 };
    room.players[player].last_seen = now;
    await saveChallengeRoom(c, room);
    return room;
  }

  async function setChallengeReady(code, playerName, ready) {
    const player = String(playerName || getPlayer() || '').trim();
    const row = await getChallengeRoom(code);
    if (!row || !row.value) throw new Error('Raum nicht gefunden');
    const room = row.value;
    if (!room.players || !room.players[player]) throw new Error('Nicht im Raum');
    room.players[player].ready = !!ready;
    room.players[player].last_seen = new Date().toISOString();
    await saveChallengeRoom(code, room);
    return room;
  }

  async function updateChallengeSettings(code, hostName, settings) {
    const host = String(hostName || getPlayer() || '').trim();
    const row = await getChallengeRoom(code);
    if (!row || !row.value) throw new Error('Raum nicht gefunden');
    const room = row.value;
    if (room.host !== host) throw new Error('Nur der Host kann Einstellungen ändern');
    if (room.status !== 'lobby') throw new Error('Spiel läuft bereits');
    room.settings = Object.assign({}, room.settings || {}, settings || {});
    room.settings.mixed = !!(room.settings.subjects && room.settings.subjects.length > 1);
    await saveChallengeRoom(code, room);
    return room;
  }

  async function startChallengeRoom(code, hostName, questionIds) {
    const host = String(hostName || getPlayer() || '').trim();
    const row = await getChallengeRoom(code);
    if (!row || !row.value) throw new Error('Raum nicht gefunden');
    const room = row.value;
    if (room.host !== host) throw new Error('Nur der Host kann starten');
    if (room.status !== 'lobby' && room.status !== 'countdown') throw new Error('Raum nicht im Lobby');
    const ids = questionIds || room.question_ids || [];
    if (!ids.length) throw new Error('Keine Fragen gewählt');
    const now = new Date().toISOString();
    // reset scores for live run
    room.scores = room.scores || {};
    Object.keys(room.players || {}).forEach((p) => {
      room.scores[p] = { correct: 0, answered: 0, streak: 0 };
    });
    room.answers = {};
    room.question_ids = ids;
    room.q_index = 0;
    room.status = 'countdown';
    room.countdown_ends_at = new Date(Date.now() + 3000).toISOString();
    room.q_started_at = null;
    room.started_at = now;
    room.finished_at = null;
    await saveChallengeRoom(code, room);
    return room;
  }

  async function goLiveChallenge(code, hostName) {
    const host = String(hostName || getPlayer() || '').trim();
    const row = await getChallengeRoom(code);
    if (!row || !row.value) throw new Error('Raum nicht gefunden');
    const room = row.value;
    if (room.host !== host) throw new Error('Nur der Host');
    if (room.status !== 'countdown' && room.status !== 'lobby') return room;
    room.status = 'live';
    room.q_index = 0;
    room.q_started_at = new Date().toISOString();
    await saveChallengeRoom(code, room);
    return room;
  }

  async function submitChallengeAnswer(code, playerName, qIndex, choiceIndex, isCorrect) {
    const player = String(playerName || getPlayer() || '').trim();
    const row = await getChallengeRoom(code);
    if (!row || !row.value) throw new Error('Raum nicht gefunden');
    const room = row.value;
    if (room.status !== 'live') throw new Error('Spiel nicht aktiv');
    const qi = Number(qIndex);
    if (qi !== Number(room.q_index)) throw new Error('Frage bereits vorbei');
    room.answers = room.answers || {};
    const key = String(qi);
    room.answers[key] = room.answers[key] || {};
    // lock first answer
    if (room.answers[key][player] != null && room.answers[key][player].choice != null) {
      return room; // already answered
    }
    room.answers[key][player] = {
      choice: Number(choiceIndex),
      correct: !!isCorrect,
      at: new Date().toISOString(),
    };
    room.scores = room.scores || {};
    room.scores[player] = room.scores[player] || { correct: 0, answered: 0, streak: 0 };
    room.scores[player].answered = (Number(room.scores[player].answered) || 0) + 1;
    if (isCorrect) {
      room.scores[player].correct = (Number(room.scores[player].correct) || 0) + 1;
      room.scores[player].streak = (Number(room.scores[player].streak) || 0) + 1;
    } else {
      room.scores[player].streak = 0;
    }
    if (room.players && room.players[player]) {
      room.players[player].last_seen = new Date().toISOString();
    }
    await saveChallengeRoom(code, room);
    return room;
  }

  async function advanceChallengeQuestion(code, hostName) {
    const host = String(hostName || getPlayer() || '').trim();
    const row = await getChallengeRoom(code);
    if (!row || !row.value) throw new Error('Raum nicht gefunden');
    const room = row.value;
    if (room.host !== host) throw new Error('Nur der Host kann weiter schalten');
    if (room.status !== 'live') return room;
    const total = (room.question_ids || []).length;
    const next = Number(room.q_index) + 1;
    if (next >= total) {
      room.status = 'finished';
      room.finished_at = new Date().toISOString();
      room.q_started_at = null;
    } else {
      room.q_index = next;
      room.q_started_at = new Date().toISOString();
    }
    await saveChallengeRoom(code, room);
    return room;
  }

  async function finishChallengeRoom(code, hostName) {
    const host = String(hostName || getPlayer() || '').trim();
    const row = await getChallengeRoom(code);
    if (!row || !row.value) throw new Error('Raum nicht gefunden');
    const room = row.value;
    if (room.host !== host && room.status !== 'finished') {
      // allow any client to finalize if already past last question via host race
    }
    room.status = 'finished';
    room.finished_at = room.finished_at || new Date().toISOString();
    await saveChallengeRoom(code, room);
    return room;
  }

  async function saveChallengeResult(code, playerName, room) {
    const player = String(playerName || getPlayer() || '').trim();
    if (!player || !room) return null;
    const sc = (room.scores && room.scores[player]) || { correct: 0, answered: 0 };
    const total = (room.question_ids || []).length || sc.answered || 0;
    const correct = Number(sc.correct) || 0;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const key = CHALLENGE_RESULT_PREFIX + String(code).toUpperCase() + ':' + clean(player);
    const value = {
      code: String(code).toUpperCase(),
      player: player,
      correct: correct,
      total: total,
      pct: pct,
      subjects: (room.settings && room.settings.subjects) || [],
      at: new Date().toISOString(),
      app: 'on-thi',
    };
    await upsertConfig(key, value);
    // also personal quiz history
    try {
      await saveQuizScore({
        subject: 'CHALLENGE',
        quiz: String(code).toUpperCase(),
        correct: correct,
        total: total,
        player: player,
      });
    } catch (_) {}
    return value;
  }

  /**
   * Subscribe to room changes.
   * Tries Supabase Realtime; falls back to polling every pollMs.
   * Returns unsubscribe function.
   */
  function subscribeChallengeRoom(code, onUpdate, pollMs) {
    const c = String(code || '').toUpperCase();
    const key = challengeRoomKey(c);
    let stopped = false;
    let timer = null;
    let lastJson = '';
    let realtimeOk = false;
    let ws = null;

    async function pull() {
      if (stopped) return;
      try {
        const row = await getChallengeRoom(c);
        const val = row && row.value ? row.value : null;
        const j = JSON.stringify(val);
        if (j !== lastJson) {
          lastJson = j;
          if (onUpdate) onUpdate(val, row);
        }
      } catch (_) {}
    }

    // Always poll as reliable fallback (Realtime may be disabled)
    const ms = Math.max(800, Number(pollMs) || 1500);
    timer = setInterval(pull, ms);
    pull();

    // Optional: try Realtime websocket (best-effort, ignore failures)
    try {
      // PostgREST realtime via supabase realtime v1 endpoint is project-dependent;
      // polling is the supported path for this static app.
      realtimeOk = false;
    } catch (_) {
      realtimeOk = false;
    }

    return function unsubscribe() {
      stopped = true;
      if (timer) clearInterval(timer);
      timer = null;
      try {
        if (ws) ws.close();
      } catch (_) {}
    };
  }

  global.LearnDB = {
    url: SB_URL,
    adminPass: ADMIN_PASS,
    getPlayer,
    setPlayer,
    clearPlayer,
    saveQuizScore,
    flushScoreQueue,
    loadLeaderboard,
    loadPlayerHistory,
    getPlayerProfile,
    loginOrRegister,
    getAdminStats,
    checkAdminPassword,
    ping,
    heartbeat,
    endVisit,
    formatDuration,
    bindVisitLifecycle,
    resumeVisitTracking,
    // challenge
    createChallengeRoom,
    joinChallengeRoom,
    getChallengeRoom,
    saveChallengeRoom,
    setChallengeReady,
    updateChallengeSettings,
    startChallengeRoom,
    goLiveChallenge,
    submitChallengeAnswer,
    advanceChallengeQuestion,
    finishChallengeRoom,
    saveChallengeResult,
    subscribeChallengeRoom,
  };
})(typeof window !== 'undefined' ? window : globalThis);
