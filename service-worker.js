self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('wasteland-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/game.js',
        '/manifest.json',
        '/img/icon-192.png',
        '/img/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
