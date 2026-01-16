/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff5f2",
          100: "#ffe8e0",
          200: "#ffd4c7",
          300: "#ffb8a0",
          400: "#ff8f68",
          500: "#FF6B35",
          600: "#f04e1a",
          700: "#d13a0f",
          800: "#ad3010",
          900: "#8f2914",
        },
        secondary: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#b9ddfe",
          300: "#7cc2fd",
          400: "#36a4fa",
          500: "#004E89",
          600: "#0073c7",
          700: "#005ca0",
          800: "#004d84",
          900: "#00406d",
        },
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#F7B801",
          600: "#d69e00",
          700: "#b37e00",
          800: "#926200",
          900: "#784f00",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
