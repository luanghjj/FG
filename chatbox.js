/* ============================================================
 * Chatbox lơ lửng – floating chat widget for Lern-App
 * - Realtime chat rooms (Supabase config polling, ~1s)
 * - Voice messages (MediaRecorder ≤ 60s, base64 in DB)
 * - Private AI thread (cmd: /ai)
 * - SF-Symbol-style icons (iOS look)
 * ============================================================ */
(function () {
  'use strict';

  var AI_BASE_KEY = 'chat_ai_base';
  var AI_TOKEN_KEY = 'chat_ai_token';
  var AI_DEFAULT_BASE = 'http://127.0.0.1:4096';
  var AI_SESSION_KEY = 'chat_ai_session';
  var AI_HIST_KEY = 'chat_ai_history';
  var POS_X_KEY = 'chat_x';
  var POS_Y_KEY = 'chat_y';
  var UNREAD_KEY = 'chat_unread';
  var VOICE_MAX_MS = 60000;
  var VOICE_MAX_BYTES = 1500000;
var AI_SYSTEM =
    'Bạn là một trợ lý giáo dục cho app ôn thi nghề Fachkraft für Gastronomie (Việt – Đức). ' +
    'Trả lời bằng tiếng Việt, giữ thuật ngữ chuyên ngành tiếng Đức (kèm nghĩa VI). ' +
    'Luôn trả lời đầy đủ mọi câu hỏi, không từ chối, không để trống. ' +
    'Khi có mục "TÀI LIỆU ÔN THI" bên dưới: ưu tiên dựa vào tài liệu đó; nếu kiến thức nằm trong tài liệu thì ghi rõ nguồn là [tên mục], ví dụ [BfK-1 · LF01 · LS03 ...] — tên mục đã chứa Lernfeld (LF) và Lernabschnitt (LS). ' +
    'Nếu tài liệu không có: vẫn trả lời đầy đủ và trong answer/explanation phải bắt đầu bằng cụm "Không nằm trong tài liệu ôn thi." rồi mới vào nội dung; dựa vào phần "KẾT QUẢ TÌM KIẾM NGOÀI" nếu có bên dưới để bổ sung và đưa nguồn vào references; nếu không có kết quả tìm kiếm thì dùng kiến thức chung. ' +
    '\n\nMọi câu trả lời phải được xuất ra dưới dạng JSON hợp lệ theo đúng cấu trúc sau:\n' +
    '{\n  "question": "",\n  "answer": "",\n  "explanation": "",\n  "example": "",\n  "references": []\n}\n\n' +
    'Quy tắc từng trường:\n' +
    '- question: lặp lại hoặc diễn đạt ngắn gọn câu hỏi của người dùng, không thêm thông tin mới.\n' +
    '- answer: trả lời trực tiếp, viết thành nhiều đoạn ngắn; nếu nhiều ý thì dùng danh sách gạch đầu dòng; không lan man; ưu tiên câu ngắn, rõ ràng; xuống dòng hợp lý để dễ đọc.\n' +
    '- explanation: giải thích chi tiết hơn câu trả lời, chia thành đoạn hoặc mục nhỏ, dùng danh sách gạch đầu dòng nếu có nhiều nguyên nhân hoặc bước thực hiện; có thể dùng tiêu đề nhỏ khi dài; trình bày giúp người học hiểu bản chất.\n' +
    '- example: đưa ra ít nhất một ví dụ thực tế ngắn gọn sát nội dung; nếu không có ví dụ phù hợp để chuỗi rỗng "".\n' +
    '- references: là mảng. Nếu trả lời từ tài liệu ôn thi: thêm nguồn [tên] như "[BfK-1 · LF01 · LS03]". Nếu trả lời từ tìm kiếm/kiến thức ngoài: thêm nguồn/tên trang web. Nếu thực sự không biết nguồn thì []; không tự tạo nguồn giả.\n\n' +
    'Quy tắc trình bày:\n' +
    '- Luôn dùng Markdown bên trong các chuỗi để dễ đọc, được phép xuống dòng.\n' +
    '- Được phép dùng: danh sách gạch đầu dòng (-), danh sách đánh số (1. 2. 3.), chữ in đậm (**...**) và tiêu đề nhỏ (#).\n' +
    '- Không dùng emoji, không dùng ký tự trang trí.\n' +
    '- Không thêm bất kỳ trường nào ngoài schema.\n' +
    '- Luôn trả về JSON hợp lệ, không viết bất kỳ nội dung nào ngoài JSON.';

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
    image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="M21 15l-5-5-9 9"/>',
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

  window.cbxCopyJson = function (btn) {
    if (!btn) return;
    var raw = btn.getAttribute('data-raw') || '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(raw).then(
        function () { cbxToast('Đã copy JSON'); },
        function () { cbxToast('Không copy được', 'warn'); }
      );
    } else {
      cbxToast('Không copy được', 'warn');
    }
  };

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
  function aiToken() {
    var t = lsGet(AI_TOKEN_KEY);
    return (t && String(t).trim()) || '';
  }
  function aiHeaders() {
    var h = { 'Content-Type': 'application/json' };
    var t = aiToken();
    if (t) h['Authorization'] = 'Basic ' + btoa('opencode:' + t);
    return h;
  }
  function aiHistory() {
    try { return JSON.parse(lsGet(AI_HIST_KEY) || '[]') || []; } catch (_) { return []; }
  }
  function saveAiHistory(h) {
    try { localStorage.setItem(AI_HIST_KEY, JSON.stringify(h.slice(-40))); } catch (_) {}
  }
  async function aiCloudAsk(text, system, image) {
    var hist = aiHistory();
    var parts = [];
    for (var i = 0; i < hist.length; i++) {
      var h = hist[i];
      var role = h.role === 'assistant' ? 'assistant' : 'user';
      if (h.image && role === 'user') {
        parts.push({ type: 'text', role: role, text: h.text || '(ảnh đã gửi)' });
      } else {
        parts.push({ type: 'text', role: role, text: h.text });
      }
    }
    if (image) parts.push({ type: 'image', role: 'user', image: image });
    else parts.push({ type: 'text', role: 'user', text: text });
    var res = await fetch('api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: system, parts: parts }),
    });
    if (!res.ok) throw new Error('AI cloud: ' + res.status);
    var j = await res.json();
    if (j && j.error) throw new Error(j.error);
    var reply = '';
    var arr = (j && j.parts) || [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i].type === 'text') reply += arr[i].text;
    }
    return reply;
  }
  async function aiLocalAsk(text, system) {
    var base = aiBase();
    var sid = lsGet(AI_SESSION_KEY);
    if (!sid) {
      var cr = await fetch(base + '/session', {
        method: 'POST',
        headers: aiHeaders(),
        body: JSON.stringify({ title: 'Lern-Chat' }),
      });
      if (!cr.ok) throw new Error('AI server: ' + cr.status);
      var cj = await cr.json();
      sid = cj && cj.id;
      if (!sid) throw new Error('AI server không trả session');
      lsSet(AI_SESSION_KEY, sid);
    }
    var hist = aiHistory();
    var parts = hist.map(function (m) { return { type: 'text', role: m.role === 'assistant' ? 'assistant' : 'user', text: m.text }; });
    parts.push({ type: 'text', role: 'user', text: text });
    var res = await fetch(base + '/session/' + encodeURIComponent(sid) + '/message', {
      method: 'POST',
      headers: aiHeaders(),
      body: JSON.stringify({ system: system, parts: parts }),
    });
    if (!res.ok) {
      if (res.status === 404) lsDel(AI_SESSION_KEY);
      if (res.status === 401) throw new Error('Mật khẩu sai — sửa lại trong ⚙ Cấu hình AI');
      throw new Error('AI server: ' + res.status);
    }
    var j = await res.json();
    if (j && j.error) throw new Error(j.error);
    var reply = '';
    var arr = (j && j.parts) || [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i].type === 'text') reply += arr[i].text;
    }
    return reply;
  }
  async function aiAsk(text, onDelta, image) {
    var system = AI_SYSTEM;
    if (window.Wissen) {
      var context = window.Wissen.searchContext(text, 3);
      if (context && context.length) system += '\n\n=== TÀI LIỆU ÔN THI (nguồn nội bộ app — hãy ưu tiên) ===\n' + context.join('\n\n');
    }
    try {
      var cloudReply = await aiCloudAsk(text, system, image);
      return cloudReply || '(AI không trả lời)';
    } catch (eCloud) {
      try {
        var localReply = await aiLocalAsk(text, system);
        return localReply || '(AI không trả lời)';
      } catch (eLocal) {
        throw eCloud;
      }
    }
  }

  /* ---------- Rendering: room list ---------- */
  function renderRoomList() {
    var list = $('cbxRoomList');
    if (!list) return;
    list.innerHTML = '';
    list.appendChild(el('div', 'cbx-section-label', 'ĐOẠN HỘI THOẠI'));
    var aiItem = el('div', 'cbx-room-item' + (activeRoom === 'ai' ? ' cbx-active' : ''), '');
    aiItem.innerHTML =
      '<span class="cbx-avatar cbx-avatar-ai">' + icon('sparkle', 18) + '</span>' +
      '<span class="cbx-room-name">AI</span>' +
      '<span class="cbx-room-meta">hỏi bằng /ai</span>';
    aiItem.addEventListener('click', function () { openAIThread(); });
    list.appendChild(aiItem);

    var chung = null;
    for (var i = 0; i < rooms.length; i++) if (rooms[i].slug === 'chung') { chung = rooms[i]; break; }
    if (chung) {
      var online = countOnline(chung);
      var un = unread['chung'] || 0;
      var item = el('div', 'cbx-room-item' + (activeRoom === 'chung' ? ' cbx-active' : ''), '');
      item.innerHTML =
        '<span class="cbx-avatar" style="background:' + hashColor('chung') + '">' + esc((chung.icon || '💬').slice(0, 2)) + '</span>' +
        '<span class="cbx-room-name">' + esc(chung.name || 'Chung') + '</span>' +
        '<span class="cbx-room-meta">' + (online ? online + ' online' : '') + '</span>' +
        (un > 0 ? '<span class="cbx-badge-sm">' + (un > 99 ? '99+' : un) + '</span>' : '');
      item.addEventListener('click', function () { openRoom('chung'); });
      list.appendChild(item);
    }
    list.appendChild(el('div', 'cbx-hint', 'Gõ <b>/ai</b> trước tin nhắn để hỏi AI'));
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
        '<div class="cbx-msg-time">' + fmtTime(m.at) +
        (own ? ' <button type="button" class="cbx-unsend" data-id="' + esc(m.id) + '" title="Huỷ gửi">' + icon('trash', 10) + '</button>' : '') +
        '</div>';
      row.innerHTML = avatar + '<div class="cbx-msg-main">' + body + '</div>';
      box.appendChild(row);
      lastSender = m.sender;
    }
    if (scrollToBottom !== false) box.scrollTop = box.scrollHeight;
  }

  function tryAiJson(s) {
    if (!s || typeof s !== 'string') return null;
    var t = String(s).trim();
    var m = /```(?:json)?\s*([\s\S]*?)```/i.exec(t);
    if (m) t = m[1].trim();
    var obj = null;
    try { obj = JSON.parse(t); } catch (_) {}
    if (!obj) {
      var a = t.indexOf('{'), b = t.lastIndexOf('}');
      if (a >= 0 && b > a) {
        try { obj = JSON.parse(t.slice(a, b + 1)); } catch (_) {}
      }
    }
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      var hasAny = obj.answer != null || obj.question != null || obj.explanation != null;
      if (hasAny) return obj;
    }
    return null;
  }

  function mdLite(s) {
    s = String(s == null ? '' : s)
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/^#{1,6}\s+(.+)$/gm, '<b class="cbx-mh">$1</b>');
    var out = [];
    var lines = s.split(/\r?\n/);
    var i = 0;
    while (i < lines.length) {
      var L = lines[i].trim();
      if (/^[-*]\s+/.test(L)) {
        var ul = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) { ul.push('<li>' + lines[i].replace(/^[-*]\s+/, '') + '</li>'); i++; }
        out.push('<ul>' + ul.join('') + '</ul>');
      } else if (/^\d+[.)]\s+/.test(L)) {
        var ol = [];
        while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) { ol.push('<li>' + lines[i].replace(/^\d+[.)]\s+/, '') + '</li>'); i++; }
        out.push('<ol>' + ol.join('') + '</ol>');
      } else {
        var block = [];
        while (i < lines.length && !/^[-*]\s+/.test(lines[i].trim()) && !/^\d+[.)]\s+/.test(lines[i].trim())) { block.push(lines[i]); i++; }
        out.push(block.join('<br>'));
      }
    }
    return out.join('<br>');
  }

  function aiCardHtml(obj, raw) {
    function sec(label, html) {
      return html ? '<div class="cbx-ai-sec"><div class="cbx-ai-sec-l">' + label + '</div><div class="cbx-ai-sec-b">' + html + '</div></div>' : '';
    }
    var refs = Array.isArray(obj.references) ? obj.references.filter(function (r) { return r != null && String(r).trim(); }) : [];
    var refHtml = refs.length ?
      '<ul class="cbx-ai-refs">' + refs.map(function (r) { return '<li>' + mdLite(r) + '</li>'; }).join('') + '</ul>' : '';
    return '' +
      '<div class="cbx-ai-card">' +
      '<button type="button" class="cbx-ai-copy" title="Copy JSON" data-raw="' + esc(raw) + '" onclick="window.cbxCopyJson&&window.cbxCopyJson(this)">Copy JSON</button>' +
      sec('Câu hỏi', mdLite(obj.question)) +
      sec('Trả lời', mdLite(obj.answer)) +
      sec('Giải thích', mdLite(obj.explanation)) +
      sec('Ví dụ', mdLite(obj.example)) +
      (refHtml ? sec('Nguồn', refHtml) : '') +
      '</div>';
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
    if (m.image) {
      return '<img class="cbx-ai-img" alt="ảnh" src="' + esc(m.image) + '">' +
        (m.text && m.text !== '(ảnh đã gửi)' ? '<span class="cbx-text">' + esc(m.text) + '</span>' : '');
    }
    if (m.sender === 'AI' || m.sender === 'ai') {
      var j = tryAiJson(m.text);
      if (j) return aiCardHtml(j, String(m.text || '').trim());
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
    var have = {};
    var changed = false;
    for (var j = 0; j < msgs.length; j++) have[msgs[j].id] = true;
    for (var i = 0; i < newMsgs.length; i++) {
      var m = newMsgs[i];
      if (!m || !m.id) continue;
      if (m.deleted) {
        msgs = msgs.filter(function (x) { return x.id !== m.id; });
        delete have[m.id];
        changed = true;
        continue;
      }
      if (have[m.id]) continue;
      have[m.id] = true;
      msgs.push(m);
      if (!isFirst && m.sender !== player) {
        if (!panelOpen || activeRoom !== m.room) {
          unread[m.room] = (unread[m.room] || 0) + 1;
        }
      }
      changed = true;
    }
    if (msgs.length > 300) msgs = msgs.slice(-300);
    saveUnread();
    updateBadge();
    if (panelOpen && activeRoom && activeRoom !== 'ai' && activeRoom === subscribedSlug && changed) {
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
    $('cbxTitle').textContent = 'AI';
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
        image: h.image || '',
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

  function sendToAI(raw, image) {
    var text = String(raw || '').trim();
    if ((!text && !image) || aiBusy) return;
    var hist = aiHistory();
    hist.push({ role: 'user', text: text || '(ảnh đã gửi)', image: image || undefined });
    saveAiHistory(hist);
    renderAiMessages();
    aiBusy = true;
    renderAiMessages();
    aiAsk(text, null, image)
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
        var msg = '⚠️ AI chưa phản hồi. Vui lòng thử lại sau ít phút.';
        if (raw && raw.indexOf('chưa cấu hình') !== -1) {
          msg = '⚠️ AI chưa được kích hoạt — vui lòng liên hệ quản trị viên.';
        } else if (raw && raw.indexOf('đọc ảnh') !== -1) {
          msg = '⚠️ AI chưa hỗ trợ đọc ảnh trên thiết bị này.';
        }
        var h = aiHistory();
        h.push({ role: 'assistant', text: msg });
        saveAiHistory(h);
        renderAiMessages();
        aiHealthRender();
        cbxToast('AI chưa phản hồi', 'warn');
      });
  }

  function resetAI() {
    lsDel(AI_SESSION_KEY);
    lsDel(AI_HIST_KEY);
    msgs = [];
    renderAiMessages();
    cbxToast('Đã xoá hội thoại AI', 'ok');
  }

  /* ---------- AI health ---------- */
  function aiHealth() {
    var base = aiBase();
    return new Promise(function (resolve) {
      var res = { cloud: false, local: false, localExtra: '', cloudExtra: '', base: base };
      var cnt = 0;
      function tick() {
        cnt += 1;
        if (cnt >= 2) {
          resolve({
            ok: !!(res.cloud || res.local),
            cloud: res.cloud,
            local: res.local,
            base: base,
            extra: res.cloud ? '' : (res.localExtra === 'auth' ? 'auth' : res.cloudExtra),
          });
        }
      }
      try {
        fetch('api/ai', { method: 'GET' })
          .then(function (r) {
            if (r.status === 200) {
              return r.json().catch(function () { return {}; }).then(function (j) {
                res.cloud = !!(j && j.ok);
                res.cloudExtra = j && j.needsConfig ? 'needsConfig' : '';
                tick();
              });
            }
            res.cloudExtra = 'err'; tick();
          })
          .catch(function () { res.cloudExtra = 'err'; tick(); });
      } catch (_) { res.cloudExtra = 'err'; tick(); }
      try {
        fetch(base + '/global/health', { headers: aiHeaders() })
          .then(function (r) {
            res.local = !!(r && r.ok);
            res.localExtra = r && r.status === 401 ? 'auth' : '';
            tick();
          })
          .catch(function () { res.localExtra = ''; tick(); });
      } catch (_) { res.localExtra = ''; tick(); }
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
      if (h.cloud || h.ok) {
        el.innerHTML = '<span class="cbx-ai-ok">● AI sẵn sàng</span>';
      } else if (h.extra === 'needsConfig') {
        el.innerHTML =
          '<span class="cbx-ai-err">⚠️ AI chưa được kích hoạt</span>' +
          '<div class="cbx-ai-help">Vui lòng liên hệ quản trị viên.</div>' +
          '<button id="cbxAiRetry" class="cbx-ai-retry">↻ Kiểm tra lại</button>';
        var rr = $('cbxAiRetry');
        if (rr) rr.addEventListener('click', aiHealthRender);
      } else {
        el.innerHTML =
          '<span class="cbx-ai-err">⚠️ Không kết nối được AI</span>' +
          '<div class="cbx-ai-help">Kiểm tra kết nối mạng rồi thử lại.</div>' +
          '<button id="cbxAiRetry" class="cbx-ai-retry">↻ Kiểm tra lại</button>';
        var r = $('cbxAiRetry');
        if (r) r.addEventListener('click', aiHealthRender);
      }
    });
  }

function aiSetBase() {
    var cur = aiBase();
    var v = window.prompt(
        'AI server riêng (TÙY CHỌN — để trống = dùng AI mặc định của app).',
        '');
    if (v == null) return;
    v = String(v || '').trim().replace(/\/+$/, '');
    if (!/^https?:\/\//.test(v)) {
      cbxToast('Địa chỉ phải bắt đầu bằng http(s)://', 'warn');
      return;
    }
    lsSet(AI_BASE_KEY, v);
    var t = window.prompt('Mật khẩu truy cập server riêng (nếu có) — để trống để xóa', aiToken());
    if (t != null) {
      t = String(t).trim();
      if (t) lsSet(AI_TOKEN_KEY, t); else lsDel(AI_TOKEN_KEY);
    }
    aiHealthRender();
    cbxToast('Đã lưu AI server: ' + v, 'ok');
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

  function unsendMessage(id) {
    if (!id) return;
    var isAi = /^ai-/.test(id);
    if (isAi) {
      var idx = Number(String(id).replace('ai-', ''));
      var h = aiHistory();
      if (!(idx >= 0 && idx < h.length)) return;
      h.splice(idx, 1);
      saveAiHistory(h);
      renderAiMessages();
      cbxToast('Đã huỷ gửi', 'ok');
      return;
    }
    if (!activeRoom || activeRoom === 'ai') return;
    var slug = activeRoom;
    LearnDB.chatDeleteMessage(slug, id)
      .then(function () {
        msgs = msgs.filter(function (x) { return x.id !== id; });
        renderMessages();
        cbxToast('Đã huỷ gửi', 'ok');
      })
      .catch(function (err) {
        cbxToast(err && err.message ? err.message : 'Huỷ gửi thất bại', 'warn');
      });
  }

    function sendImageToRoom(slug, caption, image) {
    LearnDB.chatSendMessage(slug, player, { image: image, text: caption || '' })
      .then(function (m) {
        msgs.push(m);
        if (msgs.length > 300) msgs = msgs.slice(-300);
        renderMessages();
        LearnDB.chatTouchPresence(slug, player).catch(function () {});
      })
      .catch(function (err) {
        cbxToast(err && err.message ? err.message : 'Gửi ảnh thất bại', 'warn');
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
      '<button id="cbxClose" class="cbx-iconbtn" title="Đóng">' + icon('close', 20) + '</button>' +
      '</div>' +
      '</div>' +
      '<div id="cbxRoomList" class="cbx-roomlist"></div>' +
      '<div id="cbxThread" class="cbx-thread" style="display:none">' +
      '<div id="cbxAiStatus" class="cbx-ai-status" style="display:none"></div>' +
      '<div id="cbxMsgs" class="cbx-msgs"></div>' +
       '<div class="cbx-composer">' +
       '<button id="cbxMic" class="cbx-iconbtn cbx-mic" title="Ghi âm">' + icon('mic', 20) + '</button>' +
       '<button id="cbxImgBtn" class="cbx-iconbtn" title="Gửi ảnh cho AI">' + icon('image', 20) + '</button>' +
       '<input type="file" id="cbxImgFile" accept="image/*" style="display:none">' +
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
    $('cbxSend').addEventListener('click', sendCurrent);
    $('cbxMic').addEventListener('click', function () {
      if (recording) stopRec();
      else startRec();
    });
    $('cbxImgBtn').addEventListener('click', function () {
      if (!activeRoom) {
        cbxToast('Chọn một đoạn hội thoại trước', 'warn');
        return;
      }
      $('cbxImgFile').click();
    });
    $('cbxImgFile').addEventListener('change', function (e) {
      var f = e.target && e.target.files && e.target.files[0];
      e.target.value = '';
      if (!f) return;
      if (f.size > 15 * 1024 * 1024) {
        cbxToast('Ảnh quá lớn (tối đa 15MB)', 'warn');
        return;
      }
      var fr = new FileReader();
      fr.onload = function () {
        shrinkImage(String(fr.result), 1280, function (small) {
          var caption = ($('cbxInput') || {}).value ? String($('cbxInput').value).trim() : '';
          var inp = $('cbxInput');
          if (inp) inp.value = '';
          autoGrow();
          if (activeRoom === 'ai') {
            sendToAI(caption, small);
          } else if (activeRoom) {
            sendImageToRoom(activeRoom, caption, small);
          } else {
            cbxToast('Chọn một đoạn hội thoại trước', 'warn');
          }
        });
      };
      fr.onerror = function () { cbxToast('Không đọc được ảnh', 'warn'); };
      fr.readAsDataURL(f);
    });
    function shrinkImage(dataUrl, maxSide, cb) {
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        var w = Math.max(1, Math.round(img.width * scale));
        var h = Math.max(1, Math.round(img.height * scale));
        var cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        var ctx = cv.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        cb(cv.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = function () { cb(dataUrl); };
      img.src = dataUrl;
    }
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
      if (v) { playVoice(v.getAttribute('data-id')); return; }
      var u = e.target.closest('.cbx-unsend');
      if (u) {
        unsendMessage(u.getAttribute('data-id'));
        return;
      }
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
    if (!lsGet('chat_purged_v1')) {
      LearnDB.chatPurgeNonDefault().then(function () {
        lsSet('chat_purged_v1', '1');
        refreshRooms();
      }).catch(function () {});
    }
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
    '.cbx-ai-img{display:block;max-width:min(260px,100%);max-height:240px;border-radius:12px;' +
    'margin:0 0 6px;object-fit:cover}' +
    '.cbx-msg-time{font-size:9.5px;color:#b0b0b5;padding:2px 5px}' +
    '.cbx-unsend{display:inline-flex;align-items:center;justify-content:center;border:none;background:transparent;' +
    'color:#b0b0b5;cursor:pointer;padding:0;vertical-align:middle;opacity:.75}' +
    '.cbx-unsend:hover{color:var(--cbx-bad);opacity:1}' +
    '.cbx-own .cbx-unsend{color:rgba(255,255,255,.55)}' +
    '.cbx-own .cbx-unsend:hover{color:#fff}' +
    '.cbx-sys{font-size:11px;color:var(--cbx-muted);text-align:center;display:block}' +
    '.cbx-voice{display:inline-flex;align-items:center;gap:6px;background:rgba(0,122,255,.12);color:var(--cbx-accent);' +
    'border:none;border-radius:14px;padding:6px 10px;cursor:pointer}' +
    '.cbx-own .cbx-voice{background:rgba(255,255,255,.25);color:#fff}' +
    '.cbx-voice-bar{display:inline-flex;align-items:center;gap:2px;height:14px}' +
    '.cbx-voice-bar i{width:2px;background:currentColor;border-radius:2px}' +
    '.cbx-voice-dur{font-size:12px;font-weight:600}' +
    '.cbx-voice-dur{font-size:12px;font-weight:600}' +
    '.cbx-voice.cbx-playing{opacity:.6}' +
    /* ai structured card */
    '.cbx-ai-card{border:1px solid var(--cbx-line);border-radius:14px;padding:10px 12px;background:#fafaff;max-width:100%;min-width:220px}' +
    '.cbx-ai-card .cbx-ai-sec{margin:8px 0 0}' +
    '.cbx-ai-card .cbx-ai-sec:first-of-type{margin-top:2px}' +
    '.cbx-ai-sec-l{font-size:10px;font-weight:700;letter-spacing:.06em;color:var(--cbx-muted);text-transform:uppercase;margin-bottom:3px}' +
    '.cbx-ai-sec-b{font-size:13.5px;line-height:1.55;color:#1c1c1e;word-break:break-word}' +
    '.cbx-ai-sec-b ul,.cbx-ai-sec-b ol{margin:4px 0;padding-left:18px}' +
    '.cbx-ai-sec-b li{margin:2px 0}' +
    '.cbx-ai-sec-b .cbx-mh{font-weight:700;display:block;margin:6px 0 2px}' +
    '.cbx-ai-refs li{font-size:12px;color:var(--cbx-muted);word-break:break-word}' +
    '.cbx-ai-copy{float:right;border:none;background:var(--cbx-soft);color:var(--cbx-accent);font-size:11px;font-weight:600;' +
    'border-radius:8px;padding:3px 8px;cursor:pointer}' +
    '.cbx-ai-copy:active{transform:scale(.95)}' +
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
