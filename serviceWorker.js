self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});