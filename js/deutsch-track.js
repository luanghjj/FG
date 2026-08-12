/* Deutsch-Track (A1–C1): adapter, audio, extras, unlock */
(function () {
  'use strict';
  var w = window;

  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim();
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
    } catch (_) { toast && toast('🔊 Không hỗ trợ đọc tiếng nói trên thiết bị này.', 'warn'); }
  }
  function record(model, cb) {
    var SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { cb(false, null, 'SpeechRecognition không khả dụng'); return; }
    try {
      var r = new SR();
      r.lang = 'de-DE';
      r.interimResults = false;
      r.maxAlternatives = 1;
      r.onresult = function (e) {
        var t = (e.results[0] && e.results[0][0] && e.results[0][0].transcript) || '';
        cb(norm(t) === norm(model), t, null);
      };
      r.onerror = function () { cb(false, null, 'Không nghe được — kiểm tra micro.'); };
      r.onend = function () {};
      r.start();
    } catch (_) { cb(false, null, 'Không khởi động được SpeechRecognition.'); }
  }

  function buildFach(levelData, id) {
    var units = (levelData && levelData.units) || [];
    var groups = units.map(function (u) {
      return {
        id: u.id, badge: levelData.badge || 'A1', title: u.title,
        items: (u.lektionen || []).map(function (l) {
          return {
            id: l.id, icon: l.icon || '🇩🇪', name: l.name, desc: l.desc || '',
            content: l.content || '',
            grammar: l.grammar || null, listen: l.listen || null, speak: l.speak || null
          };
        })
      };
    });
    var LEVEL_QUIZ = { a1: 'DEUTSCH_A1_QUIZ', beruf: 'DEUTSCH_BERUF_QUIZ' };
    return {
      id: id, code: levelData.code || 'DE ' + (levelData.badge || ''), name: levelData.title,
      icon: '🇩🇪', accent: '#dc2626', soft: '#fef2f2', ready: true, hidden: true, track: 'deutsch',
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
        return '<div class="dt-block dt-grammar"><h3 class="sub">📘 ' + esc(g.title) + '</h3>'
          + '<div>' + g.rule + '</div>'
          + ((g.examples || []).length ? '<ul class="dt-examples">' + g.examples.map(function (x) {
              var s = String(x); if (s.indexOf('<') === -1) s = esc(s);
              return '<li>' + s + '</li>'; }).join('') + '</ul>' : '')
          + ex + '</div>';
      }).join('');
    }
    if (item.listen && item.listen.length) {
      html += '<div class="dt-block dt-listen"><h3 class="sub">🔊 Luyện nghe</h3>'
        + item.listen.map(function (l, li) {
            return '<div class="dt-listen-row"><button type="button" class="btn ghost" data-dt-listen="' + li + '">▶ Nghe</button>'
              + '<span>' + esc(l.text) + '</span>'
              + (l.tip ? '<div class="muted">💡 ' + esc(l.tip) + '</div>' : '') + '</div>';
          }).join('')
        + (item.listen.some(function (l) { return l.slow; })
            ? '<div class="muted">Nghe lại chậm với nút <b>🐢 Chậm</b> khi bật ở từng dòng.</div>' : '')
        + '</div>';
    }
    if (item.speak && item.speak.length) {
      html += '<div class="dt-block dt-speak"><h3 class="sub">🎤 Luyện nói</h3>'
        + item.speak.map(function (sp, si) {
            return '<div class="dt-speak-row"><div class="muted">' + esc(sp.prompt) + '</div>'
              + '<div class="dt-model">' + esc(sp.model) + '</div>'
              + (sp.hint ? '<div class="muted">🗣 ' + esc(sp.hint) + '</div>' : '')
              + '<button type="button" class="btn" data-dt-speak="' + si + '">🎤 Đọc &amp; kiểm tra</button>'
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
        if (out) out.innerHTML = '<div class="muted">🎤 Đang nghe…</div>';
        record(sp.model, function (ok, t, err) {
          if (!out) return;
          if (err) out.innerHTML = '<div class="bad">⚠️ ' + esc(err) + '</div>';
          else out.innerHTML = '<div class="' + (ok ? 'good' : 'bad') + '">'
            + (ok ? '✅ Nghe được: ' : '😅 Nghe lại nhé. Máy nghe thấy: ') + esc(t || '—') + '</div>';
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
      fb.innerHTML = (ok ? '✅ ' : '❌ ') + (ex.ex || '');
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
    normalize: norm, speak: speak, record: record,
    buildFach: buildFach, levels: levels, levelFachId: levelFachId, ensureFächer: ensureFächer,
    renderExtras: renderExtras, renderExercise: renderExercise,
    isPassedCached: isPassedCached, markPassed: markPassed
  };
})();
