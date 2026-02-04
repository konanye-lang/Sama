/* Anqa PWA Service Worker */
const CACHE_VERSION = "anqa-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./styles_ui_polish_6.css",
  "./app.js",
  "./data.js",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./logo.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    // Cache assets individually to avoid install failing if one file is missing.
    await Promise.allSettled(CORE_ASSETS.map(async (url) => {
      try { await cache.add(url); } catch (e) {}
    }));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k === CACHE_VERSION ? Promise.resolve() : caches.delete(k))));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith((async () => {
    const url = new URL(req.url);

    // Network-first for HTML navigations (keeps content fresh)
    if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE_VERSION);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match(req);
        return cached || caches.match("./offline.html");
      }
    }

    // Cache-first for static assets
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      const fresh = await fetch(req);
      const cache = await caches.open(CACHE_VERSION);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (e) {
      return cached;
    }
  })());
});
