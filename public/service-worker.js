self.addEventListener("install", (event) => {
    console.log("Service Worker installing...")
    event.waitUntil(
        caches.open("v1").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/logo.svg",
                "/icon-512x512.png",
            ])
        })
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    )
})
