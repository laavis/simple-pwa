const cacheName = 'pwa';
const filesToCache = ['/', '/index.html', '/css/style.css', '/js/main.js', '/fonts/*.ttf'];

// start sw and cache all content
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// serve cached content when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
