/* Project Beyond — service worker
 * Caches the shell + Chart.js + fonts so the app runs offline.
 * Bump VERSION to force a refresh after you update the HTML.
 */
const VERSION = 'beyond-v3';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './sw.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(c => c.addAll(CORE).catch(() => {
      /* one of the third-party URLs failed — install anyway */
    }))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok && (e.request.url.startsWith('https://fonts.') || 
                        e.request.url.includes('chart.umd.min.js'))) {
          const clone = resp.clone();
          caches.open(VERSION).then(c => c.put(e.request, clone));
        }
        return resp;
      });
    })
  );
});
