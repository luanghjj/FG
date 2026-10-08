/* lid/lid-app.js — Standalone UI LiD: 3 tab Lernen/Tipps/Prüfung (classic script, IIFE, kein Framework).
 * Consumes: window.LID_GROUPS, window.LID_LAND_NAMES, window.LID_QUIZ, window.LID_TIPPS, window.LidExam.
 * Quiz-Entry-Form: { theme, cat, land, q, opts[4], a, ex } — kein qVi, kein img (Bild-Beschreibung steht im ex-Text). */
(function (w) {
  'use strict';

  var HIST_KEY = 'lid-hist-v1';
  var HIST_MAX = 50;

  var ICON_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
  var ICON_BAD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M8.5 15h7"/></svg>';

  var COMMON_THEMES = ['lid-demo', 'lid-gesch', 'lid-gesell', 'lid-europa'];

  var lidPaper = null;
  var lidAnswers = null;
  var lidTimer = null;
  var lidLeft = 0;

  var quizList = [];
  var quizIdx = 0;
  var quizCorrect = 0;
  var quizLocked = false;

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function themeLabel(theme) {
    var groups = w.LID_GROUPS || [];
    for (var i = 0; i < groups.length; i++) {
      var items = groups[i].items || [];
      for (var j = 0; j < items.length; j++) {
        if (items[j].id === theme) return items[j].name || theme;
      }
    }
    return theme;
  }

  function showTab(name) {
    var map = { Lernen: ['tabLernen', 'panelLernen'], Tipps: ['tabTipps', 'panelTipps'], Pruefung: ['tabPruefung', 'panelPruefung'] };
    Object.keys(map).forEach(function (k) {
      var btn = $(map[k][0]);
      var panel = $(map[k][1]);
      var on = (k === name);
      if (btn) { if (btn.classList) btn.classList.toggle('active', on); }
      if (panel) { if (on) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', ''); }
    });
    if (name === 'Tipps') renderTipps();
    if (name === 'Pruefung') renderExamIntro();
  }

  function bootLid() {
    var E = w.LidExam;
    var sel = $('lidLand');
    if (sel && E) {
      var names = w.LID_LAND_NAMES || {};
      sel.innerHTML = E.LANDS.map(function (code) {
        return '<option value="' + esc(code) + '">' + esc(code + ' · ' + (names[code] || code)) + '</option>';
      }).join('');
      sel.value = E.getLand();
      sel.onchange = function () {
        E.setLand(sel.value);
        stopTimer();
        renderLernen();
        renderExamIntroForce();
      };
    }
    var tL = $('tabLernen'), tT = $('tabTipps'), tP = $('tabPruefung');
    if (tL) tL.onclick = function () { showTab('Lernen'); };
    if (tT) tT.onclick = function () { showTab('Tipps'); };
    if (tP) tP.onclick = function () { showTab('Pruefung'); };
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('unload', stopTimer);
    }
    renderLernen();
    renderTipps();
    renderExamIntro();
    showTab('Lernen');
  }

  function landTheme() {
    var E = w.LidExam;
    var land = E ? E.getLand() : 'BY';
    return 'lid-land-' + land;
  }

  function renderLernen() {
    var area = $('quizArea');
    if (!area) return;
    var E = w.LidExam;
    var land = E ? E.getLand() : 'BY';
    var names = w.LID_LAND_NAMES || {};
    var themes = COMMON_THEMES.concat([landTheme()]);
    var boxes = themes.map(function (th) {
      return '<label class="theme"><input type="checkbox" data-theme="' + esc(th) + '" checked> ' + esc(themeLabel(th)) + '</label>';
    }).join('');
    area.innerHTML =
      '<p class="hint">Themenbereiche wählen (' + esc(names[land] || land) + ': 300 allgemeine + 10 Landesfragen). Bild-Fragen (Wappen/Karte) enthalten im Übungstext die vietnamesische Beschreibung — siehe Erklärung (ex).</p>' +
      '<div class="note">Schnellmerk: Bild-Fragen enthalten Beschreibungen im ex-Text (keine BAMF-Bilder nötig).</div>' +
      boxes +
      '<div class="row"><button type="button" class="btn" id="lernStart">Start</button>' +
      '<span class="hint" id="lernCount"></span></div>' +
      '<div id="lernQ"></div>';
    var btn = $('lernStart');
    if (btn) btn.onclick = function () { startQuiz(); };
    updateLernCount();
    var inputs = area.querySelectorAll ? area.querySelectorAll('input[data-theme]') : [];
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onchange = updateLernCount;
    }
  }

  function selectedThemes() {
    var area = $('quizArea');
    if (!area || !area.querySelectorAll) return COMMON_THEMES.concat([landTheme()]);
    var nodes = area.querySelectorAll('input[data-theme]:checked');
    var out = [];
    for (var i = 0; i < nodes.length; i++) out.push(nodes[i].getAttribute('data-theme'));
    return out;
  }

  function updateLernCount() {
    var el = $('lernCount');
    if (!el) return;
    var sel = selectedThemes();
    var n = (w.LID_QUIZ || []).filter(function (q) { return sel.indexOf(q.theme) !== -1; }).length;
    el.textContent = n + ' Fragen ausgewählt';
  }

  function startQuiz() {
    var sel = selectedThemes();
    quizList = (w.LID_QUIZ || []).filter(function (q) { return sel.indexOf(q.theme) !== -1; });
    quizIdx = 0;
    quizCorrect = 0;
    var box = $('lernQ');
    if (!quizList.length) {
      if (box) box.innerHTML = '<p class="err">Keine Fragen für diese Auswahl — bitte mindestens ein Themenbereich wählen.</p>';
      return;
    }
    renderQuizQ();
  }

  function renderQuizQ() {
    var box = $('lernQ');
    if (!box) return;
    quizLocked = false;
    if (quizIdx >= quizList.length) {
      box.innerHTML = '<p class="res ' + (quizCorrect >= 17 ? 'pass' : 'fail') + '">' +
        (quizCorrect >= 17 ? ICON_OK : ICON_BAD) +
        '<span>Ergebnis: ' + quizCorrect + ' / ' + quizList.length + ' richtig</span></p>' +
        '<div class="row"><button type="button" class="btn ghost" id="lernAgain">Nochmal</button></div>';
      var ag = $('lernAgain');
      if (ag) ag.onclick = function () { startQuiz(); };
      return;
    }
    var q = quizList[quizIdx];
    var html = '<p class="hint">Frage ' + (quizIdx + 1) + ' / ' + quizList.length + ' · Richtig: ' + quizCorrect + '</p>' +
      '<p class="q-cat">' + esc(q.cat || '') + '</p>' +
      '<p class="q">' + esc(q.q) + '</p>' +
      q.opts.map(function (o, i) {
        return '<button type="button" class="opt" data-i="' + i + '">' + esc(o) + '</button>';
      }).join('') +
      '<div id="lernFb"></div>';
    box.innerHTML = html;
    var btns = box.querySelectorAll ? box.querySelectorAll('.opt') : [];
    for (var i = 0; i < btns.length; i++) {
      btns[i].onclick = (function (btn) {
        return function () { pickQuizOpt(btn); };
      })(btns[i]);
    }
  }

  function pickQuizOpt(btn) {
    if (quizLocked) return;
    quizLocked = true;
    var box = $('lernQ');
    var q = quizList[quizIdx];
    var picked = Number(btn.getAttribute('data-i'));
    var btns = box ? box.querySelectorAll('.opt') : [];
    for (var i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
      if (i === q.a) btns[i].className += ' right';
      if (i === picked && picked !== q.a) btns[i].className += ' wrong';
    }
    var ok = (picked === q.a);
    if (ok) quizCorrect++;
    var fb = $('lernFb');
    if (fb) {
      fb.innerHTML = '<div class="q-feedback ' + (ok ? 'good' : 'bad') + '">' +
        (ok ? ICON_OK : ICON_BAD) +
        '<div><b>' + (ok ? 'Richtig' : 'Falsch — richtig: ' + esc(q.opts[q.a])) + '</b><br>' + esc(q.ex || '') +
        '<div class="row"><button type="button" class="btn" id="lernNext">Weiter</button></div></div></div>';
      var nx = $('lernNext');
      if (nx) nx.onclick = function () { quizIdx++; renderQuizQ(); };
    }
  }

  function renderTipps() {
    var area = $('tippsArea');
    if (!area) return;
    var tipps = w.LID_TIPPS || [];
    var notes = [];
    (w.LID_GROUPS || []).forEach(function (g) {
      (g.items || []).forEach(function (it) {
        var html = String(it.content || '');
        var m;
        var re = /<div class="note">([\s\S]*?)<\/div>/g;
        while ((m = re.exec(html)) !== null) notes.push(m[1]);
      });
    });
    var html = '<p class="hint">' + tipps.length + ' Prüfungstipps (VI) + Schnellmerk-Notizen aus den Themen.</p>' +
      '<ul class="tipps">' + tipps.map(function (t) {
        return '<li><b>' + esc(t.t) + ':</b> ' + esc(t.tip) + '</li>';
      }).join('') + '</ul>';
    if (notes.length) {
      html += '<h3>Schnellmerk aus den Themen</h3>' +
        notes.map(function (n) { return '<div class="note">' + n + '</div>'; }).join('');
    }
    area.innerHTML = html;
  }

  function stopTimer() {
    if (lidTimer) { try { clearInterval(lidTimer); } catch (e) {} lidTimer = null; }
  }

  function loadHist() {
    try {
      var raw = (typeof localStorage !== 'undefined') ? localStorage.getItem(HIST_KEY) : null;
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function saveHist(entry) {
    try {
      var arr = loadHist();
      arr.push(entry);
      while (arr.length > HIST_MAX) arr.shift();
      if (typeof localStorage !== 'undefined') localStorage.setItem(HIST_KEY, JSON.stringify(arr));
    } catch (e) {}
  }

  function renderExamIntro() {
    var area = $('examArea');
    if (!area || lidPaper) return;
    var E = w.LidExam;
    var names = w.LID_LAND_NAMES || {};
    var land = E ? E.getLand() : 'BY';
    var hist = loadHist();
    var histHtml = '';
    if (hist.length) {
      var last = hist.slice(-5).reverse();
      histHtml = '<h3>Verlauf (' + hist.length + ')</h3><ul class="tipps">' + last.map(function (h) {
        return '<li>' + esc(h.land || '') + ': ' + h.correct + '/33 — ' + (h.passed ? 'Bestanden' : 'Nicht bestanden') + '</li>';
      }).join('') + '</ul>';
    }
    area.innerHTML =
      '<p class="hint">Prüfungssimulation: 33 Fragen (30 allgemein + 3 aus ' + esc(names[land] || land) + '), 60 Minuten, bestanden ab 17 richtigen.</p>' +
      '<div class="row"><button type="button" class="btn" id="examStart">Prüfung starten</button></div>' +
      histHtml;
    var btn = $('examStart');
    if (btn) btn.onclick = function () { startLidPaper(); };
  }

  function startLidPaper() {
    var area = $('examArea');
    var E = w.LidExam;
    if (!area || !E) return;
    stopTimer();
    var paper = E.buildLidPaper(w.LID_QUIZ, E.getLand());
    if (!paper || paper.length !== 33) {
      lidPaper = null;
      area.innerHTML = '<p class="err">Fehlende Daten: kein vollständiger Prüfungsbogen (33) für dieses Bundesland verfügbar. Bitte später erneut versuchen.</p>' +
        '<div class="row"><button type="button" class="btn ghost" id="examBack">Zurück</button></div>';
      var back = $('examBack');
      if (back) back.onclick = function () { lidPaper = null; renderExamIntroForce(); };
      return;
    }
    lidPaper = paper;
    lidAnswers = [];
    for (var i = 0; i < paper.length; i++) lidAnswers.push(null);
    lidLeft = E.TIME_S;
    var html = '<div class="row"><span>Zeit: <span id="examTimer">' + esc(E.lidFormatTime(lidLeft)) + '</span> / 60:00</span>' +
      '<button type="button" class="btn" id="examSubmit">Abgeben</button></div>' +
      paper.map(function (q, qi) {
        return '<div><p class="q">' + (qi + 1) + '. ' + esc(q.q) + '</p>' +
          q.opts.map(function (o, oi) {
            return '<button type="button" class="opt" data-q="' + qi + '" data-i="' + oi + '">' + esc(o) + '</button>';
          }).join('') + '</div>';
      }).join('');
    area.innerHTML = html;
    var btns = area.querySelectorAll ? area.querySelectorAll('.opt') : [];
    for (var k = 0; k < btns.length; k++) {
      btns[k].onclick = (function (btn) {
        return function () {
          var qi = Number(btn.getAttribute('data-q'));
          var oi = Number(btn.getAttribute('data-i'));
          lidAnswers[qi] = oi;
          var group = area.querySelectorAll('.opt[data-q="' + qi + '"]');
          for (var j = 0; j < group.length; j++) {
            group[j].className = group[j].className.replace(/ selected/g, '');
          }
          btn.className += ' selected';
          btn.style.borderColor = '#123';
        };
      })(btns[k]);
    }
    var sub = $('examSubmit');
    if (sub) sub.onclick = function () { submitLidPaper(); };
    lidTimer = setInterval(function () {
      lidLeft--;
      var t = $('examTimer');
      if (t) t.textContent = E.lidFormatTime(lidLeft);
      if (lidLeft <= 0) submitLidPaper();
    }, 1000);
  }

  function renderExamIntroForce() {
    lidPaper = null;
    lidAnswers = null;
    var area = $('examArea');
    if (!area) return;
    area.innerHTML = '';
    renderExamIntro();
  }

  function submitLidPaper() {
    var area = $('examArea');
    var E = w.LidExam;
    if (!area || !E || !lidPaper) return;
    stopTimer();
    var res = E.lidScore(lidPaper, lidAnswers);
    var passMark = E.PASS_MARK;
    try {
      saveHist({ ts: Date.now(), land: E.getLand(), correct: res.correct, passed: res.passed });
    } catch (e) {}
    var wrongHtml = res.wrong.map(function (item) {
      var picked = (Number.isInteger(item.picked) && item.picked != null) ? item.opts[item.picked] : '— keine Antwort —';
      return '<div><p class="q">' + (item.index + 1) + '. ' + esc(item.q) + '</p>' +
        '<p class="hint">Deine Antwort: ' + esc(picked) + '<br>Richtig: <b>' + esc(item.opts[item.a]) + '</b></p>' +
        '<div class="q-feedback bad">' + ICON_BAD + '<div>' + esc(item.ex || '') + '</div></div></div>';
    }).join('');
    area.innerHTML =
      '<p class="res ' + (res.passed ? 'pass' : 'fail') + '">' + (res.passed ? ICON_OK : ICON_BAD) +
      '<span>' + (res.passed ? 'Bestanden' : 'Nicht bestanden') + ' (' + res.correct + '/' + res.total + ', ≥' + passMark + ')</span></p>' +
      (wrongHtml ? '<h3>Falsche Antworten (' + res.wrong.length + ')</h3>' + wrongHtml : '<p class="hint">Alles richtig — stark!</p>') +
      '<div class="row"><button type="button" class="btn" id="examRetry">Nochmal</button></div>';
    lidPaper = null;
    lidAnswers = null;
    var rt = $('examRetry');
    if (rt) rt.onclick = function () { renderExamIntroForce(); startLidPaper(); };
  }

  w.LidApp = {
    bootLid: bootLid,
    renderLernen: renderLernen,
    renderTipps: renderTipps,
    startLidPaper: startLidPaper,
    submitLidPaper: submitLidPaper
  };

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootLid);
    else bootLid();
  }
})(typeof window !== 'undefined' ? window : globalThis);
