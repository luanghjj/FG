/* PWA helpers: SW register + install prompt banner */
(function () {
  if (!('serviceWorker' in navigator)) return;

  const DISMISS_KEY = 'pwa_install_dismissed_v1';
  let deferredPrompt = null;

  function isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  }

  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }

  function dismissed() {
    try {
      return localStorage.getItem(DISMISS_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function setDismissed() {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch (_) {}
  }

  function ensureStyles() {
    if (document.getElementById('pwa-style')) return;
    const s = document.createElement('style');
    s.id = 'pwa-style';
    s.textContent = `
#pwaBanner{position:fixed;left:12px;right:12px;bottom:12px;z-index:300;display:none;
  background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:14px 14px 12px;
  box-shadow:0 16px 40px rgba(15,23,42,.18);font-family:Inter,system-ui,sans-serif;color:#0f172a;
  animation:pwaIn .35s ease}
#pwaBanner.show{display:block}
@keyframes pwaIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
#pwaBanner .row{display:flex;gap:12px;align-items:flex-start}
#pwaBanner .ico{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#4f46e5,#7c3aed);
  color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.2em;flex-shrink:0}
#pwaBanner h3{font-size:.95em;margin:0 0 4px;font-weight:800}
#pwaBanner p{margin:0;font-size:.82em;color:#64748b;line-height:1.4}
#pwaBanner .actions{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
#pwaBanner button{border:none;border-radius:11px;padding:10px 14px;font:inherit;font-weight:700;font-size:.85em;cursor:pointer}
#pwaBanner .yes{background:#2d2d2d;color:#fff;flex:1;min-width:120px}
#pwaBanner .no{background:#f1f5f9;color:#475569}
#pwaBanner .ios{background:#eef2ff;border:1px solid #c7d2fe;border-radius:12px;padding:10px;margin-top:10px;font-size:.8em;color:#3730a3;line-height:1.45;display:none}
#pwaBanner .ios.show{display:block}
@media(min-width:720px){#pwaBanner{left:auto;right:18px;width:360px;bottom:18px}}
`;
    document.head.appendChild(s);
  }

  function showBanner(mode) {
    if (isStandalone() || dismissed()) return;
    ensureStyles();
    let el = document.getElementById('pwaBanner');
    if (!el) {
      el = document.createElement('div');
      el.id = 'pwaBanner';
      el.innerHTML = `
        <div class="row">
          <div class="ico">📱</div>
          <div style="flex:1;min-width:0">
            <h3>App auf dem Handy installieren?</h3>
            <p>Schneller Zugriff vom Homescreen – auch offline nutzbar.</p>
            <div class="ios" id="pwaIosHint">
              <b>iPhone / iPad:</b> Tippe auf <b>Teilen</b> <span aria-hidden="true">⬆︎</span> und dann
              <b>„Zum Home-Bildschirm“</b>.
            </div>
            <div class="actions">
              <button type="button" class="yes" id="pwaInstallYes">Ja, installieren</button>
              <button type="button" class="no" id="pwaInstallNo">Später</button>
            </div>
          </div>
        </div>`;
      document.body.appendChild(el);
      document.getElementById('pwaInstallNo').onclick = () => {
        setDismissed();
        el.classList.remove('show');
      };
      document.getElementById('pwaInstallYes').onclick = async () => {
        if (mode === 'ios') {
          document.getElementById('pwaIosHint').classList.add('show');
          return;
        }
        if (!deferredPrompt) {
          // fallback: show tip
          document.getElementById('pwaIosHint').textContent =
            'Im Browser-Menü „App installieren“ / „Zum Startbildschirm hinzufügen“ wählen.';
          document.getElementById('pwaIosHint').classList.add('show');
          return;
        }
        deferredPrompt.prompt();
        try {
          await deferredPrompt.userChoice;
        } catch (_) {}
        deferredPrompt = null;
        setDismissed();
        el.classList.remove('show');
      };
    }
    if (mode === 'ios') {
      document.getElementById('pwaIosHint')?.classList.add('show');
      const yes = document.getElementById('pwaInstallYes');
      if (yes) yes.textContent = 'So geht’s';
    }
    el.classList.add('show');
  }

  // Register SW
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
    // delay install prompt a bit so login is not blocked
    setTimeout(() => {
      if (isStandalone() || dismissed()) return;
      // On iOS show tip; on Android wait for beforeinstallprompt or learn-ready-install
      if (isIOS()) showBanner('ios');
    }, 2500);
  });

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  // Show after successful nickname login (app ready)
  window.addEventListener('learn-ready-install', () => {
    if (isStandalone() || dismissed()) return;
    if (isIOS()) showBanner('ios');
    else if (deferredPrompt) showBanner('android');
    else if (!isIOS()) showBanner('android'); // menu fallback tip
  });

  window.addEventListener('appinstalled', () => {
    setDismissed();
    const el = document.getElementById('pwaBanner');
    if (el) el.classList.remove('show');
  });
})();
