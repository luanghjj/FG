/* Service Worker – AzubiHub (App Shell precache + Runtime cache-on-visit) */
const CACHE = 'azubihub-v245';
const RUNTIME_CACHE = 'azubihub-runtime-v1';

// Chỉ Precache phần App Shell cốt lõi của index.html để cài đặt nhanh,
// các phân hệ riêng (lid/, fuererschein/, deutsch-a1-c1/), đề HTML rời & ảnh scan
// sẽ được cache động vào RUNTIME_CACHE ngay khi người dùng mở tới.
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './pwa.js',
  './css/statute-theme.css',
  './css/elite-theme.css',
  './images/icons/icon-192.png',
  './images/icons/icon-512.png',
  './images/icons/apple-touch-icon.png',
  './js/anti-theft.js',
  './js/supabase.js',
  './js/access.js',
  './js/vocab.js',
  './js/lang-split.js',
  './js/faecher.js',
  './js/pruefungsplan.js',
  './js/search-pages-data.js',
  './js/exam-sim.js',
  './js/wissen.js',
  './js/icons.js',
  './faecher/gk/gk-uebungen.js',
  './faecher/gk/gk-gle-data.js',
  './faecher/wiko/wiko-pruefung-data.js',
  './faecher/symbole/symbole-data.js',
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
  './faecher/bfk1/bfk1-lf3-p5.js',
  './faecher/bfk1/bfk1-lf3-p6.js',
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
  './faecher/bfk1/bfk1-lf9-p4.js',
  './faecher/bfk1/bfk1-lf9-p5.js',
  './faecher/bfk1/bfk1-lf9-data.js',
  './faecher/bfk1/bfk1-extra-p1.js',
  './faecher/bfk1/bfk1-extra-p2.js',
  './faecher/bfk1/bfk1-extra-p3.js',
  './faecher/bfk1/bfk1-extra-p4.js',
  './faecher/bfk1/bfk1-extra-p5.js',
  './faecher/bfk1/bfk1-extra-p6.js',
  './faecher/bfk1/bfk1-extra-data.js',
  './faecher/bfk1/bfk1-data.js',
  './faecher/bfk1/bfk1-quiz.js',
  './faecher/bfk2/bfk2-quiz.js',
  './faecher/deutsch/deutsch-quiz.js',
];

const SHELL_PATHNAMES = new Set(
  PRECACHE.map((u) => new URL(u, self.location.href).pathname)
);

function targetCacheName(pathname) {
  return SHELL_PATHNAMES.has(pathname) ? CACHE : RUNTIME_CACHE;
}

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
  const KEEP = new Set([CACHE, RUNTIME_CACHE]);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !KEEP.has(k)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function saveToCache(pathname, req, res) {
  if (!res || res.status !== 200 || res.type === 'opaque') return;
  const copy = res.clone();
  caches.open(targetCacheName(pathname)).then((c) => c.put(req, copy)).catch(() => {});
}

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
          saveToCache(url.pathname, req, res);
          return res;
        })
        .catch(() =>
          caches.match(req, { ignoreSearch: true }).then((r) => {
            if (r) return r;
            if (req.url.includes('/deutsch-a1-c1/')) {
              return caches.match('./deutsch-a1-c1/index.html', { ignoreSearch: true })
                .then((sub) => sub || caches.match('./index.html', { ignoreSearch: true }));
            }
            if (req.url.includes('/fuererschein/')) {
              return caches.match('./fuererschein/index.html', { ignoreSearch: true })
                .then((sub) => sub || caches.match('./index.html', { ignoreSearch: true }));
            }
            if (req.url.includes('/lid/')) {
              return caches.match('./lid/index.html', { ignoreSearch: true })
                .then((sub) => sub || caches.match('./index.html', { ignoreSearch: true }));
            }
            return caches.match('./index.html', { ignoreSearch: true });
          })
        )
    );
    return;
  }

  // JS/CSS: network-first with 2.2s timeout, instant fallback to cached assets (ignoreSearch: true)
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.webmanifest')) {
    event.respondWith(
      fetchWithTimeout(req, 2200)
        .then((res) => {
          saveToCache(url.pathname, req, res);
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || Response.error()))
    );
    return;
  }

  // Other static (scans/charts/images): stale-while-revalidate into runtime/shell cache
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const netFetch = fetch(req)
        .then((res) => {
          saveToCache(url.pathname, req, res);
          return res;
        })
        .catch(() => cached || Response.error());
      if (cached) {
        event.waitUntil(netFetch);
        return cached;
      }
      return netFetch;
    })
  );
});
