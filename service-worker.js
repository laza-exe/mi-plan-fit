const CACHE_NAME = 'mi-plan-fit-cache-v2'; // Cambiado a v2 para asegurar que se actualice la caché
const urlsToCache = [
  '/',
  'index.html',
  'editar_dias.html',
  'manifest.json',
  'service-worker.js',
  'icon-192x192.png',
  'icon-512x512.png',
  'https://fonts.googleapis.com/css?family=Inter:400,600&display=swap', // La fuente de Google Fonts
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js' // ¡Nuevo! Chart.js
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});