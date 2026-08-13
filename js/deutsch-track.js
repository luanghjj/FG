/* Deutsch-Track (A1–C1): adapter, audio, extras, unlock */
(function () {
  'use strict';
  var w = window;

  var svg = function (p) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  };
  var ICON = {
    flag: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18"/>').replace('stroke="currentColor"', 'stroke="#d97706"'),
    book: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>').replace('stroke="currentColor"', 'stroke="#2563eb"'),
    play: svg('<polygon points="6 4 20 12 6 20"/>').replace('stroke="currentColor"', 'stroke="#2563eb"'),
    bulb: svg('<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>').replace('stroke="currentColor"', 'stroke="#d97706"'),
    turtle: svg('<path d="M6 3h12v4l-5 5 5 5v4H6v-4l5-5-5-5z"/>').replace('stroke="currentColor"', 'stroke="#16a34a"'),
    mic: svg('<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>'),
    warn: svg('<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>').replace('stroke="currentColor"', 'stroke="#d97706"'),
    ok: svg('<polyline points="20 6 9 17 4 12"/>').replace('stroke="currentColor"', 'stroke="#16a34a"'),
    no: svg('<circle cx="12" cy="12" r="9"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M8.5 15h7"/>').replace('stroke="currentColor"', 'stroke="#dc2626"')
  };

  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim();
  }
  /* Speech-matching: umlaut folding + fuzzy (KHÔNG dùng cho quiz fill — giữ norm() gốc) */
  function fold(s) {
    return norm(s).replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');
  }
  function stripFillers(s) {
    return s.replace(/(^|[^a-zäöüß0-9])(ähm|ehm|mhm|hmm|äh|hm)(?=$|[^a-zäöüß0-9])/gi, '$1')
            .replace(/\s+/g, ' ').trim();
  }
  function lev(a, b) {
    var m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    var prev = [], cur = [];
    for (var j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) {
      cur[0] = i;
      for (var j = 1; j <= n; j++) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      var tmp = prev; prev = cur; cur = tmp;
    }
    return prev[n];
  }
  function matchSpeech(model, transcript) {
    var t = fold(stripFillers(transcript || ''));
    var m = fold(model || '');
    var score = m.length ? 1 - lev(m, t) / Math.max(m.length, t.length) : 0;
    var exact = t === m;
    var near = !exact && score >= 0.8;
    return { ok: exact || near, exact: exact, near: near, score: score, transcript: transcript || '' };
  }
  function deVoice() {
    try {
      var vs = speechSynthesis.getVoices();
      var v = vs.filter(function (v) { return /^de(-|_)/.test(v.lang); })
                 .find(function (v) { return /google|anna/i.test(v.name); })
              || vs.find(function (v) { return /^de(-|_)/.test(v.lang); });
      return v || null;
    } catch (_) { return null; }
  }
  function speak(text, opts) {
    try {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      var v = deVoice(); if (v) u.voice = v;
      u.rate = (opts && opts.slow) ? 0.75 : 0.95;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch (_) { toast && toast('Không hỗ trợ đọc tiếng nói trên thiết bị này.', 'warn'); }
  }
  function record(model, cb) {
    var SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { cb(false, null, 'SpeechRecognition không khả dụng', null); return; }
    try {
      var r = new SR();
      r.lang = 'de-DE';
      r.interimResults = false;
      r.maxAlternatives = 5;
      r.onresult = function (e) {
        var best = null;
        for (var i = 0; i < e.results[0].length; i++) {
          var alt = e.results[0][i];
          var m = matchSpeech(model, alt.transcript || '');
          if (m.ok && !best) best = m;
          if (best && m.exact) { best = m; break; }
        }
        if (!best) best = matchSpeech(model, (e.results[0][0] && e.results[0][0].transcript) || '');
        cb(best.ok, best.transcript, null, best);
      };
      r.onerror = function () { cb(false, null, 'Không nghe được — kiểm tra micro.', null); };
      r.onend = function () {};
      r.start();
    } catch (_) { cb(false, null, 'Không khởi động được SpeechRecognition.', null); }
  }

  function buildFach(levelData, id) {
    var units = (levelData && levelData.units) || [];
    var groups = units.map(function (u) {
      return {
        id: u.id, badge: levelData.badge || 'A1', title: u.title,
        items: (u.lektionen || []).map(function (l) {
          return {
            id: l.id, icon: l.icon || ICON.flag, name: l.name, desc: l.desc || '',
            content: l.content || '',
            grammar: l.grammar || null, listen: l.listen || null, speak: l.speak || null
          };
        })
      };
    });
    var LEVEL_QUIZ = { a1: 'DEUTSCH_A1_QUIZ', beruf: 'DEUTSCH_BERUF_QUIZ' };
    return {
      id: id, code: levelData.code || 'DE ' + (levelData.badge || ''), name: levelData.title,
      icon: ICON.flag, accent: '#dc2626', soft: '#fef2f2', ready: true, hidden: true, track: 'deutsch',
      desc: levelData.badge + ' · ' + units.length + ' Units',
      groups: groups,
      quiz: (w[LEVEL_QUIZ[levelData.level]] || []).slice()
    };
  }
  function levels() {
    var out = [];
    var map = { a1: ['DEUTSCH_A1', 'deutsch-a1'], beruf: ['DEUTSCH_BERUF', 'deutsch-beruf'] };
    var ORDER = ['a1', 'a2', 'b1', 'b2', 'c1', 'beruf'];
    ORDER.forEach(function (lv) {
      var k = map[lv] || ['DEUTSCH_' + lv.toUpperCase(), 'deutsch-' + lv];
      if (w[k[0]]) {
        out.push({
          level: lv, id: k[1], title: w[k[0]].title, badge: w[k[0]].badge,
          units: (w[k[0]].units || []).length
        });
      }
    });
    return out;
  }
  function levelFachId(level) {
    var l = levels().filter(function (x) { return x.level === level; })[0];
    return l ? l.id : (level === 'beruf' ? 'deutsch-beruf' : null);
  }
  function ensureFächer() {
    levels().forEach(function (lv) {
      var data = { a1: w.DEUTSCH_A1, beruf: w.DEUTSCH_BERUF }[lv.level]
               || w['DEUTSCH_' + lv.level.toUpperCase()];
      if (data) w.FachForm.registerFach(buildFach(data, lv.id));
    });
  }

  /* --- Theme-page extras (grammar/listen/speak) --- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function renderExtras(container, item) {
    if (!container || !item) return;
    var html = '';
    if (item.grammar && item.grammar.length) {
      html += item.grammar.map(function (g, gi) {
        var ex = g.exercise ? '<div class="dt-ex" id="dtEx' + gi + '"></div>' : '';
        return '<div class="dt-block dt-grammar"><h3 class="sub">' + ICON.book + ' ' + esc(g.title) + '</h3>'
          + '<div>' + g.rule + '</div>'
          + ((g.examples || []).length ? '<ul class="dt-examples">' + g.examples.map(function (x) {
              var s = String(x); if (s.indexOf('<') === -1) s = esc(s);
              return '<li>' + s + '</li>'; }).join('') + '</ul>' : '')
          + ex + '</div>';
      }).join('');
    }
    if (item.listen && item.listen.length) {
      html += '<div class="dt-block dt-listen"><h3 class="sub">' + ICON.play + ' Luyện nghe</h3>'
        + item.listen.map(function (l, li) {
            return '<div class="dt-listen-row"><button type="button" class="btn ghost" data-dt-listen="' + li + '">' + ICON.play + ' Nghe</button>'
              + '<span>' + esc(l.text) + '</span>'
              + (l.tip ? '<div class="muted">' + ICON.bulb + ' ' + esc(l.tip) + '</div>' : '') + '</div>';
          }).join('')
        + (item.listen.some(function (l) { return l.slow; })
            ? '<div class="muted">Nghe lại chậm với nút <b>' + ICON.turtle + ' Chậm</b> khi bật ở từng dòng.</div>' : '')
        + '</div>';
    }
    if (item.speak && item.speak.length) {
      html += '<div class="dt-block dt-speak"><h3 class="sub">' + ICON.mic + ' Luyện nói</h3>'
        + item.speak.map(function (sp, si) {
            return '<div class="dt-speak-row"><div class="muted">' + esc(sp.prompt) + '</div>'
              + '<div class="dt-model">' + esc(sp.model) + '</div>'
              + (sp.hint ? '<div class="muted">' + ICON.mic + ' ' + esc(sp.hint) + '</div>' : '')
              + '<button type="button" class="btn" data-dt-speak="' + si + '">' + ICON.mic + ' Đọc &amp; kiểm tra</button>'
              + '<div class="dt-speak-result" id="dtSpeak' + si + '"></div></div>';
          }).join('')
        + '</div>';
    }
    var wrap = document.createElement('div');
    wrap.className = 'dt-extras';
    wrap.innerHTML = html;
    container.appendChild(wrap);

    wrap.querySelectorAll('[data-dt-listen]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var l = item.listen[parseInt(btn.getAttribute('data-dt-listen'), 10)];
        if (l) speak(l.text, { slow: false });
      });
    });
    wrap.querySelectorAll('[data-dt-speak]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sp = item.speak[parseInt(btn.getAttribute('data-dt-speak'), 10)];
        var out = document.getElementById('dtSpeak' + btn.getAttribute('data-dt-speak').replace('dtSpeak', ''));
        if (out) out.innerHTML = '<div class="muted">' + ICON.mic + ' Đang nghe…</div>';
        record(sp.model, function (ok, t, err, meta) {
          if (!out) return;
          if (err) { out.innerHTML = '<div class="bad">' + ICON.warn + ' ' + esc(err) + '</div>'; return; }
          var m = meta || matchSpeech(sp.model, t || '');
          var html;
          if (m.exact) html = '<div class="good">' + ICON.ok + ' Đúng chuẩn: ' + esc(t || '—') + '</div>';
          else if (m.near) html = '<div class="good">' + ICON.ok + ' Đúng (gần đúng ' + Math.round(m.score * 100) + '%): ' + esc(t || '—') + '<br><span class="muted">Chuẩn: ' + esc(sp.model) + '</span></div>';
          else html = '<div class="bad">' + ICON.no + ' Nghe lại nhé. Máy nghe thấy: ' + esc(t || '—') + '<br><span class="muted">Mẫu: ' + esc(sp.model) + '</span></div>';
          out.innerHTML = html;
        });
      });
    });
  }
  function renderExercise(holder, ex) {
    if (!holder || !ex) return;
    var isFill = ex.type === 'fill';
    holder.innerHTML = '<div class="dt-ex-q">' + (ex.q || '') + '</div>'
      + (isFill ? '<input type="text" class="dt-ex-in" placeholder="Đáp án…">'
                : '<div class="q-opts">' + ex.opts.map(function (o, i) {
                    return '<button type="button" class="opt" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div>')
      + '<div class="dt-ex-fb" id="dtExFb"></div>'
      + '<button type="button" class="btn dt-ex-go">Kiểm tra</button>';
    var fb = holder.querySelector('#dtExFb');
    function check() {
      var ok;
      if (isFill) {
        var v = norm(holder.querySelector('.dt-ex-in').value);
        ok = ex.answers.some(function (a) { return norm(a) === v; });
      } else {
        var sel = holder.querySelector('.opt.sel');
        ok = sel && parseInt(sel.getAttribute('data-i'), 10) === ex.a;
      }
      fb.className = 'dt-ex-fb show ' + (ok ? 'good' : 'bad');
      fb.innerHTML = (ok ? ICON.ok + ' ' : ICON.no + ' ') + (ex.ex || '');
      if (ok) {
        try {
          var p = (w.LearnDB && w.LearnDB.getPlayer && w.LearnDB.getPlayer()) || '';
          if (p && w.LearnDB.markThemeProgress) w.LearnDB.markThemeProgress(p, { fach: ex.fach || '', theme: ex.theme || '', done: true });
        } catch (_) {}
      }
    }
    holder.querySelector('.dt-ex-go').addEventListener('click', check);
    if (!isFill) holder.querySelectorAll('.opt').forEach(function (b) {
      b.addEventListener('click', function () {
        holder.querySelectorAll('.opt').forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel');
      });
    });
  }

  /* --- Level pass / unlock (qua markThemeProgress, key <fachId>:passed) --- */
  function isPassedCached(fachId) {
    try { return localStorage.getItem('dt:passed:' + fachId) === '1'; } catch (_) { return false; }
  }
  function markPassed(fachId) {
    try { localStorage.setItem('dt:passed:' + fachId, '1'); } catch (_) {}
    try {
      var p = (w.LearnDB && w.LearnDB.getPlayer && w.LearnDB.getPlayer()) || '';
      if (p && w.LearnDB.markThemeProgress) w.LearnDB.markThemeProgress(p, { fach: fachId, theme: 'passed', done: true });
    } catch (_) {}
  }

  w.DeutschTrack = {
    normalize: norm, speak: speak, record: record, match: matchSpeech,
    buildFach: buildFach, levels: levels, levelFachId: levelFachId, ensureFächer: ensureFächer,
    renderExtras: renderExtras, renderExercise: renderExercise,
    isPassedCached: isPassedCached, markPassed: markPassed
  };
})();
