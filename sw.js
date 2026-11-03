/* Service Worker – AzubiHub (offline shell + static assets) */
const CACHE = 'azubihub-v238';
const PRECACHE = [
  './',
  './pwa.js',
  './js/anti-theft.js',
  './js/exam-sim.js',
  './js/icons.js',
  './arena.html',
  './js/arena-data.js',
  './js/wissen.js',
  './index.html',
  './zwischenpruefung.html',
  './Klassenarbeit_2_BFK1_Lernfeld_6_9.html',
  './abschluss-winter-2023-2024.html',
  './abschluss-sommer-2024.html',
  './abschluss-winter-2024-2025.html',
  './abschluss-sommer-2025.html',
  './deutsch-a1-c1/',
  './deutsch-a1-c1/index.html',
  './fuererschein/',
  './fuererschein/index.html',
  './lid/',
  './lid/index.html',
  './lid/lid.css',
  './lid/data/lid-allg-p1.js',
  './lid/data/lid-allg-p2.js',
  './lid/data/lid-allg-p3.js',
  './lid/data/lid-allg-p4.js',
  './lid/data/lid-land-p1.js',
  './lid/data/lid-land-p2.js',
  './lid/data/lid-data.js',
  './lid/data/lid-quiz.js',
  './lid/data/lid-tipps.js',
  './lid/lid-exam.js',
  './lid/lid-app.js',
  './klassenarbeiten/deutsch.html',
  './klassenarbeiten/deutsch-inhaltsangabe.html',
  './admin.html',
  './challenge.html',
  './js/challenge.js',
  './js/challenge-data.js',
  './js/supabase.js',
  './js/access.js',
  './js/guard.js',
  './js/vocab.js',
  './js/lang-split.js',
  './js/diagrams.js',
  './js/faecher.js',
  './css/statute-theme.css',
  './css/elite-theme.css',
  './js/search-pages-data.js',
  './faecher/gk/gk-uebungen.js',
  './faecher/gk/gk-gle-data.js',
  './faecher/wiko/wiko-pruefung-data.js',
  './faecher/symbole/symbole-data.js',
  './js/pruefungsplan.js',
  './faecher/bfk1/bfk1-lf2-p1.js',
  './faecher/bfk1/bfk1-lf2-p2.js',
  './faecher/bfk1/bfk1-lf2-p3.js',
  './faecher/bfk1/bfk1-lf2-p4.js',
  './faecher/bfk1/bfk1-lf2-p5.js',
  './faecher/bfk1/bfk1-lf2-p6.js',
  './faecher/bfk1/bfk1-lf2-data.js',
  './faecher/bfk1/bfk1-lf3-p1.js',
  './faecher/bfk1/bfk1-lf3-p2.js',
  './faecher/bfk1/bfk1-lf3-p3.js',
  './faecher/bfk1/bfk1-lf3-p4.js',
  './faecher/bfk1/bfk1-lf3-p6.js',
  './faecher/bfk1/bfk1-lf3-p5.js',
  './faecher/bfk1/bfk1-lf3-data.js',
  './faecher/bfk1/bfk1-lf6-p1.js',
  './faecher/bfk1/bfk1-lf6-p2.js',
  './faecher/bfk1/bfk1-lf6-p3.js',
  './faecher/bfk1/bfk1-lf6-p4.js',
  './faecher/bfk1/bfk1-lf6-p5.js',
  './faecher/bfk1/bfk1-lf6-p6.js',
  './faecher/bfk1/bfk1-lf6-p7.js',
  './faecher/bfk1/bfk1-lf6-p8.js',
  './faecher/bfk1/bfk1-lf6-p9.js',
  './faecher/bfk1/bfk1-lf6-p10.js',
  './faecher/bfk1/bfk1-lf6-data.js',
  './faecher/bfk1/bfk1-lf9-p1.js',
  './faecher/bfk1/bfk1-lf9-p2.js',
  './faecher/bfk1/bfk1-lf9-p3.js',
  './faecher/bfk1/bfk1-lf9-p5.js',
  './faecher/bfk1/bfk1-lf9-p4.js',
  './faecher/bfk1/bfk1-lf9-data.js',
  './faecher/bfk1/bfk1-extra-p1.js',
  './faecher/bfk1/bfk1-extra-p2.js',
  './faecher/bfk1/bfk1-extra-p3.js',
  './faecher/bfk1/bfk1-extra-p4.js',
  './faecher/bfk1/bfk1-extra-p5.js',
  './faecher/bfk1/bfk1-extra-p6.js',
  './faecher/bfk1/bfk1-extra-data.js',
  './faecher/bfk1/bfk1-data.js',
  './faecher/bfk1/bfk1-catalog.js',
  './faecher/bfk1/bfk1-quiz.js',
  './faecher/bfk2/bfk2-quiz.js',
  './faecher/deutsch/deutsch-quiz.js',
  './manifest.webmanifest',
  './images/icons/icon-192.png',
  './images/icons/icon-512.png',
  './images/icons/apple-touch-icon.png',
  './images/charts/rind.png',
  './images/charts/schwein.png',
  './images/charts/kraft.png',
  './klassenarbeiten/ka2.html',
  './klassenarbeiten/kiemtra_mau.html',
  './klassenarbeiten/loiGiai_mau.html',
  './klassenarbeiten/bfk1-ka3.html',
  './klassenarbeiten/bfk1-ka3-loesung.html',
  './klassenarbeiten/bfk1-ka4.html',
  './klassenarbeiten/bfk1-ka4-loesung.html',
  './klassenarbeiten/bfk1-ka5.html',
  './klassenarbeiten/bfk1-ka5-loesung.html',
  './klassenarbeiten/gk-ka1.html',
  './klassenarbeiten/gk-ka1-loesung.html',
  './klassenarbeiten/gk-ka2.html',
  './klassenarbeiten/gk-ka2-loesung.html',
  './klassenarbeiten/gk-ka3.html',
  './klassenarbeiten/gk-ka3-loesung.html',
  './klassenarbeiten/gk-ka-2026-10-12.html',
  './klassenarbeiten/gk-zusammenfassung.html',
  './klassenarbeiten/englisch-ka1.html',
  './klassenarbeiten/englisch-ka1-loesung.html',
  './klassenarbeiten/englisch-ka2.html',
  './klassenarbeiten/englisch-ka2-loesung.html',
  './klassenarbeiten/englisch-ka3.html',
  './klassenarbeiten/englisch-ka3-loesung.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(PRECACHE.map((u) => cache.add(u)))
    ).then(() => self.skipWaiting())
  );
});

function fetchWithTimeout(req, ms, opts) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return Promise.reject(new Error('offline'));
  }
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms || 2200);
    fetch(req, opts)
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

self.addEventListener('message', (event) => {
  if (event.data && (event.data.type === 'SKIP_WAITING' || event.data === 'skipWaiting')) {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Don't cache Supabase / cross-origin API
  if (url.origin !== self.location.origin) return;

  // HTML: network-first with 2.2s timeout so offline / weak Wi-Fi loads immediately from cache
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetchWithTimeout(req, 2200, { cache: 'no-cache' })
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(req, { ignoreSearch: true }).then((r) => {
            if (r) return r;
            if (req.url.includes('/deutsch-a1-c1/')) return caches.match('./deutsch-a1-c1/index.html', { ignoreSearch: true });
            if (req.url.includes('/fuererschein/')) return caches.match('./fuererschein/index.html', { ignoreSearch: true });
            if (req.url.includes('/lid/')) return caches.match('./lid/index.html', { ignoreSearch: true });
            return caches.match('./index.html', { ignoreSearch: true });
          })
        )
    );
    return;
  }

  // JS/CSS: network-first with 2.2s timeout, instant fallback to precached assets (ignoreSearch: true)
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.webmanifest')) {
    event.respondWith(
      fetchWithTimeout(req, 2200)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || Response.error()))
    );
    return;
  }

  // other static: cache-first (ignoreSearch so precached icons/images are found
  // even if requested with a query string)
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      });
    })
  );
});
