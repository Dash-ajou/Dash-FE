import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                cleanupOutdatedCaches: true, // 새로운 워커 등록 시 이전 캐시 삭제
                skipWaiting: true, // 새 워커 바로 적용
                clientsClaim: true, // 모든 탭에 적용
            },
            includeAssets: ["logo.svg", "apple-touch-icon.png"],
            manifest: {
                name: "My App",
                short_name: "App",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
})
