const CACHE_NAME = 'htbb-safeguarding-v3';

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; }).map(function (key) { return caches.delete(key); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;

  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  var isDocument = e.request.mode === 'navigate';

  if (isDocument) {
    // Stale-while-revalidate for HTML navigation
    e.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(e.request).then(function (cached) {
          var fetchPromise = fetch(e.request).then(function (response) {
            if (response && response.ok) {
              cache.put(e.request, response.clone());
            }
            return response;
          }).catch(function () { return cached; });
          return cached || fetchPromise;
        });
      }).catch(function () { return fetch(e.request); })
    );
  } else {
    // Cache-first for static assets (hashed JS/CSS/images)
    e.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(e.request).then(function (cached) {
          if (cached) return cached;
          return fetch(e.request).then(function (response) {
            if (response && response.ok && response.type === 'basic') {
              cache.put(e.request, response.clone());
            }
            return response;
          });
        });
      })
    );
  }
});
