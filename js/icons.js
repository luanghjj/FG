/* icons.js — Emoji → inline SVG (runtime) cho AzubiHub.
 * Mọi emoji trong nội dung hiển thị được thay bằng <svg> inline cùng style
 * với các icon line có sẵn. Cờ ngôn ngữ (🇩🇪 🇻🇳 🇬🇧 …) giữ nguyên emoji.
 * Nguồn file HTML/JS không bị sửa — chỉ DOM lúc render được thay thế.
 */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  function s(inner) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      inner +
      '</svg>'
    );
  }
  function dot(fill) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7" fill="' + fill + '" stroke="none"/></svg>';
  }
  function num(n) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="9"/>' +
      '<text x="12" y="16.5" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor" stroke="none" font-family="inherit">' +
      n +
      '</text></svg>'
    );
  }

  /* ---------- icon map (khóa đã bỏ U+FE0F, ZWJ giữ nguyên) ---------- */
  var M = {};
  function put(key, inner) { M[key] = s(inner); }

  /* kiểm tra / gạch chéo */
  put('✅', '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16 9.5"/>');
  put('✓', '<path d="M5 12.5l4.5 4.5L19 7"/>');
  put('✔', '<path d="M5 12.5l4.5 4.5L19 7"/>');
  put('✕', '<path d="M6 6l12 12M18 6L6 18"/>');
  put('✗', '<path d="M6 6l12 12M18 6L6 18"/>');
  put('❌', '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>');
  put('⚠', '<path d="M10.3 3.8 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 16.5h.01"/>');
  put('❓', '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.8.4-1.1 1-1.1 2"/><path d="M12 17h.01"/>');
  put('⚡', '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>');

  /* viết lách / tài liệu */
  put('📝', '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13l2 2 4-4"/>');
  put('📋', '<path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z"/><rect x="5" y="6" width="14" height="15" rx="2"/><path d="M9 11h6M9 15h6"/>');
  put('🔒', '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>');
  put('✏', '<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z"/><path d="M14 6l3 3"/>');
  put('✍', '<path d="M12 19l7-7a2.1 2.1 0 0 0-3-3l-7 7-1 4z"/><path d="M8 6a2 2 0 0 0-3 3"/>');
  put('🖊', '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h4"/>');
  put('📁', '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>');
  put('📈', '<path d="M4 20v-3M9 20V9M14 20v-6M19 20V5"/><path d="M3 20h18"/>');
  put('📇', '<path d="M4 16l5-5 4 3 6-7"/><path d="M14 7h5v5"/>');
  put('📄', '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>');
  put('📂', '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M8 5v15M12 9h5"/>');
  put('📍', '<path d="M12 21s-6-5.2-6-9.5A6 6 0 0 1 18 11.5c0 4.3-6 9.5-6 9.5z"/><circle cx="12" cy="10" r="2"/>');
  put('📜', '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 5v15M12 9h5M12 13h5"/>');
  put('💖', '<path d="M12 20.5S4 15 4 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15 12 20.5 12 20.5z"/>');
  put('⭐', '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z"/>');
  put('★', '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z"/>');
  put('☆', '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z"/>');
  put('✦', '<path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/>');
  put('🏆', '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8M10 21v-3h4v3"/>');
  put('🥈', '<path d="M8 21l4-6 4 6z"/><path d="M12 15V3"/><circle cx="12" cy="4.5" r="1.8"/>');
  put('🥉', '<path d="M8 21l4-6 4 6z"/><path d="M12 15V3"/><circle cx="12" cy="4.5" r="1.8"/>');

  /* đối tượng / công cụ */
  put('🎯', '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>');
  put('🔍', '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>');
  put('🔄', '<path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5"/><path d="M18 3v4h-4M6 21v-4h4"/>');
  put('🔀', '<path d="M4 7h4l10 10h2M18 4l4 3-4 3M4 17h4l2-3M18 4l4 3-4 3M18 20l4-3-4-3"/>');
  put('🧮', '<rect x="5" y="7" width="14" height="14" rx="2"/><path d="M9 7V5h6v2M9 12h6M9 16h4"/>');
  put('🧠', '<path d="M12 4a3 3 0 0 1 3 3c1.2 0 2.5.6 2.5 2.5 0 1.5-.8 2-1.5 2.3.6.3 1.5.9 1.5 2.2a2.6 2.6 0 0 1-3 2.5c-.6 1.2-1.7 1.5-2.5 1.5s-1.9-.3-2.5-1.5a2.6 2.6 0 0 1-3-2.5c0-1.3.9-1.9 1.5-2.2-.7-.3-1.5-.8-1.5-2.3C6.5 7.6 7.8 7 9 7a3 3 0 0 1 3-3z"/><path d="M12 4v16M9 10v6M15 10v6"/>');
  put('💬', '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 4v-4H6a2 2 0 0 1-2-2z"/>');
  put('👤', '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>');
  put('👥', '<circle cx="9" cy="9" r="3.2"/><circle cx="17" cy="10" r="2.6"/><path d="M3 19a6.5 6.5 0 0 1 12 0M14 19a5 5 0 0 1 7 0"/>');
  put('📅', '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"/>');
  put('📥', '<path d="M4 4h16v13H4z"/><path d="M4 9h16M12 13l-4-3h8z"/>');
  put('📱', '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>');
  put('💶', '<path d="M12 3v18M19 8a7 7 0 1 0 0 8"/><path d="M4 10h8M4 14h8"/>');
  put('💳', '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>');
  put('🔬', '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M10 12l2 2-2 2M14 12h.01"/>');
  put('🧭', '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16c2-4 2-12 0-16z"/>');
  put('⚙', '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>');
  put('🔗', '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>');
  put('🔊', '<path d="M4 9v6h4l6 5V4L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>');
  put('🎤', '<rect x="9" y="3" width="6" height="18" rx="3"/><path d="M12 21v-3"/>');
  put('📣', '<path d="M4 5h16v9H4z"/><path d="M8 14v4h8v-4M12 5v9"/><path d="M12 19v2"/>');
  put('🔛', '<path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 3v4h4"/>');
  put('🚪', '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 4v16"/><circle cx="7" cy="10" r="1.4"/><path d="M4 12h4M8 10h4"/>');
  put('🗺', '<path d="M4 9l8-5 8 5v11H4z"/><path d="M9 20v-6h6v6"/>');
  put('🏠', '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-6h5v6"/>');
  put('🏢', '<path d="M4 21V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16"/><path d="M16 21V9h4v12M3 21h18M8 8h4M8 12h4M8 16h4M13 8h1M13 12h1M13 16h1"/>');
  put('🏛', '<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>');
  put('🎈', '<path d="M4 19a9 9 0 0 1 16 0"/><path d="M12 6v4M10 8h4"/><path d="M8 21h8"/><path d="M2 21h20"/>');
  put('🎓', '<path d="M12 4v10M8 21h8M5 9h14v4a7 7 0 0 1-14 0z"/>');
  put('🏃', '<circle cx="12" cy="4.5" r="2"/><path d="M12 6.5v6M12 12.5l4 4M12 12.5L9 17M9 12l-3 1M14 8l3-1"/>');
  put('🍁', '<path d="M12 21s-6-4.5-6-9a6 6 0 0 1 12 0c0 4.5-6 9-6 9z"/><path d="M12 12v6M12 6l1.5 2h-3z"/>');
  put('🚀', '<path d="M4 4h16v13H4z"/><path d="M4 9h16M12 13l-4-3h8z"/>');
  put('🔥', '<path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-1.5.8-3 2-4-.2 1.5.3 3 2 3.5C10.5 8 11 5 12 3z"/>');
  put('🔫', '<path d="M9 3h6v4l6 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5l6-6z"/>');
  put('🛡', '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/>');
  put('⚔', '<path d="M6 3v8l4 4-4 6M18 3v8l-4 4 4 6M6 6h12"/>');
  put('💀', '<circle cx="12" cy="12" r="8.5"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/><path d="M12 12l-2-2M12 12l2-2"/>');
  put('♻', '<path d="M5 8a7 7 0 0 1 12-3M19 16a7 7 0 0 1-12 3"/><path d="M18 3v4h-4M6 21v-4h4"/>');
  put('🧿', '<rect x="5" y="7" width="14" height="12" rx="2"/><path d="M9 7V5h6v2M9 12h6M9 16h6M5 12h14"/>');
  put('🦠', '<path d="M4 7h5l3 10h4l3-6h2M12 7h2M14 5h3"/>');
  put('🧬', '<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M12 7v12M8 7v12M16 7v12M4 11h16M4 15h16"/>');
  put('🗜', '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M8 13l3-3 3 3 3-3"/>');
  put('📐', '<rect x="4" y="6" width="16" height="15" rx="2"/><path d="M8 6V3h8v3M8 12h5M8 16h7"/>');
  put('🎲', '<rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="8" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="16" cy="12" r="1.2"/>');
  put('🎃', '<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M12 6V4M12 10l1.5 2h-3z"/>');
  put('📶', '<circle cx="12" cy="12" r="8"/><path d="M12 12l6-6M4 20l5-5"/>');
  put('🔖', '<path d="M12 3v6M12 21v-4"/>');

  /* bổ sung phủ toàn bộ emoji dự án */
  put('📊', '<path d="M4 20V6M4 20h17"/><path d="M8 16v-5M13 16V8M18 16v-3"/>');
  put('💡', '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.6 1.4 1.6 2.2h4c0-.8.9-1.7 1.6-2.2A6 6 0 0 0 12 3z"/>');
  put('⏳', '<path d="M6 3h12M6 21h12M7 3c0 4 3 5 5 9 2-4 5-5 5-9M7 21c0-4 3-5 5-9 2 4 5 5 5 9"/>');
  put('🧊', '<path d="M12 3v18M6 6l12 12M18 6L6 18M4 12h16M12 12l4-4M12 12l-4-4M12 12l4 4M12 12l-4 4"/>');
  put('📦', '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>');
  put('🗓', '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"/>');
  put('⚖', '<path d="M12 3v18M8 21h8M6 8h12l-3 4a3.5 3.5 0 0 1-6 0z"/><path d="M6 8l2 1M18 8l-2 1"/>');
  put('⏰', '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>');
  put('🧼', '<rect x="5" y="9" width="14" height="11" rx="2"/><path d="M9 9V7a3 3 0 0 1 6 0v2M9 13h6M9 16h4"/>');
  put('🥚', '<path d="M12 3c-3 0-6 4.5-6 9a6 6 0 0 0 12 0c0-4.5-3-9-6-9z"/>');
  put('🍎', '<circle cx="12" cy="13" r="7"/><path d="M12 6c-1-2-4-2-4 0M12 6v-2M10 6c0 1 1 1 2 1"/>');
  put('🛎', '<path d="M12 3a6 6 0 0 0-6 6c0 4-1.5 5-1.5 7h15C19.5 14 18 13 18 9a6 6 0 0 0-6-6z"/><path d="M10 20a2 2 0 0 0 4 0"/>');
  put('🦺', '<path d="M4 8l5-4 3 1 3-1 5 4-2 11H6z"/><path d="M9 4v16M15 4v16M6 10h12"/>');
  put('🧹', '<path d="M4 20L17 7a2.1 2.1 0 0 0-3-3L6 13z"/><path d="M13 8l3 3M10 11l3 3M7 14l3 3"/>');
  put('📌', '<path d="M12 21s-6-5.2-6-9.5A6 6 0 0 1 18 11.5c0 4.3-6 9.5-6 9.5z"/><circle cx="12" cy="10" r="2"/>');
  put('📑', '<path d="M9 3h6a1 1 0 0 1 1 1v17l-4-2-4 2V4a1 1 0 0 1 1-1z"/>');
  put('👉', '<path d="M4 12h14M13 6l6 6-6 6"/>');
  put('📘', '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 4v16M12 8h4"/>');
  put('📗', '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 4v16M12 8h4"/>');
  put('📙', '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 4v16M12 8h4"/>');
  put('📚', '<path d="M4 8h16v13H4z"/><path d="M4 11h16M6 8V5h12v3"/>');
  put('📖', '<path d="M12 5a6 6 0 0 0-6-2H3v16h3a6 6 0 0 1 6 2 6 6 0 0 1 6-2h3V3h-3a6 6 0 0 0-6 2z"/><path d="M12 5v16"/>');
  put('🍀', '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M12 4v16M4 12h16M10 4l2 2 2-2M20 10l-2 2 2 2M4 10l2 2-2 2M14 20l-2-2-2 2"/>');
  put('➤', '<path d="M4 12h14M13 6l6 6-6 6"/>');
  put('➡', '<path d="M4 12h14M13 6l6 6-6 6"/>');
  put('➜', '<path d="M4 12h14M13 6l6 6-6 6"/>');
  put('➔', '<path d="M4 12h14M13 6l6 6-6 6"/>');
  put('🛢', '<path d="M5 5h14v10a5 5 0 0 1-14 0z"/><path d="M5 5c3 1.5 11 1.5 14 0M5 12c3 1.5 11 1.5 14 0"/><path d="M8 3h8"/>');
  put('❗', '<path d="M12 3v14M12 20h.01"/>');
  put('😊', '<circle cx="12" cy="12" r="9"/><path d="M8 14c1.2 1.5 2.5 2.2 4 2.2s2.8-.7 4-2.2"/><circle cx="9" cy="9.5" r="1"/><circle cx="15" cy="9.5" r="1"/>');
  put('☐', '<rect x="4" y="4" width="16" height="16" rx="2"/>');
  put('☒', '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9l6 6M15 9l-6 6"/>');
  put('☑', '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 12.5l2.8 2.8L16 9.5"/>');
  put('🆕', '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M12 9l1.2 2.8L16 13l-2.8 1.2L12 17l-1.2-2.8L8 13l2.8-1.2z"/>');
  put('☀', '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>');
  put('🛑', '<rect x="4" y="4" width="16" height="16" rx="4" transform="rotate(45 12 12)"/>');
  put('🥪', '<path d="M4 13h16v4H4z"/><path d="M4 13l2-4h12l2 4"/><path d="M6 15h12M4 17v2h16v-2"/>');
  put('💧', '<path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3z"/>');
  put('🧃', '<path d="M5 7h10v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M15 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/>');
  put('🥤', '<path d="M5 7h10v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M15 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/>');
  put('🍺', '<path d="M5 7h10v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M15 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/>');
  put('🍷', '<path d="M9 3v7a3 3 0 0 0 6 0V3z"/><path d="M9 3h6M12 10v8M9 21h6"/>');
  put('☕', '<path d="M5 7h10v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M15 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/>');
  put('🌍', '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17"/>');
  put('🌐', '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17"/>');
  put('♨', '<path d="M8 5c-1 2 1 2 0 4M12 5c-1 2 1 2 0 4M16 5c-1 2 1 2 0 4"/><path d="M8 15c-1 2 1 2 0 4M12 15c-1 2 1 2 0 4M16 15c-1 2 1 2 0 4"/>');
  put('🍫', '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 3v18M14 3v18M4 8h16M4 13h16M4 18h16"/>');
  put('🍃', '<path d="M5 19C5 9 12 4 20 4c0 8-5 15-15 15z"/><path d="M5 19c3-5 7-8 11-10"/>');
  put('📏', '<rect x="3" y="10" width="18" height="5" rx="1"/><path d="M7 10v3M10 10v3M13 10v3M16 10v3"/>');
  put('🏷', '<path d="M3 11V4h7l11 11-7 7z"/><circle cx="7.5" cy="7.5" r="1.5"/>');
  put('⏱', '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6M12 2v3"/>');
  put('🏨', '<path d="M4 21V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16"/><path d="M16 21V9h4v12M3 21h18M8 8h4M8 12h4M8 16h4M13 8h1M13 12h1M13 16h1"/>');
  put('💻', '<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 20h20M8 16v2h8v-2"/>');
  put('🎨', '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5c-3.5 0-6.5 3-6.5 6.5 0 2.5 2 3.5 3.5 3.5h1c1 0 1.5.5 1.5 1.5 0 1 1 1.5 1.5 1.5s2 .5 2 2c0 1.5-1 2.5-3 3"/><circle cx="8" cy="9" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16" cy="10" r="1"/>');
  put('🔺', '<path d="M12 4l9 16H3z"/>');
  put('✈', '<path d="M3 11l18-7-7 18-2-8z"/><path d="M12 14l6-6"/>');
  put('📻', '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M7 3l8 4M7 12h10M7 16h10M8 18h.01"/>');
  put('🕊', '<path d="M5 12c0-4 3-7 7-7 4 0 7 3 7 7v4l-3-2c-1 2-3 3-5 2l-4 1z"/><path d="M12 5v8M9 16l-1 3M14 17l2 3"/>');
  put('🚫', '<circle cx="12" cy="12" r="9"/><path d="M5.5 5.5l13 13"/>');
  put('💰', '<rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10h.01M18 14h.01"/>');
  put('🐖', '<circle cx="12" cy="13" r="7"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/><ellipse cx="12" cy="14" rx="1.5" ry="1.2"/><path d="M7 9l-2 1M17 9l2 1"/>');
  put('🃏', '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 8l2 3-2 3-2-3z"/>');
  put('🔤', '<rect x="3" y="5" width="18" height="14" rx="2"/><text x="12" y="17" text-anchor="middle" font-size="12" fill="currentColor" stroke="none" font-family="inherit">Aa</text>');
  put('🎉', '<path d="M4 20l4-12 4 12z"/><circle cx="12" cy="8" r="2"/><path d="M17 4l.5 1.5L19 6l-1.5.5L17 8l-.5-1.5L15 6l1.5-.5zM19 14l.5 1.5L21 16l-1.5.5L19 18l-.5-1.5L17 16l1.5-.5z"/>');
  put('🧯', '<path d="M7 7h10l3 14H4z"/><path d="M7 7l-2 4h16l-2-4M12 7V4M10 4h4"/>');
  put('🙂', '<circle cx="12" cy="12" r="9"/><path d="M8 14c1.2 1.5 2.5 2.2 4 2.2s2.8-.7 4-2.2"/><circle cx="9" cy="9.5" r="1"/><circle cx="15" cy="9.5" r="1"/>');
  put('❤', '<path d="M12 20.5S4 15 4 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15 12 20.5 12 20.5z"/>');
  put('☁', '<path d="M6 18a4 4 0 0 1-1-7.9A5.5 5.5 0 0 1 15 8a4.5 4.5 0 0 1 2 8.5z"/>');
  put('👋', '<path d="M5 12l3-4 3 3-3 4-3-3z"/><path d="M11 11l3-4 3 3-3 4-3-3z"/>');
  put('🐢', '<circle cx="12" cy="14" r="7"/><path d="M7 7l3 4M17 7l-3 4M12 5v2M8 21h8"/>');
  put('🗣', '<path d="M3 9v6h4l6 5V4L7 9z"/>');
  put('😅', '<circle cx="12" cy="12" r="9"/><path d="M8 14c1.2 1.5 2.5 2.2 4 2.2s2.8-.7 4-2.2"/><circle cx="9" cy="9.5" r="1"/><circle cx="15" cy="9.5" r="1"/><path d="M17 5l1 2"/>');
  put('⬆', '<path d="M12 19V5M6 11l6-6 6 6"/>');
  put('🔑', '<circle cx="8" cy="16" r="4.5"/><path d="M11 13l8-8M15 9l3 3M17 7l2 2"/>');
  put('🗂', '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>');
  put('🍇', '<circle cx="9" cy="16" r="2.5"/><circle cx="15" cy="16" r="2.5"/><circle cx="9" cy="11" r="2.5"/><circle cx="15" cy="11" r="2.5"/><circle cx="12" cy="6" r="2.5"/><path d="M12 4v3M9 8.5l-1-1M15 8.5l1-1"/>');
  put('🧑', '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>');
  put('🧑‍', '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>');

  /* món ăn */
  put('🍳', '<path d="M7 13a5 5 0 0 0 10 0V8H7z"/><path d="M17 8h4"/><path d="M9 17v2M12 17v2M15 17v2"/>');
  put('🍽', '<path d="M7 3v18M17 3v18M7 7h10M7 11h10M7 15h10M7 21h10"/>');
  put('🥩', '<path d="M6 14a8 8 0 0 1 14-3c-2 0-3 1-3 3H6z"/><path d="M6 14a5 5 0 0 1 7 4"/><path d="M13 21h4"/>');
  put('🧪', '<path d="M12 13a6.5 6.5 0 0 0-6.5-6.5c0 4.5 2 6.5 6.5 6.5zM12 13a6.5 6.5 0 0 1 6.5-6.5c0 4.5-2 6.5-6.5 6.5z"/><path d="M12 13v8M9 21h6"/>');
  put('🥔', '<path d="M7 21c-2 0-3-1.5-3-3.5C4 14 6 13 6 13s2 0 3 1l-1-4c1-1 3-1 4 0 0 0-1-3 1-4.5 2 1 2 4 1 6 .8-.5 2-.3 2.5 1 1.5 2 0 4-2 4.5z"/>');
  put('🐟', '<path d="M3 12c3-3 6-5 9-5s6 2 9 5c-3 3-6 5-9 5s-6-2-9-5z"/><path d="M12 12l5-4M12 12l4 4"/>');
  put('🥛', '<path d="M8 4h8l3 4-8 12L3 8z"/><path d="M3 8h18M9 4l3 4 3-4"/>');
  put('🌽', '<path d="M12 3v12M8 15a4 4 0 0 0 8 0z"/><path d="M9 21h6M6 6h12M7 9h10M8 12h8"/>');
  put('🍚', '<path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 10c0-3 3-5 8-5s8 2 8 5M12 5v5M9 14l3 3 3-3"/>');
  put('🍞', '<path d="M5 12c0-4 3-7 7-7s7 3 7 7c0 2-.5 3-1 4H6c-.5-1-1-2-1-4z"/><path d="M8 16v5M16 16v5M6 20h12"/>');
  put('🍏', '<circle cx="12" cy="13" r="7"/><path d="M12 6c-2-1.5-5-1-5 1 0 1.5 1.5 2 3 2.5M15 12c-1-2-3-2-4-1"/>');
  put('🥧', '<path d="M3 12h18l-2 7H5z"/><path d="M9 12l2-7M15 12l-2-7M7 19l-1 2M17 19l1 2"/>');
  put('🥦', '<circle cx="12" cy="13" r="8"/><path d="M12 5c-1-2-4-2-4 0 0 2 3 2 4 4 1-2 4-2 4-4 0-2-3-2-4 0z"/>');
  put('🥗', '<path d="M5 20c2-1 4-1 6 0s4 1 6 0M5 12c2-1 4-1 6 0s4 1 6 0M5 16c2-1 4-1 6 0s4 1 6 0M6 8l6 4 6-4-2-2H8z"/>');
  put('🫘', '<path d="M7 12a5 5 0 0 1 10 0c0 4-2 7-5 7s-5-3-5-7z"/><path d="M12 5v3M9 19l1 2M15 19l-1 2"/>');
  put('🌾', '<path d="M6 4h12v3H6zM9 7v4M15 7v4M7 11h10l-1 9H8z"/>');
  put('🌿', '<path d="M7 20V8l5 5 5-5v12M12 13v7"/>');
  put('🌱', '<path d="M12 20V9M12 9C10 7 9 5 10 3c2 0 2 2 2 3M8 20h8M12 20v-3"/>');

  /* động vật / sinh học */
  put('🐄', '<path d="M5 17c-1-1-1-3 1-4 2-1 5-1 8 0M19 17c1-1 1-3-1-4"/><path d="M6 13l-2 4M18 13l2 4"/><path d="M8 9a4 4 0 0 1 8 0M9 8l-2-2M15 8l2-2"/><path d="M10 14l-2 3M14 14l2 3"/>');
  put('🐮', '<path d="M8 18c-2 0-3-1-3-3 0-2 2-3 4-3 3 0 6 1 6 4 0 1-1 2-3 2z"/><path d="M12 12v-2a3 3 0 0 1 6 0v1M18 10h2a1 1 0 0 1 1 1v2c0 1-.5 2-1 2"/><circle cx="9" cy="9" r="1"/><circle cx="14" cy="8" r="1"/><path d="M8 18l-1 3M16 18l1 3"/>');
  put('🐑', '<path d="M12 4v14M12 4c-1-2-4-2-4 0s3 2 4 4c1-2 4-2 4 0s-3-2-4-4z"/><path d="M7 18c-2 0-3 1-3 3M17 18c2 0 3 1 3 3M9 18l-1 3M15 18l1 3M12 10c-2 0-4 2-4 4 0 2 2 3 4 3s4-1 4-3c0-2-2-4-4-4z"/>');
  put('🐔', '<path d="M10 6c-2 0-3 2-3 4 0 3 2 5 5 5h4l-2 3M15 10l3-3M11 10c-1-1-1-2 0-3"/>');
  put('🦠', '<circle cx="12" cy="12" r="8"/><path d="M12 4a5 5 0 0 1 5 5c0 2-1 3-2 4M8 8l8 8M12 12l4 4M8 12l8 8"/>');
  put('🧬', '<path d="M6 3c3 3 5 8 5 14h2c0-6 2-11 5-14"/><path d="M8 3v0M16 3v0M8 6h0M16 6h0"/>');
  put('🪒', '<path d="M12 4v7l-5 9M12 11l5 9M12 4v7M12 21v0"/>');

  /* màu: chấm & ô */
  M['🟡'] = dot('#eab308');
  M['🟢'] = dot('#22c55e');
  M['🔵'] = dot('#3b82f6');
  M['🔴'] = dot('#ef4444');
  M['⚪'] = dot('#f1f5f9');
  M['🟤'] = dot('#a16207');
  M['🔹'] = dot('#3b82f6');
  M['⬜'] = s('<rect x="4" y="4" width="16" height="16" rx="2"/>');
  M['⬛'] = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" stroke="none"/></svg>';

  /* số tròn */
  M['❶'] = num('1');
  M['❷'] = num('2');
  M['❸'] = num('3');

  /* khuôn mặt (feedback) */
  put('😁', '<circle cx="12" cy="12" r="9"/><path d="M8 14c1.2 1.5 2.5 2.2 4 2.2s2.8-.7 4-2.2"/><circle cx="9" cy="9.5" r="1"/><circle cx="15" cy="9.5" r="1"/>');
  put('😕', '<circle cx="12" cy="12" r="9"/><path d="M8 15c1.2-.8 2.5-1.2 4-1.2s2.8.4 4 1.2"/><circle cx="9" cy="9.5" r="1"/><circle cx="15" cy="9.5" r="1"/>');
  put('😤', '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 1-3 1M16 12l-3 1 3 1"/><path d="M8 9.5c1-.5 2-.5 3 0M16 9.5c-1-.5-2-.5-3 0"/>');
  put('👍', '<path d="M4 10v8M8 10v8M8 10V6a2 2 0 0 1 4 0v4M12 10h5a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2M15 15l-3 3h-2"/>');
  put('🤝', '<path d="M5 10v7M5 10l2-4M5 10l3 3M16 10l-3 3M19 10v7M19 10l-2-4M19 10l-3 3M8 14l3 4h2l3-4"/>');

  /* cờ: KHÔNG đưa vào map — giữ nguyên emoji */

  /* ---------- xây regex từ khóa (dài nhất trước) ---------- */
  var keys = Object.keys(M).sort(function (a, b) { return b.length - a.length; });
  var escaped = keys.map(function (k) {
    return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  });
  var RE = new RegExp('(' + escaped.join('|') + ')', 'g');

  /* ---------- màu theo nhóm ý nghĩa ---------- */
  var COLOR_GROUPS = [
    ['e-green', '✅✔✓☑🌍🌐🌱🌽🌾🌿🍀🍁🍃💰💳💶🟢♻📈📊'],
    ['e-red', '❌✕✗☒🔴🚫🛑🔥🧯'],
    ['e-amber', '⚠❗☀⭐★☆✦🏆🥈🥉🎉🎓🎃🏷🛎🛢📦🦺🗜🔺'],
    ['e-orange', '🍳🍽🥩🥔🥛🍚🍞🍏🥧🥦🥗🥚🥤🧃☕🍫🍷🍺🥪🍇🍎🫘♨'],
    ['e-blue', '❓📝📋✏✍🖊📁📄📂📜📑📖📗📘📙📚📇🗂🔖📅🗓⏰⏱⏳🔍🔒🔑🔗🔄🔀🔤📶🆕💬📣📥📏📐📱💻👤👥🧑🧑‍👉👋👍🤝🗣🧠🚪✈🚀🏠🏢🏨🏛🗺📍📌🧿'],
    ['e-violet', '🎨🎲🃏📻⚖'],
    ['e-teal', '🐄🐑🐔🐖🐟🐢🐮🕊🧭🛡🔬🧪🧬🦠🪒'],
    ['e-pink', '💖❤'],
    ['e-slate', '☐☁🧊💧⚙⚔💀']
  ];
  function iconClass(key) {
    var ch = key.charAt(0);
    for (var i = 0; i < COLOR_GROUPS.length; i++) {
      if (COLOR_GROUPS[i][1].indexOf(ch) !== -1) return COLOR_GROUPS[i][0];
    }
    return '';
  }

  /* ---------- thay thế emoji trong một text node ---------- */
  function processText(node) {
    var text = node.nodeValue;
    if (!text || text.indexOf('️') !== -1) text = text.replace(/️/g, '');
    if (!text || !RE.test(text)) { RE.lastIndex = 0; return false; }
    RE.lastIndex = 0;
    var frag = document.createDocumentFragment();
    var last = 0;
    var m;
    while ((m = RE.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      var key = m[0];
      var html = M[key];
      if (html) {
        var span = document.createElement('span');
        span.className = 'emoji-ic' + (iconClass(key) ? ' ' + iconClass(key) : '');
        span.setAttribute('data-emoji', '1');
        span.innerHTML = html;
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(key));
      }
      last = m.index + key.length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
    RE.lastIndex = 0;
    return true;
  }

  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, SVG: 1 };

  function processNode(node) {
    if (node.nodeType === 3) {
      if (!node.parentNode || SKIP_TAGS[node.parentNode.tagName]) return;
      if (node.parentNode.hasAttribute && node.parentNode.hasAttribute('data-emoji')) return;
      processText(node);
      return;
    }
    if (node.nodeType !== 1) return;
    if (SKIP_TAGS[node.tagName]) return;
    if (node.hasAttribute && node.hasAttribute('data-emoji')) return;
    var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    var textNodes = [];
    var n;
    while ((n = walker.nextNode())) textNodes.push(n);
    for (var i = 0; i < textNodes.length; i++) {
      n = textNodes[i];
      if (!n.parentNode || SKIP_TAGS[n.parentNode.tagName]) continue;
      if (n.parentNode.hasAttribute && n.parentNode.hasAttribute('data-emoji')) continue;
      processText(n);
    }
  }

  function processRoot(root) {
    if (!root) return;
    var tree = root.nodeType === 9 ? root.body : root;
    if (!tree) return;
    processNode(tree);
  }

  /* ---------- CSS ---------- */
  var style = document.createElement('style');
  style.textContent =
    '.emoji-ic{display:inline-flex;align-items:center;justify-content:center;' +
    'width:1em;height:1em;flex-shrink:0;vertical-align:-0.15em;line-height:1}' +
    '.emoji-ic svg{width:1em;height:1em;display:block;color:inherit}' +
    '.emoji-ic.e-green{color:#16a34a}' +
    '.emoji-ic.e-red{color:#dc2626}' +
    '.emoji-ic.e-amber{color:#d97706}' +
    '.emoji-ic.e-orange{color:#ea580c}' +
    '.emoji-ic.e-blue{color:#2563eb}' +
    '.emoji-ic.e-violet{color:#7c3aed}' +
    '.emoji-ic.e-teal{color:#0d9488}' +
    '.emoji-ic.e-pink{color:#db2777}' +
    '.emoji-ic.e-slate{color:#475569}' +
    '.tile .emoji-ic.e-green,.tile .emoji-ic.e-red,.tile .emoji-ic.e-amber,' +
    '.tile .emoji-ic.e-orange,.tile .emoji-ic.e-blue,.tile .emoji-ic.e-violet,' +
    '.tile .emoji-ic.e-teal,.tile .emoji-ic.e-pink,.tile .emoji-ic.e-slate{color:var(--tile-accent,var(--accent))}' +
    '.tile .emoji-ic svg,.subject-card .emoji-ic svg{color:inherit}';
  (document.head || document.documentElement).appendChild(style);

  /* ---------- khởi động ---------- */
  function start() {
    if (document.body) processRoot(document.body);
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        if (!added || !added.length) continue;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.nodeType === 1 || node.nodeType === 3) processNode(node);
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
