/* Realtime Klassen-Challenge – client game loop */
(function () {
  const $ = (id) => document.getElementById(id);
  const errEl = $('err');
  let me = '';
  let room = null;
  let unsub = null;
  let localQuestions = []; // resolved question objects
  let answeredThisQ = false;
  let hostTicker = null;
  let uiTicker = null;
  let savedResult = false;
  let qShownAt = 0; // performance.now when question rendered

  // settings draft for create
  const draft = { subjects: ['bfk2'], count: 10, secondsPerQ: 15, mode: 'classic' };

  const MODE_HELP = {
    classic: 'Classic: Alle spielen dieselben Fragen. Meiste richtige Antworten gewinnt.',
    speed: 'Speed: Nur 10s/Frage (empfohlen). Schnelle richtige Antworten geben Bonuspunkte.',
    sudden: 'Sudden Death: Ein Fehler = ausgeschieden. Letzte Person gewinnt.',
    streak: 'Streak: Längste Serie richtiger Antworten zählt am meisten.',
    survival: 'Survival: 3 Leben. Jeder Fehler kostet 1 Leben. Wer übrig bleibt, gewinnt.',
  };
  const MODE_LABEL = {
    classic: '🎯 Classic',
    speed: '⚡ Speed',
    sudden: '💀 Sudden Death',
    streak: '🔥 Streak',
    survival: '🛡️ Survival',
  };

  function showErr(msg) {
    if (!errEl) return;
    if (!msg) {
      errEl.classList.remove('show');
      errEl.textContent = '';
      return;
    }
    errEl.textContent = msg;
    errEl.classList.add('show');
  }

  function view(name) {
    ['hub', 'lobby', 'live', 'finish'].forEach((v) => {
      const el = $('view-' + v);
      if (el) el.classList.toggle('hidden', v !== name);
    });
  }

  function needPlayer() {
    if (!window.LearnDB) throw new Error('supabase.js fehlt — bitte Hard-Refresh (Cache leeren)');
    if (typeof LearnDB.createChallengeRoom !== 'function' || typeof LearnDB.joinChallengeRoom !== 'function') {
      throw new Error(
        'Challenge-API fehlt (alte Cache). Bitte Hard-Refresh: Cmd+Shift+R / Cache leeren, dann Seite neu laden.'
      );
    }
    me = LearnDB.getPlayer();
    if (!me) {
      alert('Bitte zuerst in der App mit Nickname einloggen.');
      location.href = 'index.html';
      throw new Error('no player');
    }
    return me;
  }

  function isHost() {
    return room && me && room.host === me;
  }

  function playerCount() {
    return room && room.players ? Object.keys(room.players).length : 0;
  }

  function allAnswered(qi) {
    if (!room || !room.players) return false;
    const ans = (room.answers && room.answers[String(qi)]) || {};
    return Object.keys(room.players).every((p) => ans[p] != null);
  }

  function stopTimers() {
    if (hostTicker) {
      clearInterval(hostTicker);
      hostTicker = null;
    }
    if (uiTicker) {
      clearInterval(uiTicker);
      uiTicker = null;
    }
  }

  function cleanupSub() {
    stopTimers();
    if (typeof unsub === 'function') {
      try {
        unsub();
      } catch (_) {}
    }
    unsub = null;
  }

  /* ===== Hub UI ===== */
  function renderSubjectPick() {
    const box = $('subjectPick');
    if (!box || !window.ChallengeData) return;
    box.innerHTML = ChallengeData.SUBJECT_META.map((s) => {
      const on = draft.subjects.includes(s.id) ? ' on' : '';
      return (
        '<button type="button" class="chip' +
        on +
        '" data-id="' +
        s.id +
        '">' +
        s.icon +
        ' ' +
        s.label +
        ' (' +
        s.count +
        ')</button>'
      );
    }).join('');
    box.querySelectorAll('.chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const i = draft.subjects.indexOf(id);
        if (i >= 0) {
          if (draft.subjects.length > 1) draft.subjects.splice(i, 1);
        } else draft.subjects.push(id);
        renderSubjectPick();
      });
    });
  }

  function bindSeg(id, key, mapFn) {
    const box = $(id);
    if (!box) return;
    box.querySelectorAll('.chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        box.querySelectorAll('.chip').forEach((b) => b.classList.remove('on'));
        btn.classList.add('on');
        draft[key] = mapFn(btn.getAttribute('data-v'));
      });
    });
  }

  function bindModePick() {
    const box = $('modePick');
    if (!box) return;
    box.querySelectorAll('.chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        box.querySelectorAll('.chip').forEach((b) => b.classList.remove('on'));
        btn.classList.add('on');
        draft.mode = btn.getAttribute('data-mode') || 'classic';
        const help = $('modeHelp');
        if (help) help.textContent = MODE_HELP[draft.mode] || MODE_HELP.classic;
        // speed default timer: 10s/question (no 8s chip available)
        if (draft.mode === 'speed' && draft.secondsPerQ === 15) {
          const timeBox = $('timePick');
          if (timeBox) {
            let best = null;
            timeBox.querySelectorAll('.chip').forEach((c) => {
              c.classList.remove('on');
              const v = Number(c.getAttribute('data-v'));
              if (v === 10) best = c;
            });
            if (best) {
              best.classList.add('on');
              draft.secondsPerQ = 10;
            }
          }
        }
      });
    });
  }

  function modeOf(r) {
    return (r && r.settings && r.settings.mode) || 'classic';
  }

  function roomInviteUrl(code) {
    const c = String(code || '').toUpperCase();
    // absolute URL so Telegram/mobile open correctly
    try {
      return new URL('challenge.html?code=' + encodeURIComponent(c), location.href).href;
    } catch (_) {
      return location.origin + location.pathname.replace(/[^/]*$/, '') + 'challenge.html?code=' + encodeURIComponent(c);
    }
  }

  function roomShareText(code) {
    const c = String(code || (room && room.code) || '').toUpperCase();
    const st = (room && room.settings) || {};
    const mode = MODE_LABEL[st.mode || 'classic'] || 'Challenge';
    const url = roomInviteUrl(c);
    return (
      '⚔️ H2FO3T Challenge!\n' +
      'Code: ' + c + '\n' +
      mode + '\n' +
      'Mitspielen: ' + url + '\n' +
      '(Zuerst Nickname in der App setzen, dann Link öffnen)'
    );
  }

  function openTelegramShare(code) {
    const text = roomShareText(code);
    // https://t.me/share/url?url=...&text=...
    const url = roomInviteUrl(code);
    const tg =
      'https://t.me/share/url?url=' +
      encodeURIComponent(url) +
      '&text=' +
      encodeURIComponent(text);
    window.open(tg, '_blank', 'noopener,noreferrer');
  }

  async function nativeShare(code) {
    const text = roomShareText(code);
    const url = roomInviteUrl(code);
    if (navigator.share) {
      try {
        await navigator.share({ title: 'H2FO3T Challenge ' + code, text: text, url: url });
        return true;
      } catch (e) {
        // user cancelled or share failed
        if (e && e.name === 'AbortError') return false;
      }
    }
    // fallback: copy full invite
    try {
      await navigator.clipboard.writeText(text);
      return 'copied';
    } catch (_) {
      prompt('Einladungslink kopieren:', url);
      return false;
    }
  }

  function sortPlayers(r) {
    const scores = (r && r.scores) || {};
    const mode = modeOf(r);
    return Object.keys((r && r.players) || {})
      .map((p) => {
        const s = scores[p] || {};
        return {
          p,
          correct: Number(s.correct) || 0,
          answered: Number(s.answered) || 0,
          streak: Number(s.streak) || 0,
          bestStreak: Number(s.bestStreak) || 0,
          points: Number(s.points) || 0,
          lives: s.lives == null ? null : Number(s.lives),
          eliminated: !!s.eliminated,
        };
      })
      .sort((a, b) => {
        // eliminated last
        if (a.eliminated !== b.eliminated) return a.eliminated ? 1 : -1;
        if (mode === 'streak') return b.bestStreak - a.bestStreak || b.correct - a.correct || a.p.localeCompare(b.p);
        if (mode === 'speed' || mode === 'classic' || mode === 'sudden' || mode === 'survival') {
          return b.points - a.points || b.correct - a.correct || b.bestStreak - a.bestStreak || a.p.localeCompare(b.p);
        }
        return b.correct - a.correct || a.p.localeCompare(b.p);
      });
  }

  function scoreLabel(row, mode) {
    if (row.eliminated) return 'OUT';
    if (mode === 'streak') return '🔥 ' + row.bestStreak + ' (best) · ' + row.correct + '✓';
    if (mode === 'speed') return row.points + ' Pkt · ' + row.correct + '✓';
    if (mode === 'survival') return '❤'.repeat(Math.max(0, row.lives || 0)) + ' · ' + row.correct + '✓';
    if (mode === 'sudden') return row.correct + '✓';
    return row.correct + '✓ · ' + row.answered + ' antw.';
  }

  /* ===== Lobby ===== */
  function renderLobby() {
    if (!room) return;
    view('lobby');
    $('lobbyCode').textContent = room.code || '————';
    const st = room.settings || {};
    const subs = (st.subjects || [])
      .map((id) => {
        const m = (ChallengeData.SUBJECT_META || []).find((x) => x.id === id);
        return m ? m.label : id;
      })
      .join(' + ');
    const t = Number(st.secondsPerQ) || 0;
    const mode = st.mode || 'classic';
    $('lobbySettings').textContent =
      (MODE_LABEL[mode] || mode) +
      ' · ' +
      subs +
      ' · ' +
      (st.count || 10) +
      ' Fragen · ' +
      (t ? t + 's / Frage' : 'ohne Zeitlimit');
    const linkEl = $('lobbyLink');
    if (linkEl) linkEl.textContent = roomInviteUrl(room.code);

    const players = room.players || {};
    $('lobbyPlayers').innerHTML = Object.keys(players)
      .map((p) => {
        const ready = players[p] && players[p].ready;
        const host = room.host === p;
        return (
          '<div class="player"><div><b>' +
          p +
          '</b></div><div>' +
          (host ? '<span class="tag host">Host</span> ' : '') +
          (ready ? '<span class="tag ready">Bereit</span>' : '<span class="tag wait">Wartet</span>') +
          '</div></div>'
        );
      })
      .join('');

    const myReady = !!(players[me] && players[me].ready);
    const readyBtn = $('btnReady');
    if (readyBtn) {
      readyBtn.textContent = myReady ? 'Nicht bereit' : 'Bereit';
      readyBtn.className = 'btn ' + (myReady ? 'ghost' : 'ok');
    }
    const startBtn = $('btnStart');
    if (startBtn) {
      startBtn.style.display = isHost() ? '' : 'none';
      startBtn.disabled = playerCount() < 1;
    }
    $('lobbyHint').textContent = isHost()
      ? 'Du bist Host. Starte, wenn alle bereit sind (Solo-Test ok).'
      : 'Warte auf den Host…';
  }

  /* ===== Live ===== */
  function resolveQuestionsFromRoom() {
    if (!room) return [];
    if (room.question_ids && room.question_ids.length) {
      return ChallengeData.getByIds(room.question_ids);
    }
    // fallback pick
    const st = room.settings || {};
    return ChallengeData.pickQuestions(st.subjects || ['bfk2'], st.count || 10, st.seed || 1);
  }

  function renderScoreboard(elId) {
    const el = $(elId);
    if (!el || !room) return;
    const mode = modeOf(room);
    const rows = sortPlayers(room);
    el.innerHTML = rows
      .map((r, i) => {
        const meCls = r.p === me ? ' me' : '';
        return (
          '<div class="sb-row' +
          meCls +
          '"><span>#' +
          (i + 1) +
          ' <b>' +
          r.p +
          '</b></span><span>' +
          scoreLabel(r, mode) +
          '</span></div>'
        );
      })
      .join('');
  }

  function currentQ() {
    if (!localQuestions.length) localQuestions = resolveQuestionsFromRoom();
    const i = Number(room.q_index) || 0;
    return localQuestions[i] || null;
  }

  function myAnswerFor(qi) {
    const ans = (room.answers && room.answers[String(qi)]) || {};
    return ans[me];
  }

  function renderLiveQuestion() {
    view('live');
    $('countdownCard').classList.add('hidden');
    $('questionCard').classList.remove('hidden');
    const mode = modeOf(room);
    // mode banner
    let banner = document.getElementById('modeBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'modeBanner';
      banner.className = 'mode-banner';
      const live = $('view-live');
      if (live) live.insertBefore(banner, live.firstChild);
    }
    banner.innerHTML = '<b>' + (MODE_LABEL[mode] || mode) + '</b><span class="muted">' + (MODE_HELP[mode] || '') + '</span>';

    const q = currentQ();
    const total = (room.question_ids && room.question_ids.length) || localQuestions.length || 0;
    const qi = Number(room.q_index) || 0;
    $('liveQnum').textContent = qi + 1 + '/' + total;
    const mySc = (room.scores && room.scores[me]) || { correct: 0, points: 0, lives: null, eliminated: false };
    if (mode === 'speed') $('liveMyScore').textContent = String(mySc.points || 0) + 'P';
    else if (mode === 'streak') $('liveMyScore').textContent = '🔥' + (mySc.bestStreak || mySc.streak || 0);
    else if (mode === 'survival') $('liveMyScore').textContent = '❤' + (mySc.lives == null ? 3 : mySc.lives);
    else $('liveMyScore').textContent = String(mySc.correct || 0);

    if (mySc.eliminated) {
      $('liveQuestion').textContent = 'Du bist ausgeschieden.';
      $('liveOpts').innerHTML = '';
      $('liveWait').textContent = 'Warte auf das Ende der Runde…';
      renderScoreboard('liveBoard');
      startUiTicker();
      return;
    }

    if (!q) {
      $('liveQuestion').textContent = 'Frage wird geladen…';
      $('liveOpts').innerHTML = '';
      return;
    }
    $('liveCat').textContent = q.cat || '—';
    $('liveSub').textContent = q.subject === 'deutsch' ? 'Deutsch' : 'BfK-2';
    $('liveQuestion').textContent = q.q;
    const mine = myAnswerFor(qi);
    answeredThisQ = !!mine;
    const locked = answeredThisQ;
    if (!locked) qShownAt = performance.now();
    $('liveOpts').innerHTML = (q.opts || [])
      .map((o, i) => {
        let cls = 'opt';
        if (locked) {
          if (i === q.a) cls += ' correct';
          if (mine && Number(mine.choice) === i && i !== q.a) cls += ' wrong';
        }
        return (
          '<button type="button" class="' +
          cls +
          '" data-i="' +
          i +
          '"' +
          (locked ? ' disabled' : '') +
          '>' +
          o +
          '</button>'
        );
      })
      .join('');
    if (!locked) {
      $('liveOpts').querySelectorAll('.opt').forEach((btn) => {
        btn.addEventListener('click', () => onAnswer(Number(btn.getAttribute('data-i'))));
      });
    }
    $('liveWait').textContent = locked
      ? allAnswered(qi)
        ? 'Alle haben geantwortet…'
        : 'Antwort gespeichert. Warte auf die anderen…'
      : '';
    renderScoreboard('liveBoard');
    startUiTicker();
  }

  function renderCountdown() {
    view('live');
    $('countdownCard').classList.remove('hidden');
    $('questionCard').classList.add('hidden');
    startUiTicker();
  }

  function remainingMs() {
    if (!room) return 0;
    if (room.status === 'countdown' && room.countdown_ends_at) {
      return Math.max(0, Date.parse(room.countdown_ends_at) - Date.now());
    }
    if (room.status === 'live') {
      const sec = Number((room.settings && room.settings.secondsPerQ) || 0);
      if (!sec || !room.q_started_at) return Infinity;
      return Math.max(0, Date.parse(room.q_started_at) + sec * 1000 - Date.now());
    }
    return 0;
  }

  function startUiTicker() {
    if (uiTicker) clearInterval(uiTicker);
    uiTicker = setInterval(() => {
      if (!room) return;
      if (room.status === 'countdown') {
        const ms = remainingMs();
        const s = Math.ceil(ms / 1000);
        $('countdownNum').textContent = String(Math.max(1, s));
        $('liveTime').textContent = s + 's';
        if (isHost() && ms <= 0) {
          // go live
          LearnDB.goLiveChallenge(room.code, me)
            .then((r) => applyRoom(r))
            .catch(() => {});
        }
        return;
      }
      if (room.status === 'live') {
        const sec = Number((room.settings && room.settings.secondsPerQ) || 0);
        const fill = $('timerFill');
        const bar = $('timerBar');
        if (!sec) {
          $('liveTime').textContent = '∞';
          if (fill) fill.style.width = '100%';
          if (bar) bar.classList.remove('low');
        } else {
          const ms = remainingMs();
          const pct = Math.max(0, Math.min(100, (ms / (sec * 1000)) * 100));
          $('liveTime').textContent = Math.ceil(ms / 1000) + 's';
          if (fill) fill.style.width = pct + '%';
          if (bar) bar.classList.toggle('low', pct < 25);
          // host advances on timeout
          if (isHost() && ms <= 0) {
            maybeHostAdvance(true);
          }
        }
        // host advances when all answered
        if (isHost() && allAnswered(room.q_index)) {
          maybeHostAdvance(false);
        }
      }
    }, 200);
  }

  let advancing = false;
  async function maybeHostAdvance(fromTimeout) {
    if (!isHost() || advancing || !room || room.status !== 'live') return;
    // small grace so last answers can flush
    advancing = true;
    try {
      await new Promise((r) => setTimeout(r, fromTimeout ? 400 : 700));
      // re-fetch to avoid stale
      const fresh = await LearnDB.getChallengeRoom(room.code);
      if (!fresh || !fresh.value || fresh.value.status !== 'live') return;
      room = fresh.value;
      if (fromTimeout || allAnswered(room.q_index)) {
        const next = await LearnDB.advanceChallengeQuestion(room.code, me);
        applyRoom(next);
      }
    } catch (_) {
    } finally {
      advancing = false;
    }
  }

  async function onAnswer(choice) {
    if (!room || room.status !== 'live' || answeredThisQ) return;
    const mySc = (room.scores && room.scores[me]) || {};
    if (mySc.eliminated) return;
    const q = currentQ();
    if (!q) return;
    const qi = Number(room.q_index) || 0;
    const correct = choice === q.a;
    const ms = Math.max(0, Math.round(performance.now() - (qShownAt || performance.now())));
    answeredThisQ = true;
    try {
      const updated = await LearnDB.submitChallengeAnswer(room.code, me, qi, choice, correct, { ms: ms });
      applyRoom(updated);
    } catch (e) {
      answeredThisQ = false;
      showErr(e.message || String(e));
    }
  }

  /* ===== Finish ===== */
  async function renderFinish() {
    view('finish');
    stopTimers();
    renderScoreboard('finishBoard');
    const mode = modeOf(room);
    const rows = sortPlayers(room);
    const myRank = Math.max(1, rows.findIndex((r) => r.p === me) + 1);
    const my = rows.find((r) => r.p === me) || { correct: 0, points: 0, bestStreak: 0, lives: 0, eliminated: false };
    const total = (room.question_ids || []).length || 0;
    $('finishRank').textContent = my.eliminated && (mode === 'sudden' || mode === 'survival') ? 'OUT' : '#' + myRank;
    let summary = (MODE_LABEL[mode] || mode) + ' · ';
    if (mode === 'speed') summary += my.points + ' Punkte · ' + my.correct + '/' + total + ' richtig';
    else if (mode === 'streak') summary += 'Beste Serie 🔥 ' + my.bestStreak + ' · ' + my.correct + '/' + total;
    else if (mode === 'survival') summary += (my.eliminated ? 'Ausgeschieden' : 'Überlebt') + ' · ' + my.correct + '/' + total;
    else if (mode === 'sudden') summary += (my.eliminated ? 'Ausgeschieden' : 'Überlebt') + ' · ' + my.correct + '✓';
    else summary += my.correct + ' / ' + total + ' richtig';
    summary += ' · Raum ' + room.code;
    $('finishSummary').textContent = summary;
    if (!savedResult) {
      savedResult = true;
      try {
        await LearnDB.saveChallengeResult(room.code, me, room);
      } catch (_) {}
    }
  }

  /* ===== Room apply ===== */
  function applyRoom(r) {
    if (!r) return;
    room = r;
    localQuestions = resolveQuestions();
    showErr('');
    if (room.status === 'lobby') renderLobby();
    else if (room.status === 'countdown') renderCountdown();
    else if (room.status === 'live') renderLiveQuestion();
    else if (room.status === 'finished') renderFinish();
  }

  function resolveQuestions() {
    if (!room) return [];
    if (room.question_ids && room.question_ids.length) {
      return ChallengeData.getByIds(room.question_ids);
    }
    const st = room.settings || {};
    const picked = ChallengeData.pickQuestions(st.subjects || ['bfk2'], st.count || 10, st.seed || 1);
    return picked;
  }

  function watchRoom(code) {
    cleanupSub();
    unsub = LearnDB.subscribeChallengeRoom(code, (val) => {
      if (val) applyRoom(val);
    }, 1200);
  }

  /* ===== Actions ===== */
  async function createRoom() {
    try {
      needPlayer();
      showErr('');
      if (!draft.subjects.length) throw new Error('Mindestens ein Fach wählen');
      const room0 = await LearnDB.createChallengeRoom({
        host: me,
        settings: {
          mode: draft.mode || 'classic',
          subjects: draft.subjects.slice(),
          count: draft.count,
          secondsPerQ: draft.secondsPerQ,
          lives: draft.mode === 'survival' ? 3 : null,
        },
      });
      // pre-pick questions and store ids
      const picked = ChallengeData.pickQuestions(
        room0.settings.subjects,
        room0.settings.count,
        room0.settings.seed
      );
      room0.question_ids = picked.map((q) => q.id);
      await LearnDB.saveChallengeRoom(room0.code, room0);
      room = room0;
      savedResult = false;
      watchRoom(room0.code);
      renderLobby();
    } catch (e) {
      showErr(e.message || String(e));
    }
  }

  async function joinRoom() {
    try {
      needPlayer();
      showErr('');
      const code = ($('joinCode').value || '').trim().toUpperCase();
      const r = await LearnDB.joinChallengeRoom(code, me);
      room = r;
      savedResult = false;
      watchRoom(code);
      applyRoom(r);
    } catch (e) {
      showErr(e.message || String(e));
    }
  }

  async function toggleReady() {
    try {
      if (!room) return;
      const cur = !!(room.players && room.players[me] && room.players[me].ready);
      const r = await LearnDB.setChallengeReady(room.code, me, !cur);
      applyRoom(r);
    } catch (e) {
      showErr(e.message || String(e));
    }
  }

  async function startGame() {
    try {
      if (!room || !isHost()) return;
      showErr('');
      let ids = room.question_ids || [];
      if (!ids.length) {
        const picked = ChallengeData.pickQuestions(
          room.settings.subjects,
          room.settings.count,
          room.settings.seed
        );
        ids = picked.map((q) => q.id);
      }
      const r = await LearnDB.startChallengeRoom(room.code, me, ids);
      applyRoom(r);
    } catch (e) {
      showErr(e.message || String(e));
    }
  }

  function leaveToHub() {
    cleanupSub();
    room = null;
    localQuestions = [];
    answeredThisQ = false;
    savedResult = false;
    view('hub');
  }

  /* ===== Init ===== */
  function init() {
    try {
      needPlayer();
    } catch (e) {
      if (e && e.message && e.message !== 'no player') showErr(e.message);
      return;
    }
    $('nickLabel').textContent = '👤 ' + me;
    if (LearnDB.resumeVisitTracking) LearnDB.resumeVisitTracking();
    // unregister stale SW caches once if challenge API was missing before
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations?.().then(() => {});
    }

    renderSubjectPick();
    bindModePick();
    bindSeg('countPick', 'count', (v) => Number(v));
    bindSeg('timePick', 'secondsPerQ', (v) => Number(v));

    $('btnShowCreate').onclick = () => {
      $('createBox').classList.remove('hidden');
      $('joinBox').classList.add('hidden');
    };
    $('btnShowJoin').onclick = () => {
      $('joinBox').classList.remove('hidden');
      $('createBox').classList.add('hidden');
    };
    $('btnCreate').onclick = createRoom;
    $('btnJoin').onclick = joinRoom;
    $('joinCode').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') joinRoom();
    });
    $('btnReady').onclick = toggleReady;
    $('btnStart').onclick = startGame;
    $('btnLeaveLobby').onclick = leaveToHub;
    $('btnCopy').onclick = async () => {
      if (!room) return;
      try {
        await navigator.clipboard.writeText(room.code + '\n' + roomInviteUrl(room.code));
        $('btnCopy').textContent = 'Kopiert!';
        setTimeout(() => {
          $('btnCopy').textContent = 'Code kopieren';
        }, 1200);
      } catch (_) {
        prompt('Code / Link kopieren:', roomInviteUrl(room.code));
      }
    };
    const btnTg = $('btnTelegram');
    if (btnTg) {
      btnTg.onclick = () => {
        if (!room) return;
        openTelegramShare(room.code);
      };
    }
    const btnShare = $('btnShare');
    if (btnShare) {
      btnShare.onclick = async () => {
        if (!room) return;
        const res = await nativeShare(room.code);
        if (res === 'copied') {
          btnShare.textContent = 'Link kopiert!';
          setTimeout(() => {
            btnShare.textContent = 'Teilen';
          }, 1200);
        }
      };
    }
    $('btnAgain').onclick = leaveToHub;
    $('btnHome').onclick = () => {
      location.href = 'index.html';
    };

    // deep link ?code=XXXX
    const params = new URLSearchParams(location.search);
    const code = (params.get('code') || '').trim().toUpperCase();
    if (code) {
      $('joinCode').value = code;
      $('joinBox').classList.remove('hidden');
      joinRoom();
    } else {
      view('hub');
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
