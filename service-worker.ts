/// <reference lib="webworker" />

const CACHE_NAME = "together-time-v1";

const STATIC_ASSETS = [
  "/new-year-2025/",
  "/new-year-2025/index.html",
  "/new-year-2025/manifest.json",
  "/new-year-2025/icons/icon-192x192.png",
  "/new-year-2025/icons/icon-512x512.png",
  "/new-year-2025/sounds/click.mp3",
  "/new-year-2025/sounds/win.mp3",
  "/new-year-2025/sounds/spin.mp3",
];

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

export {};
