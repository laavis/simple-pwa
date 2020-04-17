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
self.addEventListener('install', (e) => {
  e.waitUntil(async () => {
    try {
      const cache = await caches.open(cacheName);
      return cache.addAll(filesToCache);
    } catch (err) {
      console.error();
    }
  })();
});

// serve cached content when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      try {
        const response = await caches.match(e.request);
        return response || fetch(e.request);
      } catch (e) {
        console.error(err);
      }
    })()
  );
});

console.log('done');
