const CACHE_VERSION = import.meta.env.VITE_APP_VERSION
const CACHE_NAME = `my-app-cache-${CACHE_VERSION}`

self.addEventListener("install", (event) => {
    console.log("Service Worker installing...")
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/logo.svg",
                "/icon-512x512.png",
            ])
        })
    )
    self.skipWaiting()
})

self.addEventListener("activate", (event) => {
    console.log("Service Worker activating...")
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => caches.delete(name))
                )
            })
            .then(() => self.clients.claim()) // 현재 페이지를 즉시 컨트롤
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    )
})
