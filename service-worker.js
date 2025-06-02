
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('rb-taxi-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'icon-192.png',
        'icon-512.png',
        'apple-touch-icon.png',
        'manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
