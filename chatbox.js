/* ============================================================
 * Chatbox lơ lửng – floating chat widget for Lern-App
 * - Realtime chat rooms (Supabase config polling, ~1s)
 * - Voice messages (MediaRecorder ≤ 60s, base64 in DB)
 * - Private AI thread via opencode serve HTTP API (cmd: /ai)
 * - SF-Symbol-style icons (iOS look)
 * ============================================================ */
(function () {
  'use strict';

  var AI_BASE_KEY = 'chat_ai_base';
  var AI_DEFAULT_BASE = 'http://127.0.0.1:4096';
  var AI_SESSION_KEY = 'chat_ai_session';
  var AI_HIST_KEY = 'chat_ai_history';
  var POS_X_KEY = 'chat_x';
  var POS_Y_KEY = 'chat_y';
  var UNREAD_KEY = 'chat_unread';
  var VOICE_MAX_MS = 60000;
  var VOICE_MAX_BYTES = 1500000;
  var AI_SYSTEM =
    'Bạn là trợ lý học tập (Lernassistent) của app ôn thi nghề Fachkraft für Gastronomie (Việt – Đức). ' +
    'Trả lời bằng tiếng Việt, giữ thuật ngữ chuyên ngành tiếng Đức (kèm nghĩa VI). ' +
    'Khi có mục "TÀI LIỆU ÔN THI" bên dưới: câu hỏi thuộc nội dung đó thì trả lời DỰA TRÊN tài liệu đó trước, ' +
    'không bịa thông tin. Nếu tài liệu không có, trả lời kiến thức chung ngắn gọn và ghi rõ là ngoài tài liệu.';

  var player = '';
  var rooms = [];
  var activeRoom = null; // slug or 'ai'
  var subscribedSlug = null; // room currently polled in background
  var panelOpen = false;
  var msgs = [];
  var unread = {};
  var unsubRoom = null;
  var presenceTimer = null;
  var rootEl = null;
  var mediaRec = null;
  var recStream = null;
  var recChunks = [];
  var recStart = 0;
  var recTimer = null;
  var recording = false;
  var aiBusy = false;
  var drag = { on: false, sx: 0, sy: 0, moved: false, orig: null };

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fmtTime(iso) {
    try {
      var d = new Date(iso);
      return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    } catch (_) { return ''; }
  }
  function fmtDur(s) {
    s = Math.max(0, Math.round(Number(s) || 0));
    if (s >= 60) return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    return '0:' + String(s).padStart(2, '0');
  }
  function hashColor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    var palette = ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5AC8FA', '#FFCC00', '#8E8E93'];
    return palette[h % palette.length];
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (_) {} }

  /* ---------- SF-style icons ---------- */
  function icon(name, size) {
    var svg = ICONS[name] || ICONS.bubble;
    return '<svg class="cbx-icon" viewBox="0 0 24 24" width="' + (size || 20) +
      '" height="' + (size || 20) + '" aria-hidden="true">' + svg + '</svg>';
  }
  var ICONS = {
    bubble: '<path d="M12 3C6.5 3 2 6.9 2 11.7c0 2.7 1.4 5.1 3.6 6.7L4.5 21l3.9-1.7c1.2.4 2.4.6 3.6.6 5.5 0 10-3.9 10-8.7S17.5 3 12 3z"/>',
    mic: '<path d="M12 15a3.5 3.5 0 0 0 3.5-3.5v-6a3.5 3.5 0 1 0-7 0v6A3.5 3.5 0 0 0 12 15z"/><path d="M5 11.5a7 7 0 0 0 14 0M12 18.5V22M8.5 22h7"/>',
    send: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15.5l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1z"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    list: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    wave: '<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
    play: '<path d="M8 5v14l11-7L8 5z"/>',
    stop: '<path d="M7 7h10v10H7z"/>',
    trash: '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13"/>',
    gear: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  };

  /* ---------- Toast ---------- */
  var toastHost = null;
  function cbxToast(msg, type) {
    if (!toastHost) {
      toastHost = el('div', 'cbx-toast-host');
      document.body.appendChild(toastHost);
    }
    var t = el('div', 'cbx-toast cbx-toast-' + (type || 'info'), esc(msg));
    toastHost.appendChild(t);
    setTimeout(function () {
      t.classList.add('cbx-out');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 300);
    }, 3200);
  }

  /* ---------- Unread ---------- */
  function loadUnread() {
    try { unread = JSON.parse(localStorage.getItem(UNREAD_KEY + ':' + player) || '{}') || {}; }
    catch (_) { unread = {}; }
  }
  function saveUnread() {
    try { localStorage.setItem(UNREAD_KEY + ':' + player, JSON.stringify(unread)); } catch (_) {}
  }
  function unreadTotal() {
    var n = 0;
    for (var k in unread) if (unread[k] > 0) n += unread[k];
    return n;
  }

  /* ---------- AI helpers ---------- */
  function aiBase() {
    var v = lsGet(AI_BASE_KEY);
    return (v && v.trim()) || AI_DEFAULT_BASE;
  }
  function aiHistory() {
    try { return JSON.parse(lsGet(AI_HIST_KEY) || '[]') || []; } catch (_) { return []; }
  }
  function saveAiHistory(h) {
    lsSet(AI_HIST_KEY, JSON.stringify(h.slice(-40)));
  }
  async function aiAsk(text, onDelta) {
    var base = aiBase();
    var sid = lsGet(AI_SESSION_KEY);
    if (!sid) {
      var cr = await fetch(base + '/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Lern-Chat' }),
      });
      if (!cr.ok) throw new Error('AI server: ' + cr.status);
      var cj = await cr.json();
      sid = cj && cj.id;
      if (!sid) throw new Error('AI server không trả session');
      lsSet(AI_SESSION_KEY, sid);
    }
    var system = AI_SYSTEM;
    var context = null;
    if (window.Wissen) {
      context = window.Wissen.searchContext(text, 4);
      if (context && context.length) system += '\n\n=== TÀI LIỆU ÔN THI (nguồn nội bộ app — hãy ưu tiên) ===\n' + context.join('\n\n');
    }
    var hist = aiHistory();
    var parts = hist.map(function (m) { return { type: 'text', text: m.text }; });
    parts.push({ type: 'text', text: text });
    var res = await fetch(base + '/session/' + encodeURIComponent(sid) + '/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: system, parts: parts }),
    });
    if (!res.ok) {
      if (res.status === 404) lsDel(AI_SESSION_KEY);
      throw new Error('AI server: ' + res.status);
    }
    var j = await res.json();
    var reply = '';
    var arr = (j && j.parts) || [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i].type === 'text') reply += arr[i].text;
    }
    return reply || '(AI không trả lời)';
  }

  /* ---------- Rendering: room list ---------- */
  function renderRoomList() {
    var list = $('cbxRoomList');
    if (!list) return;
    list.innerHTML = '';
    list.appendChild(el('div', 'cbx-section-label', 'TRÒ CHUYỆN'));
    var aiItem = el('div', 'cbx-room-item' + (activeRoom === 'ai' ? ' cbx-active' : ''), '');
    aiItem.innerHTML =
      '<span class="cbx-avatar cbx-avatar-ai">' + icon('sparkle', 18) + '</span>' +
      '<span class="cbx-room-name">AI · opencode</span>' +
      '<span class="cbx-room-meta">hỏi bằng /ai</span>';
    aiItem.addEventListener('click', function () { openAIThread(); });
    list.appendChild(aiItem);

    rooms.forEach(function (r) {
      var online = countOnline(r);
      var un = unread[r.slug] || 0;
      var item = el('div', 'cbx-room-item' + (activeRoom === r.slug ? ' cbx-active' : ''), '');
      item.innerHTML =
        '<span class="cbx-avatar" style="background:' + hashColor(r.slug) + '">' + esc((r.icon || '💬').slice(0, 2)) + '</span>' +
        '<span class="cbx-room-name">' + esc(r.name) + '</span>' +
        '<span class="cbx-room-meta">' + (online ? online + ' online' : '—') + '</span>' +
        (un > 0 ? '<span class="cbx-badge-sm">' + (un > 99 ? '99+' : un) + '</span>' : '');
      (function (slug) {
        item.addEventListener('click', function () { openRoom(slug); });
      })(r.slug);
      list.appendChild(item);
    });

    var add = el('div', 'cbx-room-add', '+' + esc(' Tạo phòng mới'));
    add.addEventListener('click', onCreateRoom);
    list.appendChild(add);
    list.appendChild(el('div', 'cbx-hint', 'Gõ <b>/ai</b> trước tin nhắn để hỏi AI (cần chạy opencode serve)'));
  }

  function countOnline(r) {
    var n = 0;
    var now = Date.now();
    if (!r || !r.members) return 0;
    for (var k in r.members) {
      if (k === player) continue;
      var ts = Date.parse(r.members[k].last_seen);
      if (!isNaN(ts) && now - ts < 90000) n++;
    }
    return n;
  }

  /* ---------- Rendering: messages ---------- */
  function renderMessages(scrollToBottom) {
    var box = $('cbxMsgs');
    if (!box) return;
    box.innerHTML = '';
    var lastSender = '';
    for (var i = 0; i < msgs.length; i++) {
      var m = msgs[i];
      var own = m.sender === player;
      var row = el('div', 'cbx-msg' + (own ? ' cbx-own' : ''), '');
      var isAI = m.sender === 'AI' || m.sender === 'ai';
      var showHead = !own && m.sender !== lastSender;
      var avatar = own
        ? ''
        : '<span class="cbx-avatar cbx-avatar-sm" style="background:' + (isAI ? '#AF52DE' : hashColor(m.sender)) + '">' +
          esc((m.sender || '?').slice(0, 1).toUpperCase()) + '</span>';
      var body =
        (showHead && !own
          ? '<div class="cbx-msg-sender">' + esc(isAI ? 'AI' : m.sender) + '</div>'
          : '') +
        '<div class="cbx-msg-bubble">' + bubbleContent(m) + '</div>' +
        '<div class="cbx-msg-time">' + fmtTime(m.at) + '</div>';
      row.innerHTML = avatar + '<div class="cbx-msg-main">' + body + '</div>';
      box.appendChild(row);
      lastSender = m.sender;
    }
    if (scrollToBottom !== false) box.scrollTop = box.scrollHeight;
  }

  function bubbleContent(m) {
    if (m.kind === 'voice') {
      var dur = fmtDur(m.audioDur);
      return '<button class="cbx-voice" data-id="' + esc(m.id) + '">' +
        icon('play', 14) + '<span class="cbx-voice-bar">' + waveBars() + '</span>' +
        '<span class="cbx-voice-dur">' + dur + '</span></button>';
    }
    if (m.kind === 'system') {
      return '<span class="cbx-sys">' + esc(m.text || '') + '</span>';
    }
    return '<span class="cbx-text">' + esc(m.text || '') + '</span>';
  }

  function waveBars() {
    var s = '';
    for (var i = 0; i < 12; i++) {
      var h = 4 + Math.round(Math.abs(Math.sin(i * 1.7)) * 10);
      s += '<i style="height:' + h + 'px"></i>';
    }
    return s;
  }

  function playVoice(id) {
    var m = null;
    for (var i = 0; i < msgs.length; i++) if (msgs[i].id === id) { m = msgs[i]; break; }
    if (!m || !m.audio) return;
    var btn = rootEl.querySelector('.cbx-voice[data-id="' + id + '"]');
    var audio = new Audio(m.audio);
    var playing = false;
    if (btn) btn.classList.add('cbx-playing');
    audio.onended = function () {
      if (btn) btn.classList.remove('cbx-playing');
      playing = false;
    };
    audio.play().catch(function () {
      if (btn) btn.classList.remove('cbx-playing');
      cbxToast('Không thể phát voice', 'warn');
    });
    var un = function () { try { audio.pause(); } catch (_) {} };
    setTimeout(un, (Number(m.audioDur) || 5) * 1000 + 1500);
  }

  /* ---------- Views ---------- */
  function showRoomList() {
    activeRoom = null;
    // keep polling the previously active room in background so unread keeps counting
    $('cbxThread').style.display = 'none';
    $('cbxAiStatus').style.display = 'none';
    $('cbxRoomList').style.display = '';
    $('cbxBackBtn').style.display = 'none';
    $('cbxAiBtn').style.display = '';
    $('cbxAiReset').style.display = 'none';
    $('cbxAiGear').style.display = 'none';
    $('cbxTitle').textContent = 'Chat';
    renderRoomList();
  }

  function openRoom(slug) {
    activeRoom = slug;
    unread[slug] = 0;
    saveUnread();
    msgs = [];
    $('cbxRoomList').style.display = 'none';
    $('cbxThread').style.display = '';
    $('cbxBackBtn').style.display = '';
    $('cbxAiBtn').style.display = '';
    $('cbxAiReset').style.display = 'none';
    $('cbxAiGear').style.display = 'none';
    $('cbxTitle').textContent = (roomName(slug) || slug);
    renderMessages(false);
    if (unsubRoom) { unsubRoom(); }
    unsubRoom = LearnDB.subscribeChatRoom(slug, onRoomMessages, 1000);
    subscribedSlug = slug;
    updateBadge();
    LearnDB.chatTouchPresence(slug, player).catch(function () {});
    if (!presenceTimer) {
      presenceTimer = setInterval(function () {
        if (subscribedSlug) {
          LearnDB.chatTouchPresence(subscribedSlug, player).catch(function () {});
        }
      }, 60000);
    }
  }

  function onRoomMessages(newMsgs, isFirst) {
    for (var i = 0; i < newMsgs.length; i++) {
      var m = newMsgs[i];
      msgs.push(m);
      if (!isFirst && m.sender !== player) {
        // count as unread unless the panel is open on this exact room
        if (!panelOpen || activeRoom !== m.room) {
          unread[m.room] = (unread[m.room] || 0) + 1;
        }
      }
    }
    if (msgs.length > 300) msgs = msgs.slice(-300);
    saveUnread();
    updateBadge();
    if (panelOpen && activeRoom && activeRoom !== 'ai' && activeRoom === subscribedSlug) {
      renderMessages();
    }
  }

  /* ---------- AI thread ---------- */
  function openAIThread() {
    activeRoom = 'ai';
    if (unsubRoom) { unsubRoom(); unsubRoom = null; }
    subscribedSlug = null;
    if (presenceTimer) { clearInterval(presenceTimer); presenceTimer = null; }
    $('cbxRoomList').style.display = 'none';
    $('cbxThread').style.display = '';
    $('cbxBackBtn').style.display = '';
    $('cbxAiBtn').style.display = 'none';
    $('cbxAiReset').style.display = '';
    $('cbxAiGear').style.display = '';
    $('cbxTitle').textContent = 'AI · opencode';
    renderAiMessages();
    aiHealthRender();
  }

  function renderAiMessages() {
    var hist = aiHistory();
    var arr = [];
    for (var i = 0; i < hist.length; i++) {
      var h = hist[i];
      var fake = {
        id: 'ai-' + i,
        sender: h.role === 'assistant' ? 'AI' : player,
        kind: 'text',
        text: h.text,
        at: new Date().toISOString(),
      };
      if (fake.sender === player) fake.sender = player;
      arr.push(fake);
    }
    if (aiBusy) {
      arr.push({
        id: 'ai-typing',
        sender: 'AI',
        kind: 'system',
        text: 'AI đang trả lời…',
        at: new Date().toISOString(),
      });
    }
    msgs = arr;
    renderMessages();
  }

  function sendToAI(raw) {
    var text = String(raw || '').trim();
    if (!text || aiBusy) return;
    var hist = aiHistory();
    hist.push({ role: 'user', text: text });
    saveAiHistory(hist);
    renderAiMessages();
    aiBusy = true;
    renderAiMessages();
    aiAsk(text, null)
      .then(function (reply) {
        aiBusy = false;
        var h = aiHistory();
        h.push({ role: 'assistant', text: reply });
        saveAiHistory(h);
        renderAiMessages();
      })
      .catch(function (err) {
        aiBusy = false;
        var raw = (err && err.message) || 'Lỗi AI';
        var msg = raw;
        if (/failed to fetch|networkerror|ERR_|connection/i.test(raw)) {
          msg = '⚠️ Không kết nối được AI server (' + aiBase() + ').\n' +
            '→ Chạy: ' + aiStartCmd() + '\n' +
            (detectOrigin() ? '→ Origin đang mở: ' + detectOrigin() + ' (phải khớp --cors của server)' : '→ App đang mở bằng file:// — hãy mở qua http://localhost');
        } else {
          msg = '⚠️ ' + raw;
        }
        var h = aiHistory();
        h.push({ role: 'assistant', text: msg });
        saveAiHistory(h);
        renderAiMessages();
        aiHealthRender();
        cbxToast('Không kết nối được AI server', 'warn');
      });
  }

  function resetAI() {
    lsDel(AI_SESSION_KEY);
    lsDel(AI_HIST_KEY);
    msgs = [];
    renderAiMessages();
    cbxToast('Đã xoá hội thoại AI', 'ok');
  }

  /* ---------- AI server diagnostics ---------- */
  function detectOrigin() {
    try {
      var o = window.location.origin;
      if (o && o !== 'null' && String(o).toLowerCase().indexOf('file:') !== 0) return o;
    } catch (_) {}
    return null; // đang mở bằng file:// hoặc origin 'null'
  }

  function aiStartCmd() {
    var o = detectOrigin();
    if (o) return 'bash start-ai-server.command "' + o + '"';
    return 'Bật server local: python3 -m http.server 8080 → mở http://localhost:8080, ' +
      'rồi chạy: bash start-ai-server.command "http://localhost:8080"';
  }

  function aiHealth() {
    var base = aiBase();
    return new Promise(function (resolve) {
      var done = false;
      var timer = null;
      var ctrl = null;
      try { ctrl = new AbortController(); } catch (_) {}
      function finish(ok, extra) {
        if (done) return;
        done = true;
        if (timer) clearTimeout(timer);
        try { if (ctrl) ctrl.abort(); } catch (_) {}
        resolve({ ok: ok, base: base, extra: extra || '', cmd: aiStartCmd() });
      }
      timer = setTimeout(function () { finish(false, 'timeout'); }, 3500);
      try {
        fetch(base + '/global/health', { signal: ctrl ? ctrl.signal : undefined })
          .then(function (r) { finish(!!(r && r.ok)); })
          .catch(function (e) { finish(false, (e && e.message) || 'err'); });
      } catch (_) { finish(false, ''); }
    });
  }

  function aiHealthRender() {
    var el = $('cbxAiStatus');
    if (!el) return;
    if (activeRoom !== 'ai') { el.style.display = 'none'; return; }
    el.style.display = '';
    el.innerHTML = '<span class="cbx-ai-check">Đang kiểm tra AI…</span>';
    aiHealth().then(function (h) {
      if (activeRoom !== 'ai' || !el) return;
      if (h.ok) {
        el.innerHTML = '<span class="cbx-ai-ok">● AI sẵn sàng</span><code>' + esc(h.base) + '</code>';
      } else {
        var originTxt = detectOrigin() || 'file://';
        el.innerHTML =
          '<span class="cbx-ai-err">⚠️ Không kết nối được ' + esc(h.base) + '</span>' +
          '<div class="cbx-ai-help">' +
          '<b>Cách khắc phục:</b><br>' +
          '1. Sửa <button class="cbx-ai-gear" id="cbxAiGearHint">base URL</button> / kiểm tra server đang chạy:<br>' +
          '<code>' + esc(h.cmd) + '</code><br>' +
          '2. Lần đầu: chạy <code>opencode /connect</code> để chọn model.<br>' +
          '3. App đang mở từ <code>' + esc(originTxt) + '</code> — ' +
          (detectOrigin()
            ? 'server phải khởi động với <code>--cors ' + esc(originTxt) + '</code> (script kia tự làm).'
            : 'phải mở app qua <b>http://localhost</b> (không phải file://) thì CORS mới cho phép.') +
          '</div>' +
          '<button id="cbxAiRetry" class="cbx-ai-retry">↻ Kiểm tra lại</button>';
        var r = $('cbxAiRetry');
        if (r) r.addEventListener('click', aiHealthRender);
        var g = $('cbxAiGearHint');
        if (g) g.addEventListener('click', aiSetBase);
      }
    });
  }

  function aiSetBase() {
    var cur = aiBase();
    var v = window.prompt('AI server (base URL) — ví dụ: http://127.0.0.1:4096', cur);
    if (v == null) return;
    v = String(v || '').trim().replace(/\/+$/, '');
    if (!/^https?:\/\//.test(v)) {
      cbxToast('Base URL phải bắt đầu bằng http(s)://', 'warn');
      return;
    }
    lsSet(AI_BASE_KEY, v);
    aiHealthRender();
    cbxToast('Đã lưu AI base: ' + v, 'ok');
  }

  /* ---------- Composer ---------- */
  function sendCurrent() {
    var input = $('cbxInput');
    var val = input.value.trim();
    if (!val) return;
    input.value = '';
    autoGrow();
    var aiMatch = /^\/ai\b[\s\S]*$/.exec(val);
    if (activeRoom === 'ai') {
      sendToAI(val);
      return;
    }
    if (aiMatch) {
      openAIThread();
      setTimeout(function () { sendToAI(val.replace(/^\/ai\s*/, '')); }, 50);
      return;
    }
    if (!activeRoom) {
      cbxToast('Hãy chọn một phòng trước', 'warn');
      return;
    }
    var slug = activeRoom;
    var sender = player;
    LearnDB.chatSendMessage(slug, sender, { kind: 'text', text: val })
      .then(function (m) {
        msgs.push(m);
        if (msgs.length > 300) msgs = msgs.slice(-300);
        renderMessages();
        LearnDB.chatTouchPresence(slug, sender).catch(function () {});
      })
      .catch(function (err) {
        cbxToast(err && err.message ? err.message : 'Gửi thất bại', 'warn');
      });
  }

  /* ---------- Voice ---------- */
  function pickMime() {
    if (window.MediaRecorder) {
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) return 'audio/webm;codecs=opus';
      if (MediaRecorder.isTypeSupported('audio/mp4')) return 'audio/mp4';
    }
    return '';
  }
  function startRec() {
    if (recording) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      cbxToast('Trình duyệt không hỗ trợ ghi âm', 'warn');
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        recording = true;
        recStream = stream;
        recChunks = [];
        var mime = pickMime();
        mediaRec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
        mediaRec.ondataavailable = function (e) { if (e.data && e.data.size) recChunks.push(e.data); };
        mediaRec.onstop = buildVoice;
        mediaRec.start();
        recStart = Date.now();
        var mic = $('cbxMic');
        if (mic) mic.classList.add('cbx-rec');
        $('cbxRecLabel').style.display = '';
        recTimer = setInterval(function () {
          var s = Math.round((Date.now() - recStart) / 1000);
          $('cbxRecLabel').textContent = '● ' + fmtDur(s) + ' (tối đa 1:00)';
          if (Date.now() - recStart >= VOICE_MAX_MS) stopRec();
        }, 250);
      })
      .catch(function () {
        cbxToast('Không truy cập được micro', 'warn');
      });
  }
  function stopRec() {
    if (!recording) return;
    recording = false;
    if (recTimer) { clearInterval(recTimer); recTimer = null; }
    try {
      if (mediaRec && mediaRec.state !== 'inactive') mediaRec.stop();
    } catch (_) {}
    var mic = $('cbxMic');
    if (mic) mic.classList.remove('cbx-rec');
    $('cbxRecLabel').style.display = 'none';
  }
  function buildVoice() {
    if (recStream) {
      recStream.getTracks().forEach(function (t) { try { t.stop(); } catch (_) {} });
      recStream = null;
    }
    if (!recChunks.length) return;
    var dur = (Date.now() - recStart) / 1000;
    var blob = new Blob(recChunks, { type: mediaRec ? mediaRec.mimeType : 'audio/webm' });
    if (blob.size > VOICE_MAX_BYTES) {
      cbxToast('Voice quá lớn (' + Math.round(blob.size / 1024) + 'KB) — tối đa ~1.5MB', 'warn');
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      if (!activeRoom || activeRoom === 'ai') {
        cbxToast('Chọn phòng trước khi gửi voice', 'warn');
        return;
      }
      var slug = activeRoom;
      LearnDB.chatSendMessage(slug, player, {
        kind: 'voice',
        audio: reader.result,
        audioDur: Math.round(dur),
      }).then(function (m) {
        msgs.push(m);
        if (msgs.length > 300) msgs = msgs.slice(-300);
        renderMessages();
        LearnDB.chatTouchPresence(slug, player).catch(function () {});
      }).catch(function (err) {
        cbxToast(err && err.message ? err.message : 'Gửi voice thất bại', 'warn');
      });
    };
    reader.readAsDataURL(blob);
  }

  /* ---------- Rooms mgmt ---------- */
  function onCreateRoom() {
    var name = window.prompt('Tên phòng mới:');
    if (!name || !name.trim()) return;
    LearnDB.chatCreateRoom(name, player)
      .then(function (r) {
        refreshRooms().then(function () {
          openRoom(r.slug);
        });
      })
      .catch(function (err) {
        cbxToast(err && err.message ? err.message : 'Tạo phòng thất bại', 'warn');
      });
  }
  function refreshRooms() {
    return LearnDB.chatListRooms().then(function (list) {
      rooms = list;
      if (document.visibilityState === 'visible' && $('cbxRoomList').style.display !== 'none') {
        renderRoomList();
      }
      return rooms;
    }).catch(function () { rooms = []; return rooms; });
  }
  function roomName(slug) {
    for (var i = 0; i < rooms.length; i++) if (rooms[i].slug === slug) return rooms[i].name;
    return null;
  }

  /* ---------- Drag (bubble) ---------- */
  function initDrag() {
    var b = $('cbxBubble');
    b.addEventListener('pointerdown', function (e) {
      drag = { on: true, sx: e.clientX, sy: e.clientY, moved: false, orig: b.getBoundingClientRect() };
      try { b.setPointerCapture(e.pointerId); } catch (_) {}
    });
    b.addEventListener('pointermove', function (e) {
      if (!drag.on || !drag.orig) return;
      var dx = e.clientX - drag.sx;
      var dy = e.clientY - drag.sy;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true;
      if (!drag.moved) return;
      b.style.left = (drag.orig.left + dx) + 'px';
      b.style.top = (drag.orig.top + dy) + 'px';
      b.style.right = 'auto';
      b.style.bottom = 'auto';
    });
    function endDrag(e) {
      if (!drag.on) return;
      drag.on = false;
      try { b.releasePointerCapture(e.pointerId); } catch (_) {}
      if (drag.moved) {
        var r = b.getBoundingClientRect();
        lsSet(POS_X_KEY, String(Math.round(r.left)));
        lsSet(POS_Y_KEY, String(Math.round(r.top)));
      }
    }
    b.addEventListener('pointerup', endDrag);
    b.addEventListener('pointercancel', endDrag);
  }

  /* ---------- Panel placement near bubble ---------- */
  function placePanel() {
    var p = $('cbxPanel');
    var b = $('cbxBubble');
    var r = b.getBoundingClientRect();
    var pw = p.offsetWidth || 360;
    var ph = p.offsetHeight || 520;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var left = r.right + 10;
    if (left + pw > vw - 8) left = r.left - pw - 10;
    if (left < 8) left = 8;
    var top = r.bottom - ph;
    if (top < 8) top = 8;
    if (top + ph > vh - 8) top = vh - ph - 8;
    p.style.left = left + 'px';
    p.style.top = top + 'px';
    p.style.right = 'auto';
    p.style.bottom = 'auto';
  }

  function openPanel() {
    if (!player) return;
    panelOpen = true;
    $('cbxPanel').style.display = 'flex';
    placePanel();
    if (activeRoom === 'ai') {
      openAIThread();
    } else if (activeRoom && activeRoom !== 'ai') {
      openRoom(activeRoom);
    } else {
      showRoomList();
    }
    refreshRooms();
  }
  function closePanel() {
    panelOpen = false;
    $('cbxPanel').style.display = 'none';
    // keep polling the current room so unread keeps counting in background
  }

  function updateBadge() {
    var n = unreadTotal();
    var badge = $('cbxBadge');
    if (n > 0) {
      badge.style.display = '';
      badge.textContent = n > 99 ? '99+' : String(n);
    } else {
      badge.style.display = 'none';
    }
  }

  function autoGrow() {
    var ta = $('cbxInput');
    ta.style.height = 'auto';
    ta.style.height = Math.min(96, ta.scrollHeight) + 'px';
  }

  /* ---------- Build DOM ---------- */
  function buildDom() {
    rootEl = el('div', 'cbx-root');
    rootEl.innerHTML =
      '<style>' + CSS + '</style>' +
      '<button id="cbxBubble" class="cbx-bubble" title="Chat">' +
      '<span class="cbx-bubble-icon">' + icon('bubble', 24) + '</span>' +
      '<span id="cbxBadge" class="cbx-badge" style="display:none">0</span>' +
      '</button>' +
      '<div id="cbxPanel" class="cbx-panel" style="display:none">' +
      '<div class="cbx-header">' +
      '<button id="cbxBackBtn" class="cbx-iconbtn" style="display:none">' + icon('back', 20) + '</button>' +
      '<div id="cbxTitle" class="cbx-title">Chat</div>' +
      '<div class="cbx-hr">' +
      '<button id="cbxAiBtn" class="cbx-iconbtn" title="AI">' + icon('sparkle', 20) + '</button>' +
      '<button id="cbxAiReset" class="cbx-iconbtn" title="Xoá hội thoại AI" style="display:none">' + icon('trash', 18) + '</button>' +
      '<button id="cbxAiGear" class="cbx-iconbtn" title="Cấu hình AI server" style="display:none">' + icon('gear', 19) + '</button>' +
      '<button id="cbxNewRoom" class="cbx-iconbtn" title="Tạo phòng">' + icon('plus', 20) + '</button>' +
      '<button id="cbxClose" class="cbx-iconbtn" title="Đóng">' + icon('close', 20) + '</button>' +
      '</div>' +
      '</div>' +
      '<div id="cbxRoomList" class="cbx-roomlist"></div>' +
      '<div id="cbxThread" class="cbx-thread" style="display:none">' +
      '<div id="cbxAiStatus" class="cbx-ai-status" style="display:none"></div>' +
      '<div id="cbxMsgs" class="cbx-msgs"></div>' +
      '<div class="cbx-composer">' +
      '<button id="cbxMic" class="cbx-iconbtn cbx-mic" title="Ghi âm">' + icon('mic', 20) + '</button>' +
      '<span id="cbxRecLabel" class="cbx-reclabel" style="display:none"></span>' +
      '<textarea id="cbxInput" class="cbx-input" rows="1" placeholder="Tin nhắn…  (/ai để hỏi AI)"></textarea>' +
      '<button id="cbxSend" class="cbx-send" title="Gửi">' + icon('send', 18) + '</button>' +
      '</div>' +
      '</div>' +
      '</div>';
    document.body.appendChild(rootEl);

    $('cbxBubble').addEventListener('click', function () {
      if (drag.moved) { drag.moved = false; return; }
      if ($('cbxPanel').style.display === 'none') openPanel();
      else closePanel();
    });
    $('cbxClose').addEventListener('click', closePanel);
    $('cbxBackBtn').addEventListener('click', showRoomList);
    $('cbxAiBtn').addEventListener('click', openAIThread);
    $('cbxAiReset').addEventListener('click', resetAI);
    $('cbxAiGear').addEventListener('click', aiSetBase);
    $('cbxNewRoom').addEventListener('click', onCreateRoom);
    $('cbxSend').addEventListener('click', sendCurrent);
    $('cbxMic').addEventListener('click', function () {
      if (recording) stopRec();
      else startRec();
    });
    var input = $('cbxInput');
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendCurrent();
      }
    });
    input.addEventListener('input', autoGrow);
    input.addEventListener('focus', function () {
      if (activeRoom && activeRoom !== 'ai') {
        unread[activeRoom] = 0;
        saveUnread();
        updateBadge();
      }
    });
    $('cbxMsgs').addEventListener('click', function (e) {
      var v = e.target.closest('.cbx-voice');
      if (v) playVoice(v.getAttribute('data-id'));
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        if (activeRoom && activeRoom !== 'ai') renderMessages();
        refreshRooms();
        updateBadge();
      }
    });

    // restore bubble position
    try {
      var x = lsGet(POS_X_KEY);
      var y = lsGet(POS_Y_KEY);
      if (x && !isNaN(Number(x))) { $('cbxBubble').style.left = x + 'px'; $('cbxBubble').style.right = 'auto'; }
      if (y && !isNaN(Number(y))) { $('cbxBubble').style.top = y + 'px'; $('cbxBubble').style.bottom = 'auto'; }
    } catch (_) {}
    initDrag();
    window.addEventListener('resize', function () {
      if ($('cbxPanel').style.display !== 'none') placePanel();
    });
  }

  /* ---------- Init ---------- */
  function init() {
    if (!rootEl) buildDom();
    player = LearnDB.getPlayer ? LearnDB.getPlayer() : '';
    if (!player) return;
    loadUnread();
    $('cbxBubble').style.display = 'flex';
    updateBadge();
    LearnDB.chatEnsureDefaults().catch(function () {});
    refreshRooms();
  }

  var prevPlayer = '';
  var poll = setInterval(function () {
    if (!window.LearnDB || !document.body) return;
    var p = LearnDB.getPlayer ? LearnDB.getPlayer() : '';
    if (p === prevPlayer) return;
    prevPlayer = p;
    if (p) {
      if (!rootEl) buildDom();
      init();
    } else if (rootEl) {
      closePanel();
      $('cbxBubble').style.display = 'none';
    }
  }, 800);

  /* ---------- CSS (self-contained, page vars with fallbacks) ---------- */
  var CSS =
    '.cbx-root{--cbx-accent:#007AFF;--cbx-ink:#1c1c1e;--cbx-muted:#8e8e93;--cbx-line:rgba(60,60,67,.12);' +
    '--cbx-soft:#f2f2f7;--cbx-bad:#ff3b30;--cbx-ok:#34c759;--cbx-surface:#ffffff;' +
    'color:var(--cbx-ink);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,sans-serif;}' +
    '.cbx-root *{box-sizing:border-box;margin:0;padding:0}' +
    '.cbx-icon{fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle}' +
    /* bubble */
    '.cbx-bubble{position:fixed;bottom:80px;right:80px;z-index:9999;width:52px;height:52px;border-radius:50%;' +
    'border:none;background:var(--cbx-surface,#fff);box-shadow:0 4px 20px rgba(0,0,0,.14);cursor:grab;' +
    'display:none;align-items:center;justify-content:center;color:var(--cbx-accent);touch-action:none;' +
    'transition:transform .15s,box-shadow .3s;user-select:none}' +
    '.cbx-bubble:hover{box-shadow:0 6px 26px rgba(0,122,255,.22)}' +
    '.cbx-bubble:active{transform:scale(.92)}' +
    '.cbx-bubble-icon{display:flex}' +
    '.cbx-badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;' +
    'background:var(--cbx-bad);color:#fff;font-size:11px;font-weight:700;line-height:20px;text-align:center;' +
    'box-shadow:0 2px 6px rgba(255,59,48,.4);pointer-events:none}' +
    /* panel */
    '.cbx-panel{position:fixed;z-index:9999;width:min(92vw,380px);height:min(80vh,540px);display:flex;' +
    'flex-direction:column;background:var(--cbx-surface);border:1px solid var(--cbx-line);' +
    'border-radius:22px;box-shadow:0 18px 50px rgba(0,0,0,.22);overflow:hidden;animation:cbxPop .22s cubic-bezier(.22,1,.36,1)}' +
    '@keyframes cbxPop{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:none}}' +
    '.cbx-header{display:flex;align-items:center;gap:4px;padding:10px 10px 8px 14px;border-bottom:1px solid var(--cbx-line)}' +
    '.cbx-title{flex:1;font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.cbx-hr{display:flex;align-items:center;gap:2px}' +
    '.cbx-iconbtn{width:32px;height:32px;border:none;background:transparent;border-radius:10px;color:var(--cbx-accent);' +
    'cursor:pointer;display:inline-flex;align-items:center;justify-content:center}' +
    '.cbx-iconbtn:hover{background:var(--cbx-soft)}' +
    '.cbx-iconbtn:active{transform:scale(.9)}' +
    '.cbx-mic{color:var(--cbx-accent)}' +
    '.cbx-mic.cbx-rec{color:#fff;background:var(--cbx-bad);border-radius:50%}' +
    /* room list */
    '.cbx-roomlist{flex:1;overflow-y:auto;padding:6px 8px 10px}' +
    '.cbx-section-label{font-size:11px;font-weight:700;color:var(--cbx-muted);padding:8px 10px 4px;letter-spacing:.5px}' +
    '.cbx-room-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:14px;cursor:pointer;position:relative}' +
    '.cbx-room-item:hover{background:var(--cbx-soft)}' +
    '.cbx-room-item.cbx-active{background:var(--cbx-soft)}' +
    '.cbx-avatar{width:40px;height:40px;border-radius:12px;background:var(--cbx-accent);color:#fff;flex:none;' +
    'display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700}' +
    '.cbx-avatar-ai{background:linear-gradient(135deg,#AF52DE,#007AFF)}' +
    '.cbx-avatar-sm{width:30px;height:30px;border-radius:9px;font-size:14px}' +
    '.cbx-room-name{flex:1;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.cbx-room-meta{font-size:11px;color:var(--cbx-muted);flex:none}' +
    '.cbx-badge-sm{min-width:19px;height:19px;padding:0 5px;border-radius:10px;background:var(--cbx-bad);color:#fff;' +
    'font-size:11px;font-weight:700;line-height:19px;text-align:center;flex:none}' +
    '.cbx-room-add{text-align:center;color:var(--cbx-accent);font-size:13px;font-weight:600;padding:10px;' +
    'border:1px dashed var(--cbx-line);border-radius:14px;margin-top:8px;cursor:pointer}' +
    '.cbx-hint{font-size:11px;color:var(--cbx-muted);text-align:center;padding:10px 12px 2px}' +
    '.cbx-hint b{color:var(--cbx-accent)}' +
    /* thread */
    '.cbx-thread{flex:1;display:flex;flex-direction:column;min-height:0}' +
    '.cbx-ai-status{display:flex;flex-direction:column;gap:6px;padding:8px 12px;background:#f7f7fa;' +
    'border-bottom:1px solid var(--cbx-line);font-size:12px;align-items:flex-start}' +
    '.cbx-ai-check{color:var(--cbx-muted)}' +
    '.cbx-ai-ok{color:var(--cbx-ok);font-weight:700}' +
    '.cbx-ai-err{color:var(--cbx-bad);font-weight:700}' +
    '.cbx-ai-status code{background:var(--cbx-soft);padding:2px 6px;border-radius:6px;font-size:11px;word-break:break-all}' +
    '.cbx-ai-help{color:var(--cbx-muted);font-size:11px;line-height:1.6}' +
    '.cbx-ai-gear{border:none;background:none;color:var(--cbx-accent);font:inherit;text-decoration:underline;cursor:pointer;padding:0}' +
    '.cbx-ai-retry{border:none;background:var(--cbx-accent);color:#fff;border-radius:9px;padding:6px 12px;' +
    'font-size:12px;font-weight:600;cursor:pointer}' +
    '.cbx-msgs{flex:1;overflow-y:auto;padding:12px 12px 8px;background:#f7f7fa;display:flex;flex-direction:column;gap:3px}' +
    '.cbx-msg{display:flex;gap:6px;align-items:flex-end;max-width:100%}' +
    '.cbx-msg.cbx-own{justify-content:flex-end}' +
    '.cbx-msg-main{display:flex;flex-direction:column;max-width:78%}' +
    '.cbx-own .cbx-msg-main{align-items:flex-end}' +
    '.cbx-msg-sender{font-size:10.5px;color:var(--cbx-muted);font-weight:600;padding:0 4px 2px}' +
    '.cbx-msg-bubble{padding:9px 13px;border-radius:18px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.06);' +
    'font-size:14px;line-height:1.45;word-break:break-word;border:1px solid var(--cbx-line)}' +
    '.cbx-own .cbx-msg-bubble{background:var(--cbx-accent);color:#fff;border:none;border-bottom-right-radius:5px}' +
    '.cbx-msg:not(.cbx-own) .cbx-msg-bubble{border-bottom-left-radius:5px}' +
    '.cbx-msg-time{font-size:9.5px;color:#b0b0b5;padding:2px 5px}' +
    '.cbx-sys{font-size:11px;color:var(--cbx-muted);text-align:center;display:block}' +
    '.cbx-voice{display:inline-flex;align-items:center;gap:6px;background:rgba(0,122,255,.12);color:var(--cbx-accent);' +
    'border:none;border-radius:14px;padding:6px 10px;cursor:pointer}' +
    '.cbx-own .cbx-voice{background:rgba(255,255,255,.25);color:#fff}' +
    '.cbx-voice-bar{display:inline-flex;align-items:center;gap:2px;height:14px}' +
    '.cbx-voice-bar i{width:2px;background:currentColor;border-radius:2px}' +
    '.cbx-voice-dur{font-size:12px;font-weight:600}' +
    '.cbx-voice.cbx-playing{opacity:.6}' +
    /* composer */
    '.cbx-composer{display:flex;align-items:flex-end;gap:6px;padding:8px 10px 10px;border-top:1px solid var(--cbx-line)}' +
    '.cbx-input{flex:1;resize:none;border:1px solid var(--cbx-line);border-radius:18px;padding:9px 13px;' +
    'font:inherit;font-size:14px;background:var(--cbx-soft);outline:none;max-height:96px;line-height:1.4}' +
    '.cbx-input:focus{border-color:var(--cbx-accent)}' +
    '.cbx-reclabel{color:var(--cbx-bad);font-size:12px;font-weight:700;padding:0 2px}' +
    '.cbx-send{width:36px;height:36px;border:none;border-radius:50%;background:var(--cbx-accent);color:#fff;' +
    'cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex:none}' +
    '.cbx-send:hover{background:#0a6fe0}' +
    '.cbx-send:active{transform:scale(.9)}' +
    /* toast */
    '.cbx-toast-host{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:10000;display:flex;' +
    'flex-direction:column;gap:6px;align-items:center;pointer-events:none}' +
    '.cbx-toast{background:var(--cbx-ink);color:#fff;font-size:13px;font-weight:500;padding:9px 15px;border-radius:12px;' +
    'box-shadow:0 6px 20px rgba(0,0,0,.25);max-width:86vw;transition:opacity .3s,transform .3s}' +
    '.cbx-toast-ok{background:var(--cbx-ok)}.cbx-toast-warn{background:#ff9500}.cbx-toast-error{background:var(--cbx-bad)}' +
    '.cbx-toast.cbx-out{opacity:0;transform:translateY(-8px)}' +
    /* mobile */
    '@media (max-width:480px){.cbx-panel{width:calc(100vw - 20px);height:min(72vh,540px);left:10px !important;right:10px !important}' +
    '.cbx-bubble{right:14px !important;bottom:90px !important}}';
})();
