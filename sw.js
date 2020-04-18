const cacheName = 'pwa';
const filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/images/gradient_poster.png',
  '/fonts/RobotoMono-Regular.ttf',
  '/fontawesome/fa-solid-900.woff2',
  '/fontawesome/fa-brands-400.woff2',
  '/fontawesome/fa-regular-400.woff2',
];

// start sw and cache all content
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open('greetings');
        await cache.addAll(filesToCache);
        return cache;
      } catch (e) {
        console.error(e);
      }
    })()
  );
});

// serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      try {
        const response = await caches.match(event.request);
        return response || fetch(event.request);
      } catch (e) {
        console.error(e);
      }
    })()
  );
});
