/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "custom-basic": "0 0 4px rgba(0, 0, 0, 0.25)",
            },
            colors: {
                blue: {
                    50: "#E9F1FD", // Main 5
                    100: "#D3E2FC", // Main 10
                    150: "#BED4FA", // Main 15
                    200: "#A8C5F9", // Main 20
                    300: "#7CA9F5", // Main 30
                    400: "#518CF2", // Main 40
                    500: "#256FEF", // Main 50
                    600: "#1E59BF", // Main 60
                    700: "#16438F", // Main 70
                    800: "#0F2C60", // Main 80
                    850: "#0B2148", // Main 85
                    900: "#071630", // Main 90
                    950: "#040B18", // Main 95
                },
                red: {
                    500: "#D03229", // ErrorColor 01
                    600: "#b5271f", // 어두운 빨간색 // 코드 필요
                },
                gray: {
                    100: "#FBFBFB", //ORGNAME LIST에서 필요
                    200: "#EEEEEE", //ServiceColor 05
                    300: "#CCCCCC", // ServiceColor 04
                    400: "#9D9D9D", // ServiceColor 03
                    500: "#6b7280", // ServiceColor 02
                },
                green: {
                    500: "#35CC4C", // ServiceColor 01
                },
            },
            keyframes: {
                modalEnter: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                modalExit: {
                    "0%": { opacity: "1", transform: "translateY(0)" },
                    "100%": { opacity: "0", transform: "translateY(20px)" },
                },
                bgFadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "0.5" },
                },
                bgFadeOut: {
                    "0%": { opacity: "0.5" },
                    "100%": { opacity: "0" },
                },
                shrink: {
                    "0%": { width: "100%" },
                    "100%": { width: "0%" },
                },
            },
            animation: {
                modalEnter: "modalEnter 400ms cubic-bezier(0.25, 1, 0.5, 1) forwards",
                modalExit: "modalExit 400ms cubic-bezier(0.25, 1, 0.5, 1) forwards",
                bgFadeIn: "bgFadeIn 400ms ease-out forwards",
                bgFadeOut: "bgFadeOut 400ms ease-out forwards",
                shrink30: "shrink 30s linear forwards",
            },
        },
    },
    safelist: [
        {
            pattern: /text-(blue|red|gray|black)-(500|600)/,
        },
        {
            pattern: /border-(blue|red|gray|black)-(500|600)/,
        },
    ],
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".scrollbar-hide": {
                    "scrollbar-width": "none",
                    "-ms-overflow-style": "none",
                },
                ".scrollbar-hide::-webkit-scrollbar": {
                    display: "none",
                },
            })
        }),
    ],
}
