/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
<<<<<<< Updated upstream
      boxShadow: {
        'custom-basic': '0 0 4px rgba(0, 0, 0, 0.25)'
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
          950: "#040B18" // Main 95
        },
        red: {
          500: "#D03229", // ErrorColor 01
          600: "#b5271f", // 어두운 빨간색 // 코드 필요
        },
        gray: {
          200: "#EEEEEE", //ServiceColor 05
          300: "#CCCCCC", // ServiceColor 04
          400: "#9D9D9D", // ServiceColor 03
          500: "#6b7280" // ServiceColor 02
        },
        green: {
          500: "#35CC4C" // ServiceColor 01
        },
=======
      colors: {
        main05: '#E9F1FD',
        main50: '#256FEF',
        main70: '#16438F',
        serviceColor02: '#707070',
        serviceColor03: '#9D9D9D',
        serviceColor04: '#CCCCCC',
        serviceColor05: '#EEEEEE',
      },
      spacing: {
        '22.625': '22.625rem',
        '4.563': '4.563rem',
      },
      borderRadius: {
        '12px': '12px',
      },
      boxShadow: {
        custom: "0px 0px 4px rgba(0, 0, 0, 0.25)",
>>>>>>> Stashed changes
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
  plugins: [],
  
}
