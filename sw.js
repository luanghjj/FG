/* Service Worker – Lern-App H2FO3T (offline shell + static assets) */
const CACHE = 'h2fo3t-v38';
const PRECACHE = [
  './',
  './index.html',
  './deutsch.html',
  './admin.html',
  './challenge.html',
  './challenge.js',
  './challenge-data.js',
  './supabase.js',
  './vocab.js',
  './diagrams.js',
  './bfk1-data.js',
  './bfk1-quiz.js',
  './bfk2-quiz.js',
  './deutsch-quiz.js',
  './faecher.js',
  './gk-uebungen.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './rind.png',
  './schwein.png',
  './kraft.png',
  './ka2.html',
  './kiemtra_mau.html',
  './loiGiai_mau.html',
  './bfk1-ka3.html',
  './bfk1-ka3-loesung.html',
  './bfk1-ka4.html',
  './bfk1-ka4-loesung.html',
  './bfk1-ka5.html',
  './bfk1-ka5-loesung.html',
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
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
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
