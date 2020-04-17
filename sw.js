const cacheName = 'pwa';
console.log(cacheName);

const filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './images/gradient_poster.png',
  './fonts/RobotoMono-Regular.ttf',
  './fontawesome/fa-solid-900.woff2',
  './fontawesome/fa-brands-400.woff2',
  './fontawesome/fa-regular-400.woff2',
];

// start sw and cache all content
self.addEventListener('install', (e) => {
  console.log('install');

  e.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(cacheName);
        console.log(cache);

        return cache.addAll(filesToCache);
      } catch (err) {
        console.error(err);
      }
    })()
  );
});

// serve cached content when offline
self.addEventListener('fetch', (event) => {
  console.log('ServiceWorker Fetch', event.request.url);
  event.respondWith(
    (async () => {
      try {
        const response = await caches.match(event.request);
        return response || fetch(event.request);
      } catch (e) {
        console.log(e.message);
      }
    })()
  );
});
