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

  function initTheme() {
    var btn = $('themeToggle');
    var saved = null;
    try { saved = localStorage.getItem('azubi_theme'); } catch (_) {}
    var current = saved || 'auto';
    function apply(mode) {
      current = mode;
      try { localStorage.setItem('azubi_theme', mode); } catch (_) {}
      var html = document.documentElement;
      if (mode === 'dark') html.setAttribute('data-theme', 'dark');
      else if (mode === 'light') html.setAttribute('data-theme', 'light');
      else html.removeAttribute('data-theme');
      updateIcon();
    }
    function updateIcon() {
      if (!btn) return;
      var isDark = (current === 'dark') || (current === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
        btn.title = 'Chuyển sang chế độ sáng';
      } else {
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        btn.title = 'Chuyển sang chế độ tối';
      }
    }
    if (btn) {
      btn.onclick = function () {
        var next = (current === 'dark') ? 'light' : 'dark';
        apply(next);
      };
    }
    apply(current);
  }

  function bootLid() {
    initTheme();
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
      return '<label class="theme"><input type="checkbox" data-theme="' + esc(th) + '" checked> <span>' + esc(themeLabel(th)) + '</span></label>';
    }).join('');
    area.innerHTML =
      '<p class="hint">Chọn các chủ đề cần ôn tập (' + esc(names[land] || land) + ': 300 câu hỏi chung + 10 câu hỏi của bang). Các câu hỏi hình ảnh (huy hiệu / bản đồ) đều có chú giải mô tả nhận dạng chi tiết bằng tiếng Việt trong phần giải thích.</p>' +
      '<div class="note"><strong>Lưu ý:</strong> Câu hỏi có hình ảnh (huy hiệu bang, bản đồ phân vùng) đã được tích hợp mô tả nhận dạng tiếng Việt trong phần giải thích (Erklärung).</div>' +
      '<div class="theme-picker-grid">' + boxes + '</div>' +
      '<div class="row">' +
        '<button type="button" class="btn btn-primary" id="lernStart">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:17px;height:17px"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
          '<span>Bắt đầu ôn tập (Start)</span>' +
        '</button>' +
        '<span class="lern-count-badge" id="lernCount"></span>' +
      '</div>' +
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
    el.textContent = n + ' câu hỏi đã chọn';
  }

  function startQuiz() {
    var sel = selectedThemes();
    quizList = (w.LID_QUIZ || []).filter(function (q) { return sel.indexOf(q.theme) !== -1; });
    quizIdx = 0;
    quizCorrect = 0;
    var box = $('lernQ');
    if (!quizList.length) {
      if (box) box.innerHTML = '<p class="err">Chưa có câu hỏi nào được chọn — vui lòng tích chọn ít nhất một chủ đề.</p>';
      return;
    }
    renderQuizQ();
  }

  function renderQuizQ() {
    var box = $('lernQ');
    if (!box) return;
    quizLocked = false;
    if (quizIdx >= quizList.length) {
      var pct = Math.round((quizCorrect / quizList.length) * 100);
      var passed = quizCorrect >= Math.ceil(quizList.length * 0.5);
      box.innerHTML = '<div class="result-hero-card ' + (passed ? 'pass' : 'fail') + '">' +
        '<div class="result-icon">' + (passed ? ICON_OK : ICON_BAD) + '</div>' +
        '<h2 class="result-title">' + (passed ? 'Hoàn thành xuất sắc!' : 'Cần cố gắng thêm!') + '</h2>' +
        '<div class="result-score">' + quizCorrect + ' <span>/ ' + quizList.length + ' câu đúng</span></div>' +
        '<div class="result-badge-row">' +
          '<span class="res-tag">' + (passed ? 'Đạt yêu cầu' : 'Chưa đạt') + '</span>' +
          '<span class="res-pct">' + pct + '%</span>' +
        '</div>' +
        '<div class="row" style="justify-content:center"><button type="button" class="btn btn-primary" id="lernAgain">Luyện lại chủ đề này</button></div>' +
      '</div>';
      var ag = $('lernAgain');
      if (ag) ag.onclick = function () { startQuiz(); };
      return;
    }
    var q = quizList[quizIdx];
    var pctQ = Math.round((quizIdx / quizList.length) * 100);
    var html = '<div class="quiz-card-head">' +
      '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + pctQ + '%"></div></div>' +
      '<div class="quiz-meta-row">' +
        '<span class="q-badge">Frage ' + (quizIdx + 1) + ' / ' + quizList.length + '</span>' +
        '<span class="q-score-badge">Đúng: ' + quizCorrect + '</span>' +
        (q.cat ? '<span class="q-cat-tag">' + esc(q.cat) + '</span>' : '') +
      '</div>' +
    '</div>' +
    '<h3 class="q">' + esc(q.q) + '</h3>' +
    '<div class="q-opts-list">' +
      q.opts.map(function (o, i) {
        var letter = String.fromCharCode(65 + i);
        return '<button type="button" class="opt" data-i="' + i + '">' +
          '<span class="opt-letter">' + letter + '</span>' +
          '<span class="opt-txt">' + esc(o) + '</span>' +
        '</button>';
      }).join('') +
    '</div>' +
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
        '<div class="fb-icon">' + (ok ? ICON_OK : ICON_BAD) + '</div>' +
        '<div class="fb-content">' +
          '<div class="fb-title">' + (ok ? 'Chính xác! (Richtig)' : 'Chưa đúng — đáp án đúng: ' + esc(q.opts[q.a])) + '</div>' +
          (q.ex ? '<div class="fb-ex">' + esc(q.ex) + '</div>' : '') +
          '<div class="fb-actions"><button type="button" class="btn btn-primary" id="lernNext">Tiếp tục (Weiter) →</button></div>' +
        '</div>' +
      '</div>';
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
    var html = '<div class="tipps-intro-card">' +
      '<div class="tipps-intro-title">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>' +
        '<span>Tổng hợp ' + tipps.length + ' mẹo thi &amp; bẫy đề thi Einbürgerungstest</span>' +
      '</div>' +
      '<p class="hint">Các bí quyết nhận diện nhanh đáp án đúng và tránh các bẫy thường gặp trong đề thi BAMF bằng tiếng Việt.</p>' +
    '</div>' +
    '<div class="tipps-grid">' +
      tipps.map(function (t, i) {
        return '<div class="tipp-card">' +
          '<div class="tipp-head">' +
            '<span class="tipp-idx">#' + (i + 1) + '</span>' +
            '<h4 class="tipp-title">' + esc(t.t) + '</h4>' +
          '</div>' +
          '<p class="tipp-body">' + esc(t.tip) + '</p>' +
        '</div>';
      }).join('') +
    '</div>';
    if (notes.length) {
      html += '<div class="notes-section">' +
        '<h3 class="sec-title">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' +
          '<span>Schnellmerk aus den Themen (Ghi nhớ nhanh từ các bài)</span>' +
        '</h3>' +
        notes.map(function (n) { return '<div class="note">' + n + '</div>'; }).join('') +
      '</div>';
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
      var last = hist.slice(-8).reverse();
      histHtml = '<div class="exam-history-card">' +
        '<h3 class="exam-history-title">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>' +
          '<span>Lịch sử thi thử gần nhất (' + hist.length + ' lượt)</span>' +
        '</h3>' +
        '<div class="history-list">' +
          last.map(function (h) {
            var d = h.ts ? new Date(h.ts).toLocaleDateString('de-DE') : '';
            return '<div class="hist-item ' + (h.passed ? 'pass' : 'fail') + '">' +
              '<div class="hist-main">' +
                '<span class="hist-land">' + esc(h.land || '') + '</span>' +
                (d ? '<span class="hist-date">' + d + '</span>' : '') +
              '</div>' +
              '<div class="hist-right">' +
                '<span class="hist-score">' + Number(h.correct || 0) + ' / 33</span>' +
                '<span class="hist-status-pill ' + (h.passed ? 'pass' : 'fail') + '">' +
                  (h.passed ? 'ĐẬU (Bestanden)' : 'CHƯA ĐẬU') +
                '</span>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
    }
    area.innerHTML =
      '<div class="exam-banner-card">' +
        '<div class="exam-banner-badge">OFFIZIELLE PRÜFUNGSSIMULATION · BAMF</div>' +
        '<h2 class="exam-banner-title">Mô phỏng kỳ thi Leben in Deutschland</h2>' +
        '<p class="exam-banner-desc">Đề thi mô phỏng theo cấu trúc chuẩn của BAMF dành cho bang <strong>' + esc(names[land] || land) + '</strong> với đúng 33 câu hỏi bốc ngẫu nhiên từ ngân hàng 310 câu hỏi.</p>' +
        '<div class="exam-criteria-grid">' +
          '<div class="crit-item"><span class="crit-val">33</span><span class="crit-lbl">Câu hỏi (30 chung + 3 bang)</span></div>' +
          '<div class="crit-item"><span class="crit-val">60</span><span class="crit-lbl">Phút làm bài thi</span></div>' +
          '<div class="crit-item highlight"><span class="crit-val">≥ 17</span><span class="crit-lbl">Câu đúng để ĐẬU (51.5%)</span></div>' +
        '</div>' +
        '<div class="row">' +
          '<button type="button" class="btn btn-primary btn-lg" id="examStart">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
            '<span>Bắt đầu làm bài thi (Prüfung starten)</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
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
    var html = '<div class="exam-sticky-bar">' +
      '<div class="exam-sticky-inner">' +
        '<div class="exam-timer-wrap">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>' +
          '<span>Thời gian:</span> <strong id="examTimer">' + esc(E.lidFormatTime(lidLeft)) + '</strong>' +
        '</div>' +
        '<button type="button" class="btn btn-primary" id="examSubmit">Nộp bài (Abgeben)</button>' +
      '</div>' +
    '</div>' +
    '<div class="exam-questions-list">' +
      paper.map(function (q, qi) {
        return '<div class="exam-q-box">' +
          '<div class="exam-q-num">Câu ' + (qi + 1) + ' / 33' + (q.land ? ' · <span class="badge-bang">Bang ' + esc(q.land) + '</span>' : '') + '</div>' +
          '<h4 class="q">' + esc(q.q) + '</h4>' +
          '<div class="q-opts-list">' +
            q.opts.map(function (o, oi) {
              var letter = String.fromCharCode(65 + oi);
              return '<button type="button" class="opt" data-q="' + qi + '" data-i="' + oi + '">' +
                '<span class="opt-letter">' + letter + '</span>' +
                '<span class="opt-txt">' + esc(o) + '</span>' +
              '</button>';
            }).join('') +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>';
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
    var pct = Math.round((res.correct / res.total) * 100);
    try {
      saveHist({ ts: Date.now(), land: E.getLand(), correct: res.correct, passed: res.passed });
    } catch (e) {}
    var wrongHtml = res.wrong.map(function (item) {
      var picked = (Number.isInteger(item.picked) && item.picked != null) ? item.opts[item.picked] : '— Chưa trả lời —';
      return '<div class="exam-review-card">' +
        '<div class="review-q-num">Câu ' + (item.index + 1) + ' / ' + res.total + '</div>' +
        '<h4 class="q">' + esc(item.q) + '</h4>' +
        '<div class="review-answers">' +
          '<div class="ans-picked"><span class="ans-lbl">Bạn đã chọn:</span> <span class="ans-val wrong">' + esc(picked) + '</span></div>' +
          '<div class="ans-correct"><span class="ans-lbl">Đáp án đúng:</span> <span class="ans-val correct">' + esc(item.opts[item.a]) + '</span></div>' +
        '</div>' +
        (item.ex ? '<div class="q-feedback bad"><div class="fb-icon">' + ICON_BAD + '</div><div class="fb-content"><div class="fb-ex">' + esc(item.ex) + '</div></div></div>' : '') +
      '</div>';
    }).join('');
    area.innerHTML =
      '<div class="result-hero-card ' + (res.passed ? 'pass' : 'fail') + '">' +
        '<div class="result-icon">' + (res.passed ? ICON_OK : ICON_BAD) + '</div>' +
        '<h2 class="result-title">' + (res.passed ? 'Herzlichen Glückwunsch! Bạn đã THI ĐẬU' : 'Rất tiếc! Bạn CHƯA ĐẠT kỳ thi này') + '</h2>' +
        '<div class="result-score">' + res.correct + ' <span>/ ' + res.total + ' câu đúng</span></div>' +
        '<div class="result-badge-row">' +
          '<span class="res-tag">' + (res.passed ? 'Bestanden (≥ 17)' : 'Nicht bestanden (< 17)') + '</span>' +
          '<span class="res-pct">' + pct + '%</span>' +
        '</div>' +
        '<div class="row" style="justify-content:center"><button type="button" class="btn btn-primary" id="examRetry">Làm đề thi khác (Nochmal)</button></div>' +
      '</div>' +
      (wrongHtml ? '<div class="wrong-review-sec"><h3 class="sec-title">Xem lại các câu làm sai (' + res.wrong.length + ' câu)</h3>' + wrongHtml + '</div>' : '<div class="note">Xuất sắc! Bạn trả lời đúng tất cả 33 câu hỏi!</div>');
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
