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

  /* ---------- Inline Icons: emoji → SVG (lucide-style, currentColor) ---------- */
  // Key = emoji chuẩn hoá (bỏ \uFE0F). Value = innerHTML svg; tiền tố 'F' = filled.
  var ILI = {
    '📝': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    '📋': '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
    '🎯': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    '📊': '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    '✏': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    '⚖': '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    '🗂': '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    '🔒': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    '📘': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    '📙': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    '📗': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    '📖': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    '📌': '<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1z"/>',
    '👉': '<circle cx="12" cy="12" r="10"/><polyline points="14 8 18 12 14 16"/><line x1="6" y1="12" x2="18" y2="12"/>',
    '📚': '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
    '✍': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    '🛡': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    '🔍': '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    '📑': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    '⚡': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    '⏱': '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
    '📄': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    '🏢': '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    '🧮': '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
    '🏆': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    '🧠': '<path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.5A2.5 2.5 0 0 0 4.5 7.5v.5A2.5 2.5 0 0 0 2.5 10.5v.5A2.5 2.5 0 0 0 4.5 13.5v.5A2.5 2.5 0 0 0 7 16.5v.5A2.5 2.5 0 0 0 9.5 19.5c.3 0 .6-.05.86-.15A2 2 0 0 0 12 21a2 2 0 0 0 1.64-1.65A2.5 2.5 0 0 0 14.5 19.5c.3 0 .6-.05.86-.15A2 2 0 0 0 17 17.5v-.5a2.5 2.5 0 0 0 2.5-2.5v-.5A2.5 2.5 0 0 0 21.5 11.5v-.5A2.5 2.5 0 0 0 19.5 8.5v-.5A2.5 2.5 0 0 0 17 5.5v-.5A2.5 2.5 0 0 0 14.5 2.5c-.3 0-.6.05-.86.15A2 2 0 0 0 12 1a2 2 0 0 0-1.64 1.65A2.5 2.5 0 0 0 9.5 2.5Z"/>',
    '🔥': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    '📜': '<path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>',
    '📈': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    '📉': '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
    '🍀': '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    '➡': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    '🤝': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    '🔀': '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
    '📦': '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    '💬': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    '✔': '<polyline points="20 6 9 17 4 12"/>',
    '👤': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    '👥': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    '📥': '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    '📣': '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    '📢': '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    '📅': '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    '🗓': '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    '🖼': '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    '🗺': '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    '🔬': '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
    '🧪': '<path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/>',
    '🧊': '<line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',
    '🧼': '<path d="M3 21h18"/><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"/><path d="M9 5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M9 12h6"/>',
    '🧹': '<path d="m13 11 9-9"/><path d="M14 6l4 4"/><path d="M17 3l4 4"/><path d="M9 15l-3.5 3.5a2.1 2.1 0 0 1-3-3L6 12"/><path d="M6 12l3 3"/>',
    '🧭': '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    '🛒': '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    '🛎': '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    '🛑': '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>',
    '⏰': '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/>',
    '💻': '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    '💶': '<path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>',
    '💳': '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    '💰': '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    '👔': '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
    '🏠': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    '🎲': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h.01"/><path d="M16 16h.01"/><path d="M8 16h.01"/><path d="M16 8h.01"/><path d="M12 12h.01"/>',
    '🍺': '<path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1 0-2 .5-2 1.5 0-1-.5-1.5-1-1.5"/><path d="M9.5 4 8 7.5"/><path d="M16 2l-1 3.5"/>',
    '🍷': '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>',
    '🍞': '<path d="M3 5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2c1.1 0 2-.9 2-2s.9 2 2 2 2-.9 2-2 .9 2 2 2 2-.9 2-2 .9 2 2 2 2-.9 2-2V7a2 2 0 0 0-2-2z"/>',
    '🍎': '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>',
    '🌍': '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    '➖': '<line x1="5" y1="12" x2="19" y2="12"/>',
    '❤': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    '⚔': '<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/>',
    '♻': '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    '☕': '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
    '☁': '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    'ℹ': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    '❓': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    '▶': '<polygon points="5 3 19 12 5 21 5 3"/>',
    '⬆': '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    '⭐': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    '🎉': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    '📰': '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
    '📞': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    '🔗': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    '🔢': '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
    '🗳': '<path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/><path d="M22 19H2"/>',
    '🦠': '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    '🔤': '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
    '🔄': '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    '📱': '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    '🎓': '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    '🌽': '<path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>',
    '🃏': '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',
    '🌿': '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    '🌱': '<path d="M22 7v1c0 4.4-3.6 8-8 8h-4"/><path d="M14 6a6 6 0 0 1 6 6"/><path d="M12 22v-7"/><path d="M12 15c0-3.3-2.7-6-6-6"/><path d="M6 9c0-2.2 1.8-4 4-4"/>',
    '🌾': '<path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>',
    '🥩': '<path d="M17 5c-2.5 0-5 2-5 5s2.5 5 5 5 5-2 5-5-2.5-5-5-5z"/><path d="M12 10c-2 0-3.5-1-5-2.5C5.5 6 4.5 6 4.5 8c0 4 3.5 8 7.5 9"/>',
    '🥚': '<path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10Z"/><path d="M12 15a3 3 0 0 0 3-3"/>',
    '🥛': '<path d="M8 2h8"/><path d="M9 2v1.5L7.5 5.5C6.5 6.7 6 8.2 6 9.8V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.8c0-1.6-.5-3.1-1.5-4.3L15 3.5V2"/><line x1="9" y1="12" x2="15" y2="12"/>',
    '🥔': '<path d="M18.8 2a4.2 4.2 0 0 1 3.2 6.8c-1.4 1.7-2 2.4-2 4.4 0 2.9-2.3 4.8-5 4.8a5.5 5.5 0 0 1-5.4-4.2 4.6 4.6 0 0 0-8.6-.5A4.2 4.2 0 0 1 4.2 2Z"/>',
    '🥧': '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    '🥗': '<path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"/><path d="m13 12 4-4"/><path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"/>',
    '🫘': '<path d="M10.165 6.598C5.969 4.741 2.373 5.5.75 8.25c4.196 1.858 7.792 1.099 9.415-1.652Z"/><path d="M13.835 6.598c4.196-1.857 7.792-1.098 9.415 1.652-4.196 1.858-7.792 1.099-9.415-1.652Z"/><path d="M14.05 9.15c4.196 1.858 7.792 1.099 9.415-1.652"/>',
    '🧬': '<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 6l-2.5-2.5"/><path d="M14 8l-1-1"/><path d="M7 18l2.5 2.5"/><path d="M3.5 14.5l.5.5"/><path d="M20 9l.5.5"/><path d="M6.5 12.5l1 1"/><path d="M16.5 10.5l1 1"/><path d="M10 16l1.5 1.5"/>',
    '🐟': '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/>',
    '🐔': '<path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="M20 7 23 10"/><path d="M6 14a2 2 0 0 1-2 2"/><path d="m10 19-2 3"/>',
    '🐖': '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    '🐑': '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    '🐄': '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    '🐮': '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    '🏛': '<line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    '🗣': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    '😤': '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    '🙂': '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    '😕': '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5-2 4-2 4 2 4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    '🤖': '<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16.01"/><line x1="16" y1="16" x2="16" y2="16.01"/>',
    '🥈': '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    '🥉': '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    '🍇': '<path d="M22 5V2l-5.89 5.89"/><circle cx="16.6" cy="15.89" r="3"/><circle cx="8.11" cy="7.78" r="3"/><circle cx="12.35" cy="12.02" r="3"/><circle cx="18.61" cy="12.02" r="3"/>',
    '🍽': '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    '🚪': '<path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"/>',
    '🚫': '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
    '👍': '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>',
    '🛢': '<line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    '🎓': '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    '©': '<circle cx="12" cy="12" r="10"/><path d="M15.5 9.5a3.5 3.5 0 1 0 0 5"/>',
    '®': '<circle cx="12" cy="12" r="10"/><path d="M9.5 15.5v-7h3a2.5 2.5 0 0 1 0 5h-3"/><path d="m13 12.5 2.5 3"/>',
    '🧑🍳': '<path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/>',
    '✅': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    '❌': '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    '💡': '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    '⚠': '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    '↔': '<polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/><line x1="3" y1="12" x2="21" y2="12"/>',
    '🟢': 'F<circle cx="12" cy="12" r="9"/>',
    '🔵': 'F<circle cx="12" cy="12" r="9"/>',
    '🟡': 'F<circle cx="12" cy="12" r="9"/>',
    '🟤': 'F<circle cx="12" cy="12" r="9"/>',
    '🔴': 'F<circle cx="12" cy="12" r="9"/>',
    '⚪': 'F<circle cx="12" cy="12" r="9"/>',
    '⬜': 'F<circle cx="12" cy="12" r="9"/>',
    '⬛': 'F<circle cx="12" cy="12" r="9"/>',
    '📆': '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    '🍚': '<path d="M2 10h20v1a10 10 0 0 1-20 0z"/><path d="M12 21a10 10 0 0 1-10-10"/>',
  };

  var ILI_RE = null;
  try {
    ILI_RE = new RegExp('((?:\\p{Extended_Pictographic}\\p{Emoji_Modifier}?)\\uFE0F?(?:\\u200D(?:\\p{Extended_Pictographic}\\p{Emoji_Modifier}?)\\uFE0F?)*)', 'gu');
  } catch (_) { ILI_RE = null; }

  function iliSvgHtml(p) {
    var fill = p.charAt(0) === 'F';
    return '<svg class="cbx-ili' + (fill ? ' cbx-ili-fill' : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (fill ? p.slice(1) : p) + '</svg>';
  }

  function iliScanText(node) {
    var t = node.nodeValue;
    if (!t) return;
    ILI_RE.lastIndex = 0;
    if (!ILI_RE.test(t)) return;
    ILI_RE.lastIndex = 0;
    var frag = document.createDocumentFragment();
    var last = 0, any = false, m;
    while ((m = ILI_RE.exec(t))) {
      var key = m[0].replace(/\uFE0F/g, '');
      var p = ILI[key] || ILI[key.split('\u200D')[0]];
      if (!p) continue;
      if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
      var s = document.createElement('span');
      s.className = 'cbx-ili-w';
      s.innerHTML = iliSvgHtml(p);
      frag.appendChild(s);
      last = m.index + m[0].length;
      any = true;
    }
    if (!any) return;
    if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
    if (node.parentNode) node.parentNode.replaceChild(frag, node);
  }

  function iliScan() {
    if (!ILI_RE || !document.body) return;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue) return NodeFilter.FILTER_REJECT;
        ILI_RE.lastIndex = 0;
        if (!ILI_RE.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        ILI_RE.lastIndex = 0;
        var p = n.parentNode;
        if (!p || !p.closest) return NodeFilter.FILTER_REJECT;
        try {
          if (p.closest('script,style,code,pre,svg,textarea,input,select,title')) return NodeFilter.FILTER_REJECT;
        } catch (_) {}
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    var nodes = [];
    var n;
    while ((n = w.nextNode())) nodes.push(n);
    for (var i = 0; i < nodes.length; i++) iliScanText(nodes[i]);
  }

  function iliStart() {
    if (!ILI_RE) return;
    iliScan();
    if (window.MutationObserver) {
      var obs = new MutationObserver(function () {
        clearTimeout(obs.t);
        obs.t = setTimeout(iliScan, 150);
      });
      try { obs.observe(document.documentElement, { childList: true, subtree: true }); } catch (_) {}
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(iliStart, 60); });
  } else {
    setTimeout(iliStart, 60);
  }

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
    list.appendChild(el('div', 'cbx-section-label', 'TRÒ CHUYỆN'));
    var aiItem = el('div', 'cbx-room-item' + (activeRoom === 'ai' ? ' cbx-active' : ''), '');
    aiItem.innerHTML =
      '<span class="cbx-avatar cbx-avatar-ai">' + icon('sparkle', 18) + '</span>' +
      '<span class="cbx-room-name">AI</span>' +
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
        '<div class="cbx-msg-time">' + fmtTime(m.at) + '</div>';
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
    for (var j = 0; j < msgs.length; j++) have[msgs[j].id] = true;
    for (var i = 0; i < newMsgs.length; i++) {
      var m = newMsgs[i];
      if (!m || !m.id || have[m.id]) continue;
      have[m.id] = true;
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
    $('cbxNewRoom').addEventListener('click', onCreateRoom);
    $('cbxSend').addEventListener('click', sendCurrent);
    $('cbxMic').addEventListener('click', function () {
      if (recording) stopRec();
      else startRec();
    });
    $('cbxImgBtn').addEventListener('click', function () {
      if (activeRoom !== 'ai') {
        cbxToast('Gửi ảnh chỉ dùng trong hội thoại AI', 'warn');
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
          sendToAI(caption, small);
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
    '.cbx-ai-img{display:block;max-width:min(260px,100%);max-height:240px;border-radius:12px;' +
    'margin:0 0 6px;object-fit:cover}' +
    '.cbx-msg-time{font-size:9.5px;color:#b0b0b5;padding:2px 5px}' +
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
