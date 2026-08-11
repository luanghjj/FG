/* ============================================================
 * guard.js — Zugriffsschutz für einzelne HTML-Seiten
 * ------------------------------------------------------------
 * In Prüfungs-/Lösungsseiten einbinden (NACH supabase.js + access.js):
 *
 *   <script src="./supabase.js?v=13"></script>
 *   <script src="./access.js?v=1"></script>
 *   <script src="./guard.js?v=1" data-need="pruefungen"></script>
 *
 * data-need = Feature-Key aus dem Access-Manifest (Standard: "pruefungen").
 * Fehlt die Stufe, wird die Seite überdeckt und zurück zur App geleitet.
 *
 * Khoá mềm: chỉ kiểm ở client. Đủ cho lớp học, không chống devtools.
 * ============================================================ */
(function () {
  'use strict';

  var self = document.currentScript;
  var NEED = (self && self.getAttribute('data-need')) || 'pruefungen';
  var ROOT = '';
  if (self && self.src) {
    var gm = self.src.match(/^(.*\/)js\/guard\.js/);
    if (gm) ROOT = gm[1];
  }
  var HOME = (self && self.getAttribute('data-home')) || ROOT + 'index.html';

  function overlay(kind, player) {
    var wrap = document.createElement('div');
    wrap.id = 'guardGate';
    wrap.setAttribute(
      'style',
      'position:fixed;inset:0;z-index:99999;background:#F2F2F7;' +
        'display:flex;align-items:center;justify-content:center;padding:24px 20px;' +
        'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif'
    );

    var lockIc =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:26px;height:26px">' +
      '<rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5"/>' +
      '<path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>';

    var body =
      kind === 'nologin'
        ? '<h1 style="font-size:1.3em;font-weight:600;letter-spacing:-.01em;margin:0 0 10px">Anmeldung nötig</h1>' +
          '<p style="color:#8E8E93;font-size:.92em;line-height:1.55;margin:0 0 4px">' +
          'Bitte zuerst in der App mit deinem Nickname anmelden.</p>' +
          '<p style="color:#8E8E93;font-size:.86em;font-style:italic;line-height:1.5;margin:0 0 22px">' +
          'Vui lòng đăng nhập bằng nickname trong app trước.</p>'
        : '<h1 style="font-size:1.3em;font-weight:600;letter-spacing:-.01em;margin:0 0 10px">Pro-Inhalt</h1>' +
          '<p style="color:#8E8E93;font-size:.92em;line-height:1.55;margin:0 0 4px">' +
          'Prüfungsbögen und Lösungen sind in der Pro-Stufe.' +
          (player ? ' Angemeldet als <b style="color:#000">' + esc(player) + '</b> (Basic).' : '') +
          '</p>' +
          '<p style="color:#8E8E93;font-size:.86em;font-style:italic;line-height:1.5;margin:0 0 22px">' +
          'Đề thi và lời giải thuộc tầng Pro. Nhập code trong app để mở.</p>';

    wrap.innerHTML =
      '<div style="width:min(420px,100%);background:#fff;border:1px solid #E5E5EA;border-radius:22px;' +
      'padding:36px 28px;text-align:center;box-shadow:0 1px 2px rgba(0,0,0,.04),0 8px 30px rgba(0,0,0,.05)">' +
      '<div style="width:52px;height:52px;border-radius:16px;background:#EAF3FF;color:#007AFF;' +
      'display:flex;align-items:center;justify-content:center;margin:0 auto 20px">' +
      lockIc +
      '</div>' +
      body +
      '<a href="' +
      HOME +
      '" style="display:block;height:48px;line-height:48px;background:#007AFF;color:#fff;' +
      'border-radius:12px;text-decoration:none;font-weight:500;font-size:.92em">Zur App →</a>' +
      '</div>';
    return wrap;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function block(kind, player) {
    try {
      document.documentElement.style.overflow = 'hidden';
      var host = document.body || document.documentElement;
      host.appendChild(overlay(kind, player));
    } catch (_) {
      location.replace(HOME);
    }
  }

  async function check() {
    if (!window.LearnDB || !window.Access) return; // Skripte fehlen → nicht sperren
    var player = '';
    try {
      player = (LearnDB.getPlayer && LearnDB.getPlayer()) || '';
    } catch (_) {}
    if (!player) {
      block('nologin', '');
      return;
    }
    // Stufe aus dem Session-Cache; falls leer → aus Supabase nachladen
    var ok = false;
    try {
      ok = Access.can(NEED);
      if (!ok) {
        await Access.loadTier(player);
        ok = Access.can(NEED);
      }
    } catch (_) {
      ok = true; // Netzfehler → nicht aussperren
    }
    if (!ok) block('locked', player);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check);
  } else {
    check();
  }
})();
