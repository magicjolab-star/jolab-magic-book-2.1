const CACHE_NAME = 'magic-book-v353';
const APP_SHELL = ['/', '/index-352.html', '/style-330.css?v=330', '/style-352.css?v=353', '/accessory-350.css?v=350', '/data-330.js?v=330', '/app-330.js?v=330', '/accessory-350.js?v=351', '/auth-352.js?v=353', '/manifest.webmanifest?v=353'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/') || event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request, { cache: 'no-store' }).catch(() => caches.match('/index-352.html')));
    return;
  }

  if (url.pathname === '/manifest.webmanifest') {
    event.respondWith(fetch(event.request, { cache: 'reload' }).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request)));
    return;
  }

  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});