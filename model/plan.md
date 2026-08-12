# AzubiHub Deutsch-Track (A1–C1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mở rộng AzubiHub thành 2 nhánh học (chọn sau đăng nhập): Fachkraft (giữ nguyên) + Deutsch A1–C1 (mới, MVP = trọn A1), tái sử dụng tối đa engine có sẵn.

**Architecture:** Deutsch track = "virtual fächer" (`track:'deutsch'`, `hidden:true`) đăng ký vào `FachForm` — Lektion tái sử dụng 100% theme-page (content/flashcards/quiz CTA), quiz cấp độ tái sử dụng `fachQuizIntro/Start/Result`. Route `#/deutsch/…` redirect sang `#/fach/deutsch-a1/…`. Tính năng mới chỉ 3 chỗ: module `js/deutsch-track.js` (audio + extras + adapter), TrackGate overlay, theme-page hook 1 dòng. Audio = Web Speech API, zero file audio.

**Tech Stack:** Plain HTML/JS static PWA (không build). speechSynthesis + SpeechRecognition (webkit). Supabase (đã có) cho progress qua `LearnDB.markThemeProgress`.

**Spec:** `model/spec-deutsch-track.md` · **Data model:** `model/data-model.md` · **Form chuẩn content:** `.claude/skills/ont-thi-fach/SKILL.md`

## Global Constraints

- Repo root: `/Users/nguyenchilinh/Desktop/ôn thi` (path có space + dấu tiếng Việt — quote mọi lệnh).
- `sw.js`/`pwa.js`/`manifest.webmanifest` bắt buộc ở root; cache name `azubihub-v107` (Task 9); mọi file mới thêm vào `PRECACHE`.
- File mới phải đăng ký `<script src="./…">` trong `index.html` đúng thứ tự (data trước, `js/deutsch-track.js` sau `js/faecher.js`) + bump `?v=N`.
- Gate kiểm tra: `node --check` mọi JS sửa + `node test/verify-links.mjs` → "PASS: mọi tham chiếu local đều tồn tại" + `git status --short` sạch cuối mỗi task.
- KHÔNG đổi login/Supabase core, KHÔNG đổi routing `#/fach`/`#/exam`, KHÔNG thêm hệ progress mới (dùng `markThemeProgress`).
- Id slug ascii bất biến (đổi id = vỡ quiz/key progress). Vocab DE→VI qua `.term` trong content (flashcards tự sinh), từ chung mới thêm vào `B1_VOCAB` (js/vocab.js).
- Nội dung tiếng Đức chuẩn: không bịa ngữ pháp; hướng dẫn nút 🔊/🎤 có fallback khi thiết bị không hỗ trợ.
- Tên track fach: `deutsch-a1`, `deutsch-beruf` (sau này `deutsch-a2`…`deutsch-c1`).

## File Structure

- **Create** `js/deutsch-track.js` — adapter + audio + extras + unlock (1 module, chịu trách nhiệm toàn bộ tính năng Deutsch-track).
- **Create** `faecher/deutsch/a1-data.js` — `window.DEUTSCH_A1` (units/lektionen).
- **Create** `faecher/deutsch/a1-quiz.js` — `window.DEUTSCH_A1_QUIZ` (60 câu).
- **Create** `faecher/deutsch/beruf-data.js` — `window.DEUTSCH_BERUF`.
- **Modify** `js/faecher.js` — thêm `FachForm.registerFach(fach)`.
- **Modify** `index.html` — TrackGate markup+CSS, router branch `#/deutsch`, hub view `v-deutsch`, hook theme-page, header switcher, hidden-filter ở hub, setBottomNav, script tags.
- **Modify** `js/vocab.js` — nút 🔊 trong popup term + `Vocab.say()`.
- **Modify** `js/wissen.js` — chunk Deutsch cho AI chat.
- **Modify** `sw.js` — PRECACHE + CACHE `azubihub-v107`.

---

### Task 1: Core — `js/deutsch-track.js` + `FachForm.registerFach` + hidden filter

**Files:**
- Create: `js/deutsch-track.js`
- Modify: `js/faecher.js` (cuối file, trong `window.FachForm` export)
- Modify: `index.html` (hub list ~4297, renderFachHub ~2717)

**Interfaces:**
- Consumes: `window.FachForm.FAECHER`, `LearnDB.markThemeProgress(player, opts)` (js/supabase.js:392), `window.DEUTSCH_A1`/`DEUTSCH_BERUF` (load sau), `Vocab` (js/vocab.js).
- Produces: `window.DeutschTrack` — `levels()`, `levelFachId(level)`, `buildFach(levelData,id)`, `ensureFächer()`, `speak(text,opts)`, `record(model,cb)`, `renderExtras(container,item)`, `renderExercise(holder,ex)`, `markPassed(fachId)`, `isPassedCached(fachId)`, `normalize(s)`.

- [ ] **Step 1: Add `registerFach` to FachForm**

Trong `js/faecher.js`, export block `w.FachForm = w.FachForm || { … }`, thêm:

```js
registerFach(fach) {
  if (!fach || !fach.id) return null;
  if (FAECHER.some((f) => f.id === fach.id)) return null;
  FAECHER.push(fach);
  return fach;
},
```

- [ ] **Step 2: Hidden filter — main hub (index.html ~4297)**

Chỗ `(window.FachForm.FAECHER||[]).forEach(fach=>{` (render danh sách hub chính), đổi thành:

```js
(window.FachForm.FAECHER||[]).filter(f=>!f.hidden).forEach(fach=>{
```

- [ ] **Step 3: Hidden filter — renderFachHub (index.html ~2717)**

Đầu `renderFachHub(fachId)`: sau khi tìm `fach`, nếu `fach && fach.hidden` → vẫn render bình thường (người dùng vào từ `#/deutsch`). Trong phần render tabs "Training"/"Prüfungen": nếu `fach.track==='deutsch'` → ẩn 2 tab này (chỉ giữ Themen tab). Tìm chỗ gán tab list (vd `tabs=[…]`), thêm guard:

```js
if (fach && fach.track === 'deutsch') tabs = tabs.filter(t => t.id !== 'training' && t.id !== 'pruefungen');
```

- [ ] **Step 4: Write core module `js/deutsch-track.js`**

```js
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
```

- [ ] **Step 5: node --check**

Run: `node --check js/deutsch-track.js && node --check js/faecher.js` — Expected: exit 0, không output.

- [ ] **Step 6: Smoke test adapter**

```bash
node -e "
global.window={};
global.speechSynthesis={getVoices:()=>[],cancel(){},speak(){}};
global.toast=()=>{};
const fs=require('fs');
const src=fs.readFileSync('js/deutsch-track.js','utf8');
eval(src);
window.DEUTSCH_A1={level:'a1',badge:'A1',title:'Deutsch A1',code:'DE A1',units:[{id:'u1',title:'Begrüßung',lektionen:[{id:'u1-l1',name:'Sich vorstellen',content:'<h2>x</h2>',grammar:[{id:'g1',title:'T',rule:'r',examples:['a'],exercise:{type:'fill',theme:'u1-l1',q:'q',answers:['das'],answer:'das'}}],listen:[{id:'l1',text:'Hallo'}]}]}]};
const f=window.DeutschTrack.buildFach(window.DEUTSCH_A1,'deutsch-a1');
if(f.hidden!==true||f.track!=='deutsch') throw new Error('flags');
if(f.groups.length!==1||f.groups[0].items[0].id!=='u1-l1') throw new Error('groups/items');
if(!f.groups[0].items[0].grammar||!f.groups[0].items[0].listen) throw new Error('extras passthrough');
console.log('adapter OK');
"
```

Expected: `adapter OK`. (Nếu eval khác do cấu trúc IIFE — sửa cách load nhưng KHÔNG sửa logic module.)

- [ ] **Step 7: Harness + commit**

Run: `node test/verify-links.mjs` → PASS. `git add js/deutsch-track.js js/faecher.js index.html && git commit -m "feat: DeutschTrack core module + FachForm.registerFach + hidden filter"`

---

### Task 2: TrackGate + router `#/deutsch` + hub view + header switcher

**Files:**
- Modify: `index.html` (login gate hide — `unlockApp` ~4995; router ~4085; header; CSS; view markup)
- (js/deutsch-track.js đã có `levels()`, `levelFachId()`)

**Interfaces:**
- Consumes: `DeutschTrack.levels()`, `DeutschTrack.levelFachId(lv)`, `DeutschTrack.isPassedCached(fachId)`, `go(hash)`, `toast()`.
- Produces: view `v-deutsch` (id), `renderDeutschHub()`, `showTrackGate()`, `hideTrackGate()`.

- [ ] **Step 1: TrackGate markup + CSS (đặt cạnh #loginGate, index.html ~922)**

```html
<div id="trackGate" class="gate hidden">
  <div class="track-card">
    <div class="track-logo">🗂️</div>
    <h1>Wähle deinen Lernbereich</h1>
    <div class="sub">Chọn nhánh học của bạn</div>
    <div class="track-grid">
      <button type="button" class="track-btn" id="trackFachkraft" onclick="pickTrack('fachkraft')">
        <span class="track-emoji">🧑‍🍳</span>
        <span class="track-title">Fachkraft für Gastronomie</span>
        <span class="track-sub">6 môn nghề · BfK-1 · BfK-2 · GK · WiKO · Englisch · Deutsch</span>
      </button>
      <button type="button" class="track-btn" id="trackDeutsch" onclick="pickTrack('deutsch')">
        <span class="track-emoji">🇩🇪</span>
        <span class="track-title">Deutsch A1–C1</span>
        <span class="track-sub">Lộ trình CEFR + Berufsdeutsch · vocab · ngữ pháp · nghe · nói</span>
      </button>
    </div>
    <div class="track-skip muted"><a onclick="pickTrack('fachkraft')">Vào thẳng Fachkraft →</a></div>
  </div>
</div>
```

CSS kế thừa `#loginGate` block (index.html ~294-351): `#trackGate` dùng chung style `.hidden`; `.track-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}`, `.track-btn{...border-radius:18px;padding:22px 16px;text-align:center}` + `.track-btn:hover{...}`, responsive `@media(max-width:560px){.track-grid{grid-template-columns:1fr}}`.

JS (đặt gần `unlockApp`):

```js
function pickTrack(which) {
  var g = document.getElementById('trackGate');
  if (g) g.classList.add('hidden');
  if (which === 'deutsch') go('#/deutsch'); else go('#/fach');
}
function showTrackGate() {
  var g = document.getElementById('trackGate');
  if (g) g.classList.remove('hidden');
}
function hideTrackGate() {
  var g = document.getElementById('trackGate');
  if (g) g.classList.add('hidden');
}
```

- [ ] **Step 2: Hiện TrackGate sau login**

Trong `unlockApp(player)` (index.html ~4995), sau `loadHomeHistory(player);` thêm:

```js
showTrackGate();
```

(Giữ nguyên toast + `learn-ready-install` setTimeout.)

- [ ] **Step 3: Router branch `#/deutsch`**

Trong `router()` (index.html:4085), thêm trước block `let r=ROUTES[hash];` (trước fallback chung):

```js
  if (hash.startsWith('#/deutsch')) {
    var parts = hash.replace('#/deutsch', '').split('/').filter(Boolean);
    var lv = parts[0] || '';
    var fachId = (window.DeutschTrack && window.DeutschTrack.levelFachId(lv)) || null;
    if (!fachId) { // #/deutsch hoặc level chưa có → hub Deutsch
      document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
      var dv = document.getElementById('v-deutsch');
      if (dv) dv.classList.add('active');
      var cb = document.getElementById('crumbs');
      if (cb) cb.innerHTML = '<a onclick="go(\'#/\')">Start</a><span class="sep">›</span><span>Deutsch A1–C1</span>';
      renderDeutschHub();
      setBottomNav(hash); window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // #/deutsch/<level>[/quiz|/unit/lektion] → reuse fach machinery
    if (parts[1] === 'quiz') { location.hash = '#/fach/' + fachId + '/quiz'; return; }
    if (parts.length === 2) { location.hash = '#/fach/' + fachId; return; }          // unit list = fach hub
    if (parts.length === 3 && parts[2]) { location.hash = '#/fach/' + fachId + '/theme/' + parts[2]; return; } // lektion
    location.hash = '#/fach/' + fachId; return;
  }
```

- [ ] **Step 4: View `v-deutsch` + `renderDeutschHub()`**

Markup (đặt cạnh các view khác):

```html
<div class="view" id="v-deutsch" data-nav="Deutsch">
  <div class="view-head"><h2>🇩🇪 Deutsch A1–C1</h2><p class="muted">Lộ trình tiếng Đức + Berufsdeutsch Gastgewerbe</p></div>
  <div id="deutschHubBody" class="hub-body"></div>
</div>
```

JS:

```js
function renderDeutschHub() {
  var body = document.getElementById('deutschHubBody');
  if (!body) return;
  if (!window.DeutschTrack) { body.innerHTML = '<p class="muted">Modul chưa sẵn sàng.</p>'; return; }
  var lv = window.DeutschTrack.levels();
  body.innerHTML = '<div class="grid2">' + lv.map(function (l) {
    var done = window.DeutschTrack.isPassedCached(l.id);
    var badge = l.level === 'beruf' ? '🛎️' : l.badge;
    return '<button type="button" class="tile" onclick="go(\'#/deutsch/' + l.level + '\')">'
      + '<span class="tile-ic">' + badge + '</span>'
      + '<span class="tile-t">' + l.title + '</span>'
      + '<span class="tile-d">' + l.units + ' Units' + (done ? ' · ✅ hoàn thành' : '') + '</span>'
      + '</button>';
  }).join('') + '</div>'
    + '<div class="hint" style="margin-top:14px">💡 Mỗi cấp: học từ vựng bằng flashcards, ngữ pháp kèm bài tập, luyện nghe 🔊, nói 🎤. Đạt ≥80% quiz cuối cấp để mở khóa cấp sau.</div>';
}
```

- [ ] **Step 5: Header switcher "↺"**

Tìm nút header hiện có (vd `renderUserChip`/header nav), thêm link nhỏ cạnh user chip:

```html
<a class="track-switch" onclick="showTrackGate()" title="Track wählen">↺</a>
```

+ CSS nhỏ `.track-switch{...color:#64748b;font-size:1.05em;text-decoration:none}`.

- [ ] **Step 6: setBottomNav — đánh dấu active khi ở #/deutsch**

Trong `setBottomNav(hash)` (index.html:4830), dòng `else if(t==='#faecher') on=...`, thêm `|| h.startsWith('#/deutsch')`:

```js
else if(t==='#faecher') on=h.startsWith('#/bfk') || h.startsWith('#/fach') || h.startsWith('#/abschluss') || h.startsWith('#/deutsch');
```

- [ ] **Step 7: Đăng ký script + verify + commit**

Đăng ký `js/deutsch-track.js` trong index.html (SAU `js/faecher.js`, trước `js/wissen.js`):

```html
<script src="./js/deutsch-track.js?v=1"></script>
```

`node --check` không áp dụng (không sửa js mới ở task này) — chạy `node test/verify-links.mjs` → PASS.
Manual (trình duyệt, http.server): đăng nhập → TrackGate hiện → chọn Deutsch → thấy hub Deutsch (A1 + Berufsdeutsch cards) → chọn Fachkraft → hub cũ nguyên vẹn → header có "↺".
Commit: `git add index.html && git commit -m "feat: track gate after login + #/deutsch hub routing"`

---

### Task 3: Theme-page hook + vocab 🔊

**Files:**
- Modify: `index.html` (renderFachTheme — tab theory, sau `enableVocabOn(panel)` ~2853)
- Modify: `js/vocab.js` (popup term + `Vocab.say`)

**Interfaces:**
- Consumes: `DeutschTrack.renderExtras(container, item)`, `DeutschTrack.speak(text,opts)`.
- Produces: nút 🔊 trong popup vocab (global); `Vocab.say(word)`.

- [ ] **Step 1: Hook extras vào theme page**

Trong `renderFachTheme` (index.html ~2846-2854), tab `theory`, sau khối `enableVocabOn(panel)`:

```js
    try { if (window.DeutschTrack && theme && (theme.grammar || theme.listen || theme.speak)) window.DeutschTrack.renderExtras(panel, theme); } catch (e) {}
```

- [ ] **Step 2: 🔊 trong popup vocab**

`js/vocab.js`: tại chỗ dựng popup term (tìm `function lookupVi`/hàm tạo popup), trong nội dung popup thêm nút:

```js
' <button type="button" class="vocab-say" onclick="window.Vocab&&window.Vocab.say(this.getAttribute(\'data-de\'))" data-de="' + escAttr(de) + '">🔊</button>'
```

Thêm `say` vào `w.Vocab`:

```js
say: function (word) {
  try {
    var u = new SpeechSynthesisUtterance(String(word));
    u.lang = 'de-DE';
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch (_) {}
},
```

CSS `.vocab-say{background:none;border:none;font-size:1em;cursor:pointer}`.

- [ ] **Step 3: Verify + commit**

`node --check js/vocab.js` → 0 lỗi. `node test/verify-links.mjs` → PASS.
Manual: mở 1 lektion (sau Task 4) hoặc 1 fach bất kỳ → tap term → popup có 🔊 phát âm được.
Commit: `git add index.html js/vocab.js && git commit -m "feat: theme-page grammar/listen/speak extras hook + vocab 🔊"`

---

### Task 4: A1 data — exemplar + Unit 1–2

**Files:**
- Create: `faecher/deutsch/a1-data.js` (window.DEUTSCH_A1 — u1, u2)
- Modify: `index.html` (script tag a1-data.js)
- (Dùng form chuẩn theo `.claude/skills/ont-thi-fach/SKILL.md` + `model/data-model.md`)

**Interfaces:**
- Produces: `window.DEUTSCH_A1 = { level:'a1', badge:'A1', code:'DE A1', title:'Deutsch A1', units:[Unit] }`; Unit `{id,title,desc,icon,lektionen:[Lektion]}`; Lektion `{id,name,content,grammar?,listen?,speak?}`.

**Chất lượng bar mỗi Unit (bắt buộc):**
- 5–7 Lektion; content HTML: `<h2>`, `.hint`, `<h3 class="sub">`, bảng/ul; ≥12 `.term` quan trọng / Lektion; đủ để flashcards tự sinh.
- ≥2 Lektion có `grammar` (rule + ≥3 examples + exercise MC hoặc fill); ≥2 Lektion có `listen` (2–3 item, ít nhất 1 `slow:true`); ≥1 Lektion có `speak` (2–3 item).
- Id: unit `u1`, `u2`; lektion `u1-l1`…`u1-l7`, `u2-l1`…; exercise `theme` = lektion id; id grammar `a1-artikel`…(mẫu `<level>-<tên>`).

- [ ] **Step 1: Tạo `faecher/deutsch/a1-data.js` — u1 + u2**

```js
/* Deutsch A1 · Units 1–2 (chuẩn form ont-thi-fach; đủ .term → flashcards tự sinh) */
window.DEUTSCH_A1 = {
  level: "a1",
  badge: "A1",
  code: "DE A1",
  title: "Deutsch A1",
  units: [
    {
      id: "u1",
      title: "Begrüßung & Vorstellung",
      desc: "Hallo · Namen · Länder und Sprachen · Zahlen 1–20",
      icon: "👋",
      lektionen: [
        {
          id: "u1-l1",
          name: "Hallo! Ich heiße…",
          content: `<h2>👋 Hallo! Ich heiße …</h2>
<div class="hint">Chào hỏi · giới thiệu tên · từ lịch sự Sie vs du</div>
<h3 class="sub">1. Chào hỏi</h3>
<ul>
  <li><span class="term" data-de="Guten Morgen" data-vi="chào buổi sáng (đến 10h)">Guten Morgen</span>!</li>
  <li><span class="term" data-de="Guten Tag" data-vi="chào buổi chiều/ngày (chính thức)">Guten Tag</span>!</li>
  <li><span class="term" data-de="Guten Abend" data-vi="chào buổi tối">Guten Abend</span>!</li>
  <li><span class="term" data-de="Hallo" data-vi="xin chào (thân mật)">Hallo</span>! · <span class="term" data-de="Tschüss" data-vi="tạm biệt (thân mật)">Tschüss</span>! · <span class="term" data-de="Auf Wiedersehen" data-vi="tạm biệt (chính thức)">Auf Wiedersehen</span>!</li>
</ul>
<h3 class="sub">2. Giới thiệu tên</h3>
<p>Ich <span class="term" data-de="heißen" data-vi="tên là">heiße</span> Anna. / <span class="term" data-de="mein Name" data-vi="tên của tôi">Mein Name</span> ist Anna.</p>
<p>Wie <span class="term" data-de="heißen" data-vi="tên là">heißen</span> Sie? (lịch sự) · Wie heißt du? (thân mật)</p>
<h3 class="sub">3. Sie oder du?</h3>
<table>
  <tr><th>Sie (lịch sự)</th><td>khách hàng, người lạ, cấp trên, người lớn tuổi</td></tr>
  <tr><th>du (thân mật)</th><td>bạn bè, đồng nghiệp thân, trẻ em</td></tr>
</table>
<div class="note">💡 Schnellmerk: <b>heißen</b> chia: ich heiße · du heißt · er/sie/es heißt · Sie heißen.</div>`,
          grammar: [
            {
              id: "a1-sein-heissen",
              title: "Động từ sein & heißen (hiện tại)",
              rule: "<p><b>sein</b>: ich bin · du bist · er/sie/es ist · wir sind · ihr seid · sie/Sie sind</p><p><b>heißen</b>: ich heiße · du heißt · er/sie/es heißt · wir heißen · ihr heißt · sie/Sie heißen</p>",
              examples: ["Ich bin Linh.", "Er heißt Paul.", "Wir sind aus Vietnam."],
              exercise: { type: "fill", theme: "u1-l1", cat: "sein/heißen", q: "Ich ___ Linh. (sein)", answers: ["bin"], answer: "bin", ex: "Ich bin → bin" }
            }
          ],
          listen: [
            { id: "u1-l1-l1", text: "Guten Tag! Ich heiße Anna. Wie heißen Sie?", tip: "Nghe chú ý ngữ điệu câu hỏi", slow: true },
            { id: "u1-l1-l2", text: "Hallo, ich bin Paul. Und du?" }
          ],
          speak: [
            { id: "u1-l1-s1", prompt: "Chào buổi sáng và giới thiệu tên bạn", model: "Guten Morgen! Ich heiße …", hint: "Gu·ten · Mor·gen · ich · hei·ße" }
          ]
        }
        /* …u1-l2..u1-l7 theo mẫu trên: name, content (≥12 .term), grammar/listen/speak đạt bar */
      ]
    }
    /* u2 = Zahlen 1–20 · Datum · Tage/Wochen · Uhrzeit — làm theo bar */
  ]
};
```

- [ ] **Step 2: Viết đủ u1-l2…u1-l7 + u2-l1…u2-l7**

Hoàn thiện `a1-data.js` đạt chất lượng bar (Step 1 mẫu). Nội dung chuẩn giáo trình A1: u1 = chào hỏi, tên, nguồn gốc, quốc tịch, số 1–20, số điện thoại; u2 = số 21–100, tuổi, ngày/tháng/năm, thứ trong tuần, giờ (Wie spät ist es? / um wie viel Uhr?). Mỗi Lektion ≥12 `.term` DE→VI đúng nghĩa, không bịa.

- [ ] **Step 3: Đăng ký script + verify**

index.html (nhóm faecher scripts, sau `gk-uebungen.js`):

```html
<script src="./faecher/deutsch/a1-data.js?v=1"></script>
```

`node --check faecher/deutsch/a1-data.js` → 0 lỗi.
Node smoke: `node -e "global.window={};eval(require('fs').readFileSync('faecher/deutsch/a1-data.js','utf8'));const u=window.DEUTSCH_A1;if(u.units.length<2)throw new Error('units');const n=u.units.reduce((a,x)=>a+x.lektionen.length,0);if(n<10)throw new Error('lektionen '+n);const terms=(u.units[0].lektionen[0].content.match(/class=\"term\"/g)||[]).length;if(terms<12)throw new Error('terms '+terms);console.log('a1 u1-u2 OK, lektionen='+n);"` → `a1 u1-u2 OK`.

`node test/verify-links.mjs` → PASS. Commit: `git add faecher/deutsch/a1-data.js index.html && git commit -m "feat: Deutsch A1 units 1-2 (vocab/grammar/listen/speak)"`

---

### Task 5: A1 data — Units 3–6

**Files:**
- Modify: `faecher/deutsch/a1-data.js` (thêm `u3`…`u6` vào mảng units)

**Nội dung:** u3 Familie & Freunde (đại từ sở hữu mein/dein, gia đình, nghề nghiệp) · u4 Essen & Trinken (món ăn, đồ uống, nhà hàng — Akkusativ), u5 Einkaufen (mua sắm, giá tiền, màu sắc), u6 Zeit & Tagesablauf (thời gian, lịch trình ngày, thì hiện tại chia động từ).

- [ ] **Step 1: Thêm u3–u6 đạt chất lượng bar (như Task 4)**

Id: `u3`, `u4`, `u5`, `u6`; lektion `u3-l1`…`u6-l7`. Grammar mới bắt buộc: u3 Possessivartikel (mein/dein), u4 Akkusativ (den/die/das + ein/eine), u5 Akkusativ mua sắm + Negation (kein/keine), u6 chia động từ hiện tại (arbeiten, essen, trinken). Ít nhất 1 Lektion/Unit có `speak`; mỗi Unit ≥2 Lektion có `listen`.

- [ ] **Step 2: Verify**

`node --check faecher/deutsch/a1-data.js` + smoke mở rộng (count lektionen ≥ 28, tổng `.term` ≥ 300):

```bash
node -e "
global.window={};eval(require('fs').readFileSync('faecher/deutsch/a1-data.js','utf8'));
const u=window.DEUTSCH_A1;
const n=u.units.reduce((a,x)=>a+x.lektionen.length,0);
const t=u.units.reduce((a,x)=>a+x.lektionen.reduce((b,l)=>b+((l.content.match(/class=\"term\"/g)||[]).length),0),0);
const g=u.units.reduce((a,x)=>a+x.lektionen.filter(l=>l.grammar&&l.grammar.length).length,0);
if(u.units.length<6||n<28||t<300||g<10) throw new Error('bars: units='+u.units.length+' lektionen='+n+' terms='+t+' grammar='+g);
console.log('a1 u1-u6 OK, lektionen='+n+', terms='+t);
"
```

Expected: `a1 u1-u6 OK`. + harness PASS. Commit: `git commit -am "feat: Deutsch A1 units 3-6"`

---

### Task 6: A1 data — Units 7–10

**Files:**
- Modify: `faecher/deutsch/a1-data.js` (thêm `u7`…`u10`)

**Nội dung:** u7 Arbeit & Beruf (nghề nghiệp, nơi làm việc — Modalverben können/müssen) · u8 Wohnen (nhà cửa, nội thất — Präpositionen in/auf/unter + Dativ/Akkusativ cơ bản) · u9 Gesundheit (cơ thể, đau ốm, hẹn bác sĩ) · u10 Reisen & Verkehr (đi lại, phương tiện, hỏi đường — Imperativ).

- [ ] **Step 1: Thêm u7–u10 đạt chất lượng bar**

Id: `u7`…`u10`; lektion `u7-l1`…`u10-l7`. Grammar: u7 Modalverben, u8 Präpositionen + Dativ, u9 Imperativ với bác sĩ + Körperteile, u10 Imperativ + Wechselpräpositionen cơ bản. Bar như Task 4.

- [ ] **Step 2: Verify**

Smoke cập nhật (units=10, lektionen ≥ 50, terms ≥ 600, grammar ≥ 18):

```bash
node -e "
global.window={};eval(require('fs').readFileSync('faecher/deutsch/a1-data.js','utf8'));
const u=window.DEUTSCH_A1;
const n=u.units.reduce((a,x)=>a+x.lektionen.length,0);
const t=u.units.reduce((a,x)=>a+x.lektionen.reduce((b,l)=>b+((l.content.match(/class=\"term\"/g)||[]).length),0),0);
const s=u.units.reduce((a,x)=>a+x.lektionen.filter(l=>l.speak&&l.speak.length).length,0);
if(u.units.length<10||n<50||t<600||s<8) throw new Error('bars');
console.log('a1 full OK, lektionen='+n+', terms='+t);
"
```

Expected: `a1 full OK`. + harness PASS. Commit: `git commit -am "feat: Deutsch A1 units 7-10"`

---

### Task 7: Berufsdeutsch data + quiz cấp độ A1

**Files:**
- Create: `faecher/deutsch/beruf-data.js` (`window.DEUTSCH_BERUF`)
- Create: `faecher/deutsch/a1-quiz.js` (`window.DEUTSCH_A1_QUIZ`)
- Modify: `index.html` (2 script tags)

**Interfaces:**
- Produces: `window.DEUTSCH_BERUF = { level:'beruf', badge:'Beruf', code:'DE Beruf', title:'Berufsdeutsch Gastgewerbe', units:[…] }`; `window.DEUTSCH_A1_QUIZ` (60 câu, schema quiz cũ: MC `{theme,cat,q,opts,a,ex}` + fill `{type:'fill',theme,cat,q,answers,answer,ex}`; `theme` = lektion id có thật trong a1-data.js).

- [ ] **Step 1: `beruf-data.js` — 3 Units**

u-b1 Bestellung aufnehmen (nhận order: "Was darf es sein?", món, số lượng, allergy) · u-b2 Speisekarte erklären (giải thích menu, nguyên liệu, cách chế biến) · u-b3 Reklamation & Bezahlen (xử lý phàn nàn, tính tiền, chia hóa đơn). Mỗi Unit 4–6 Lektion, bar như Task 4, vocab chuyên ngành: `Bestellung`, `Vorspeise`, `Hauptgericht`, `Nachspeise`, `Getränk`, `die Rechnung`, `getrennt`, `die Quittung`…

```js
window.DEUTSCH_BERUF = {
  level: "beruf",
  badge: "Beruf",
  code: "DE Beruf",
  title: "Berufsdeutsch Gastgewerbe",
  units: [
    {
      id: "u-b1",
      title: "Bestellung aufnehmen",
      desc: "Begrüßung · Fragen · Mengen · Allergien",
      icon: "🛎️",
      lektionen: [ /* 4-6 lektion theo bar */ ]
    }
    /* u-b2 Speisekarte erklären, u-b3 Reklamation & Bezahlen */
  ]
};
```

- [ ] **Step 2: `a1-quiz.js` — 60 câu**

Phân bổ (cố định): 40 MC + 20 fill. 10 units × 4 câu (2 MC + 2 fill) + 20 câu ngữ pháp (MC 10 + fill 10) phân theo grammar block. `theme` trỏ đúng lektion id; `cat` = tên lektion. Mỗi fill `answers` ≥ 2 biến thể (thường/hoa, umlaut thường, dấu cách) và `answer` đúng chính tả hiển thị. Nội dung câu bám đúng `.term`/grammar đã viết ở Task 4–6 (không bịa từ ngoài bài).

- [ ] **Step 3: Đăng ký + verify**

index.html (sau a1-data.js):

```html
<script src="./faecher/deutsch/a1-quiz.js?v=1"></script>
<script src="./faecher/deutsch/beruf-data.js?v=1"></script>
```

`node --check` 2 file → 0 lỗi.
Smoke quiz — mọi `theme` phải tồn tại trong lektion:

```bash
node -e "
global.window={};eval(require('fs').readFileSync('faecher/deutsch/a1-data.js','utf8'));eval(require('fs').readFileSync('faecher/deutsch/a1-quiz.js','utf8'));
const ids=new Set();window.DEUTSCH_A1.units.forEach(u=>u.lektionen.forEach(l=>ids.add(l.id)));
const q=window.DEUTSCH_A1_QUIZ;
const bad=q.filter(x=>!ids.has(x.theme));
const fill=q.filter(x=>x.type==='fill');
if(q.length<60) throw new Error('count '+q.length);
if(bad.length) throw new Error('bad theme: '+bad[0].theme);
if(fill.length<20) throw new Error('fill '+fill.length);
if(fill.some(f=>!Array.isArray(f.answers)||f.answers.length<1||!f.answer)) throw new Error('fill schema');
console.log('quiz OK, total='+q.length+', fill='+fill.length);
"
```

Expected: `quiz OK, total=60, fill=20`. + harness PASS.
Commit: `git add faecher/deutsch/beruf-data.js faecher/deutsch/a1-quiz.js index.html && git commit -m "feat: A1 level quiz (60) + Berufsdeutsch units"`

---

### Task 8: Unlock hook + wissen.js AI context

**Files:**
- Modify: `index.html` (`fachQuizResult` ~3062)
- Modify: `js/wissen.js` (sau block GK_GLE_GROUPS ~154-165)

**Interfaces:**
- Consumes: `DeutschTrack.markPassed(fachId)`, `DeutschTrack.isPassedCached(fachId)`, `addChunk(title, cat, text)` (internal wissen.js).

- [ ] **Step 1: Unlock trong `fachQuizResult`**

Trong `fachQuizResult()` (index.html:3062), tìm nơi tính `pct` cuối cùng trước khi render; thêm:

```js
  if (typeof fachId !== 'undefined' && fachId && String(fachId).startsWith('deutsch-') && pct >= 80 && window.DeutschTrack) {
    window.DeutschTrack.markPassed(fachId);
    setTimeout(function () { try { toast('🎉 ' + (window.FachForm && window.FachForm.findFach(fachId) ? window.FachForm.findFach(fachId).name : fachId) + ': đạt ≥80% — đã mở khóa!', 'ok'); } catch (_) {} }, 400);
  }
```

(Đảm bảo biến `pct` và `fachId` đúng tên trong hàm — đọc kỹ hàm trước khi chèn; nếu tên khác, dùng tên thực tế.)

- [ ] **Step 2: `wissen.js` — chunk Deutsch cho AI**

Sau block GK_GLE_GROUPS (js/wissen.js ~165), thêm:

```js
      /* 4b) Deutsch-Track (A1 + Beruf) */
      if (w.DEUTSCH_A1) addDeutschLevel(w.DEUTSCH_A1);
      if (w.DEUTSCH_BERUF) addDeutschLevel(w.DEUTSCH_BERUF);
      function addDeutschLevel(levelData) {
        (levelData.units || []).forEach(function (un) {
          (un.lektionen || []).forEach(function (l) {
            var title = 'Deutsch ' + (levelData.badge || '') + ' · ' + (l.name || l.id);
            var text = (l.content || '').replace(/<[^>]*>/g, ' ');
            if (text) addChunk(title, title, text);
            (l.grammar || []).forEach(function (g) {
              if (g.title && g.rule) addChunk(title + ' · Grammatik', title, g.title + ': ' + g.rule.replace(/<[^>]*>/g, ' '));
            });
          });
        });
      }
```

(Nếu `addDeutschLevel` đặt ở vị trí mà hoisting không lên do IIFE — khai báo trước block hoặc dùng `function` declaration như viết — OK.)

- [ ] **Step 3: Verify + commit**

`node --check js/wissen.js` → 0 lỗi. `node test/verify-links.mjs` → PASS.
Manual: làm quiz `#/deutsch/a1/quiz` (chưa đủ câu? có 60) đạt ≥80% → toast mở khóa; mở hub thấy "✅ hoàn thành". Chat: hỏi "Giải thích Akkusativ trong Deutsch A1" → AI trả lời có nội dung từ lektion.
Commit: `git add index.html js/wissen.js && git commit -m "feat: A1 unlock at 80% + Deutsch AI context chunks"`

---

### Task 9: Wiring cuối — sw.js PRECACHE + CACHE v107 + verify tổng

**Files:**
- Modify: `sw.js` (PRECACHE + `azubihub-v106` → `azubihub-v107`)
- Modify: `index.html` (bump `?v=` cho các file đã sửa: `js/faecher.js`, `js/vocab.js`, `js/wissen.js` + `js/deutsch-track.js`/`a1-data.js`/`a1-quiz.js`/`beruf-data.js` nếu chưa)

- [ ] **Step 1: PRECACHE + CACHE bump**

sw.js: thêm vào mảng `PRECACHE`:

```js
  './faecher/deutsch/a1-data.js',
  './faecher/deutsch/a1-quiz.js',
  './faecher/deutsch/beruf-data.js',
  './js/deutsch-track.js',
```

Đổi `const CACHE = 'azubihub-v106'` → `const CACHE = 'azubihub-v107';`

- [ ] **Step 2: Bump ?v=**

index.html: các script đã sửa trong branch này bump `?v=N` (+1 so với hiện tại).

- [ ] **Step 3: Verify toàn bộ**

```bash
node --check js/deutsch-track.js && node --check js/vocab.js && node --check js/wissen.js && node --check js/faecher.js && node --check faecher/deutsch/a1-data.js && node --check faecher/deutsch/a1-quiz.js && node --check faecher/deutsch/beruf-data.js && node --check sw.js
node test/verify-links.mjs   # → PASS: mọi tham chiếu local đều tồn tại
```

HTTP: `python3 -m http.server 8123 &` → curl 200 cho: index.html, sw.js, js/deutsch-track.js, faecher/deutsch/a1-data.js, faecher/deutsch/a1-quiz.js, faecher/deutsch/beruf-data.js; kill server.

Manual end-to-end: đăng nhập → TrackGate → Deutsch → hub A1+Beruf → vào 1 Lektion: content hiển thị, flashcards lật được, grammar + bài tập chấm đúng/sai, 🔊 phát âm, 🎤 nhận dạng → quiz A1 chấm ≥80% → unlock → offline refresh vẫn chạy (precache đủ).

- [ ] **Step 4: Commit**

`git add sw.js index.html && git commit -m "chore: precache Deutsch track + cache azubihub-v107"`

---

## Self-Review (đã chạy khi viết plan)

- **Spec coverage:** §3 TrackGate → Task 2 ✓ · §4 routing → Task 2 ✓ · §5 vocab/flashcards → Task 3+4 ✓ · grammar → Task 3+4–6 ✓ · quiz/unlock → Task 7+8 ✓ · nghe/nói → Task 3+4 ✓ · AI → Task 8 ✓ · tiến độ → Task 1+8 (markThemeProgress) ✓ · §6 data model → Task 4–7 ✓ · §7 Phase 0+1 → Task 1–9 ✓ · §8 testing → Step verify mỗi task + Task 9 ✓.
- **Placeholder scan:** không TBD; nội dung Lektion do implementer viết theo bar + mẫu u1-l1 (Task 4 Step 1) + nguồn chuẩn A1 — đã định nghĩa rõ chất lượng bar.
- **Type consistency:** `DeutschTrack.*` nhất quán (levels/levelFachId/buildFach/ensureFächer/speak/record/renderExtras/renderExercise/markPassed/isPassedCached); `window.DEUTSCH_A1/DEUTSCH_BERUF/DEUTSCH_A1_QUIZ` khớp data-model.md; fach id `deutsch-a1`/`deutsch-beruf` xuyên suốt.
