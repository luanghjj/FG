/* ============================================================
 * AzubiHub Anti-Theft & Content Integrity Guard (anti-theft.js)
 * ------------------------------------------------------------
 * Bản quyền: Nguyễn Chí Linh (nguyenmisa333@gmail.com)
 * Kênh chính thức: WhatsApp +49 176 76640277 (017676640277)
 * ------------------------------------------------------------
 * Tính năng:
 * 1. Domain Lock: Chống clone mang sang domain lậu/giả mạo
 * 2. Content Guard: Chống bôi đen, copy, chuột phải, phím tắt F12/Ctrl+U/Ctrl+S/Ctrl+P
 * 3. DevTools Warning: Cảnh báo khi đối thủ mở inspect bóc tách code
 * 4. Digital Canary Watermark: Chữ ký số ẩn định danh bản quyền
 * ============================================================ */
(function () {
  'use strict';

  var AUTHOR_NAME = 'Nguyễn Chí Linh';
  var OFFICIAL_PHONE = '017676640277';
  var OFFICIAL_WA = 'https://wa.me/4917676640277';
  var CANARY_SIGNATURE = 'AZUBIHUB-PROTECTED-BY-NGUYEN-CHI-LINH-017676640277';

  // 1. CHÈN WATERMARK BẢN QUYỀN ẨN VÀO META VÀ DOM
  try {
    var metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.name = 'author';
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.content = AUTHOR_NAME + ' (nguyenmisa333@gmail.com) - WhatsApp: +' + OFFICIAL_PHONE;

    var canaryMeta = document.createElement('meta');
    canaryMeta.name = 'azubihub-signature';
    canaryMeta.content = CANARY_SIGNATURE;
    document.head.appendChild(canaryMeta);
  } catch (_) {}

  // 2. DOMAIN LOCK (CHỐNG CLONE / GIẢ MẠO TÊN MIỀN)
  function checkDomainIntegrity() {
    var host = (window.location.hostname || '').toLowerCase();
    var proto = (window.location.protocol || '').toLowerCase();

    // Bỏ qua khi xem local file hoặc localhost test
    if (proto === 'file:' || host === 'localhost' || host === '127.0.0.1' || host === '::1' || host.indexOf('192.168.') === 0) {
      return true;
    }

    // Danh sách các tên miền hợp lệ được phép chạy
    var isAllowed =
      host.indexOf('.github.io') !== -1 ||
      host.indexOf('.vercel.app') !== -1 ||
      host.indexOf('.netlify.app') !== -1 ||
      host.indexOf('azubihub') !== -1 ||
      host.indexOf('horami') !== -1 ||
      host.indexOf('omoi') !== -1;

    // Cho phép mở khóa tạm qua tham số URL khi admin kiểm tra (ví dụ: ?preview_auth=linh2026)
    var urlParams = new URLSearchParams(window.location.search || '');
    if (urlParams.get('preview_auth') === 'linh2026') {
      return true;
    }

    if (!isAllowed) {
      lockdownFakeSite(host);
      return false;
    }
    return true;
  }

  function lockdownFakeSite(badHost) {
    try {
      window.stop && window.stop();
    } catch (_) {}

    var overlay = document.createElement('div');
    overlay.id = 'azubihubFakeLock';
    overlay.setAttribute(
      'style',
      'position:fixed;inset:0;z-index:9999999;background:#E2D8C2;color:#0F172A;' +
        'display:flex;align-items:center;justify-content:center;padding:20px;' +
        'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;'
    );

    var shieldIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px;margin-bottom:16px;color:#9A4607">' +
      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' +
      '<line x1="12" y1="8" x2="12" y2="12"/>' +
      '<line x1="12" y1="16" x2="12.01" y2="16"/>' +
      '</svg>';

    overlay.innerHTML =
      '<div style="max-width:480px;width:100%;background:#FDFBF6;border:2px solid #B5A27C;border-radius:16px;' +
      'padding:32px 24px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.15)">' +
      shieldIcon +
      '<h2 style="margin:0 0 8px;font-size:1.35em;color:#9A4607;font-weight:700">CẢNH BÁO: BẢN SAO GIẢ MẠO</h2>' +
      '<p style="margin:0 0 16px;font-size:0.9em;color:#5A5344;line-height:1.6">' +
      'Trang web tại tên miền <code>' + escapeHtml(badHost) + '</code> là bản sao chép trái phép nội dung và đề thi của hệ sinh thái <b>AzubiHub</b>.' +
      '</p>' +
      '<div style="background:#FDF3E3;border:1px solid #B45309;border-radius:10px;padding:12px;margin-bottom:20px;font-size:0.86em;color:#0F172A;line-height:1.5">' +
      'Toàn bộ tài liệu, đề thi và câu hỏi thuộc bản quyền tác giả <b>' + AUTHOR_NAME + '</b>.<br>' +
      'Mọi giao dịch hoặc tài khoản trên trang web này không được bảo hộ.' +
      '</div>' +
      '<a href="' + OFFICIAL_WA + '" target="_blank" rel="noopener noreferrer" ' +
      'style="display:block;background:#9A4607;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600;font-size:0.92em;margin-bottom:10px">' +
      'Báo cáo qua WhatsApp: ' + OFFICIAL_PHONE + '</a>' +
      '<p style="margin:0;font-size:0.78em;color:#5A5344">Vui lòng truy cập từ liên kết chính thức do tác giả cung cấp.</p>' +
      '</div>';

    document.addEventListener('DOMContentLoaded', function () {
      document.body.innerHTML = '';
      document.body.appendChild(overlay);
    });
    if (document.body) {
      document.body.innerHTML = '';
      document.body.appendChild(overlay);
    }
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // 3. TOAST CẢNH BÁO KHI CỐ TÌNH COPY HOẶC BẬT F12
  var _lastToastTime = 0;
  function showCopyWarning(msg) {
    var now = Date.now();
    if (now - _lastToastTime < 2500) return;
    _lastToastTime = now;

    if (typeof window.toast === 'function') {
      window.toast(msg || 'Nội dung thuộc bản quyền AzubiHub. Vui lòng không sao chép trái phép!', 'bad');
      return;
    }

    var t = document.getElementById('azubihubGuardToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'azubihubGuardToast';
      t.setAttribute(
        'style',
        'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:999999;' +
          'background:#FDF3E3;color:#9A4607;border:1px solid #B45309;padding:10px 18px;border-radius:10px;' +
          'font-size:0.86em;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,.15);' +
          'pointer-events:none;transition:opacity .3s ease;text-align:center;max-width:90%'
      );
      document.body.appendChild(t);
    }
    t.textContent = msg || 'Nội dung thuộc bản quyền AzubiHub. Vui lòng không sao chép trái phép!';
    t.style.opacity = '1';
    setTimeout(function () {
      t.style.opacity = '0';
    }, 2400);
  }

  // 4. CHỐNG CHUỘT PHẢI & PHÍM TẮT TRỘM NỘI DUNG
  function initContentProtection() {
    // Chặn chuột phải (contextmenu), ngoại trừ khi thao tác trên ô input / textarea
    document.addEventListener('contextmenu', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
        return; // Cho phép chuột phải trong ô gõ chữ
      }
      e.preventDefault();
      showCopyWarning('Nội dung bài học được bảo vệ bản quyền.');
    });

    // Chặn các tổ hợp phím sao chép, lưu trang, xem mã nguồn, inspect
    document.addEventListener('keydown', function (e) {
      var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      var cmdKey = isMac ? e.metaKey : e.ctrlKey;
      var key = (e.key || '').toLowerCase();
      var tag = (document.activeElement && document.activeElement.tagName ? document.activeElement.tagName : '').toLowerCase();
      var isInput = tag === 'input' || tag === 'textarea' || (document.activeElement && document.activeElement.isContentEditable);

      // F12 -> Mở DevTools
      if (e.key === 'F12') {
        e.preventDefault();
        showCopyWarning('Công cụ lập trình viên bị tắt để bảo vệ đề thi.');
        return;
      }

      // Ctrl/Cmd + Shift + I/J/C -> Mở DevTools
      if (cmdKey && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
        e.preventDefault();
        showCopyWarning('Công cụ kiểm tra mã nguồn bị tắt.');
        return;
      }

      // Ctrl/Cmd + U -> Xem mã nguồn trang (View Source)
      if (cmdKey && key === 'u') {
        e.preventDefault();
        showCopyWarning('Xem mã nguồn trang đã bị tắt.');
        return;
      }

      // Ctrl/Cmd + S -> Lưu toàn bộ trang HTML về máy
      if (cmdKey && key === 's') {
        e.preventDefault();
        showCopyWarning('Tải trang về máy đã bị chặn.');
        return;
      }

      // Ctrl/Cmd + P -> In hoặc xuất PDF hàng loạt
      if (cmdKey && key === 'p') {
        e.preventDefault();
        showCopyWarning('In tài liệu trực tiếp đã bị tắt để bảo vệ đề thi.');
        return;
      }

      // Ctrl/Cmd + C -> Sao chép nội dung bài học
      if (cmdKey && key === 'c') {
        if (!isInput) {
          // Kiểm tra xem có đang chọn chữ trong bài học không
          var selection = window.getSelection ? window.getSelection().toString() : '';
          if (selection && selection.length > 5) {
            e.preventDefault();
            showCopyWarning('Vui lòng không sao chép nội dung bài học ra ngoài.');
          }
        }
      }
    });

    // Tự động chèn CSS chống bôi đen văn bản hàng loạt
    var style = document.createElement('style');
    style.id = 'azubihubContentGuardStyles';
    style.innerHTML =
      'body, .themen-detail, .lesson-card, .quiz-card, .fc-card, .content-box, .subject-card {' +
      '  -webkit-user-select: none;' +
      '  -moz-user-select: none;' +
      '  -ms-user-select: none;' +
      '  user-select: none;' +
      '}' +
      'input, textarea, [contenteditable="true"], .selectable {' +
      '  -webkit-user-select: text !important;' +
      '  -moz-user-select: text !important;' +
      '  -ms-user-select: text !important;' +
      '  user-select: text !important;' +
      '}';
    document.head.appendChild(style);
  }

  // 5. PHÁT HIỆN MỞ DEVTOOLS BẰNG OBJECT GETTER TRAP
  function initDevToolsTrap() {
    var isDevOpen = false;
    var trap = new Image();
    Object.defineProperty(trap, 'id', {
      get: function () {
        if (!isDevOpen) {
          isDevOpen = true;
          // Chỉ cảnh báo nếu không phải tài khoản Admin
          var isAdmin = false;
          try {
            isAdmin = localStorage.getItem('learn_admin_ok') === 'true';
          } catch (_) {}

          if (!isAdmin) {
            console.clear();
            console.warn(
              '%c⚠️ BẢN QUYỀN NGUYỄN CHÍ LINH - AZUBIHUB\n%cMọi hành vi trích xuất hoặc sao chép đề thi/tài liệu sẽ được ghi nhận và truy cứu trách nhiệm.',
              'font-size:16px;font-weight:bold;color:#9A4607;',
              'font-size:12px;color:#5A5344;'
            );
          }
        }
        return 'azubihub-trap';
      }
    });

    // Kích hoạt bẫy định kỳ mỗi 4 giây
    setInterval(function () {
      isDevOpen = false;
      try {
        console.dir(trap);
      } catch (_) {}
    }, 4000);
  }

  // KHỞI CHẠY BẢO VỆ
  var ok = checkDomainIntegrity();
  if (ok) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        initContentProtection();
        initDevToolsTrap();
      });
    } else {
      initContentProtection();
      initDevToolsTrap();
    }
  }
})();
