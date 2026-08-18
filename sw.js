/* Service Worker – AzubiHub (offline shell + static assets) */
const CACHE = 'azubihub-v111';
const PRECACHE = [
  './',
  './js/wissen.js',
  './js/chatbox.js',
  './index.html',
  './deutsch-a1-c1/',
  './deutsch-a1-c1/index.html',
  './klassenarbeiten/deutsch.html',
  './admin.html',
  './challenge.html',
  './js/challenge.js',
  './js/challenge-data.js',
  './js/supabase.js',
  './js/access.js',
  './js/guard.js',
  './js/vocab.js',
  './js/diagrams.js',
  './js/faecher.js',
  './faecher/gk/gk-uebungen.js',
  './faecher/gk/gk-gle-data.js',
  './faecher/bfk1/bfk1-lf2-p1.js',
  './faecher/bfk1/bfk1-lf2-p2.js',
  './faecher/bfk1/bfk1-lf2-p3.js',
  './faecher/bfk1/bfk1-lf2-p4.js',
  './faecher/bfk1/bfk1-lf2-p5.js',
  './faecher/bfk1/bfk1-lf2-data.js',
  './faecher/bfk1/bfk1-lf3-p1.js',
  './faecher/bfk1/bfk1-lf3-p2.js',
  './faecher/bfk1/bfk1-lf3-p3.js',
  './faecher/bfk1/bfk1-lf3-p4.js',
  './faecher/bfk1/bfk1-lf3-p5.js',
  './faecher/bfk1/bfk1-lf3-data.js',
  './faecher/bfk1/bfk1-lf6-p1.js',
  './faecher/bfk1/bfk1-lf6-p2.js',
  './faecher/bfk1/bfk1-lf6-p3.js',
  './faecher/bfk1/bfk1-lf6-p4.js',
  './faecher/bfk1/bfk1-lf6-p5.js',
  './faecher/bfk1/bfk1-lf6-p6.js',
  './faecher/bfk1/bfk1-lf6-p7.js',
  './faecher/bfk1/bfk1-lf6-data.js',
  './faecher/bfk1/bfk1-lf9-p1.js',
  './faecher/bfk1/bfk1-lf9-p2.js',
  './faecher/bfk1/bfk1-lf9-p3.js',
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
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
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

  // HTML: network-first so updates appear quickly
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((r) => {
            if (r) return r;
            if (req.url.includes('/deutsch-a1-c1/')) return caches.match('./deutsch-a1-c1/index.html');
            return caches.match('./index.html');
          })
        )
    );
    return;
  }

  // JS/CSS: network-first so API updates (e.g. LearnDB challenge methods) are not stuck
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.webmanifest')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        // ignoreSearch so a precached bare URL (./supabase.js) still serves a
        // versioned request (./supabase.js?v=7) when offline and that exact
        // version was never fetched — keeps the offline shell working across
        // releases instead of failing with no cache hit.
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
