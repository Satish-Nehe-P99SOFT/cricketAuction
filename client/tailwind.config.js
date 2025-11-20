/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Modern gradient backgrounds
        "background-main": "rgba(15, 23, 42, 0.8)",
        "background-secondary": "#0f172a",
        "background-tertiary": "rgba(30, 41, 59, 0.6)",
        "background-accent": "rgba(59, 130, 246, 0.1)",

        // Modern theme colors
        primary: "#3b82f6",
        "primary-dark": "#2563eb",
        "primary-light": "#60a5fa",
        secondary: "#8b5cf6",
        accent: "#06b6d4",
        "accent-hover": "#0891b2",

        // Text colors
        "text-primary": "#f1f5f9",
        "text-secondary": "#cbd5e1",
        "text-muted": "#94a3b8",

        // Legacy support (gradually migrate away)
        "font-main": "#f1f5f9",
        theme: "#3b82f6",
        "theme-2": "#2563eb",
        "theme-3": "#60a5fa",
        hover: "#fbbf24",
        red: "#ef4444",
        yellow: "#fbbf24",
      },
      fontFamily: {
        sans: ["Roboto Slab", "sans-serif"],
      },
      screens: {
        max: "1000px",
        min: "650px",
      },
      animation: {
        "dash-left": "dashFromLeft 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "dash-right": "dashFromRight 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "move-up": "move-up 7s linear infinite",
        "move-up-2": "move-up 10s linear infinite",
        "move-up-3": "move-up 5s linear infinite",
        "move-up-4": "move-up 9s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        spin: "spin 1s linear infinite",
        beat: "beat 1s ease-in-out infinite",
        pulse: "pulse 0.8s ease-in-out infinite alternate",
      },
      keyframes: {
        dashFromLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        dashFromRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "move-up": {
          "0%": { transform: "translateY(700px)" },
          "50%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-800px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        beat: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.5)" },
        },
        pulse: {
          "0%": { color: "wheat", transform: "scale(1.5)" },
          "50%": { color: "whitesmoke", transform: "scale(1.7)" },
          "100%": { color: "wheat", transform: "scale(1.5)" },
        },
      },
      backdropBlur: {
        glass: "5px",
      },
    },
  },
  plugins: [],
};
