/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // Enable dark mode with "class" strategy
    theme: {
      extend: {
        colors: {
          primary: {
            50: "#edf5ff",
            100: "#daeaff",
            200: "#bcd9ff",
            300: "#8ec0ff",
            400: "#599cff",
            500: "#2b77fc",
            600: "#105af4",
            700: "#0a46e2",
            800: "#0e3aB8",
            900: "#103692",
            950: "#0a2156",
          },
          secondary: {
            50: "#f3f1ff",
            100: "#ebe5ff",
            200: "#d9ceff",
            300: "#bea6ff",
            400: "#a175ff",
            500: "#8947ff",
            600: "#7d29f7",
            700: "#6d1de6",
            800: "#5a19bf",
            900: "#4c189b",
            950: "#2d0c69",
          },
          accent: {
            50: "#fdf2ff",
            100: "#fae6ff",
            200: "#f5ceff",
            300: "#f0a5ff",
            400: "#e868ff",
            500: "#d637f5",
            600: "#be1dd5",
            700: "#a017b0",
            800: "#84168f",
            900: "#6e1774",
            950: "#4c064f",
          },
          dark: {
            100: "#d1d5db",
            200: "#9ca3af",
            300: "#6b7280",
            400: "#4b5563",
            500: "#374151",
            600: "#1f2937",
            700: "#111827",
            800: "#0d1424",
            900: "#030712",
          },
          light: {
            100: "#ffffff",
            200: "#fafafa",
            300: "#f5f5f5",
            400: "#f1f1f1",
            500: "#e5e5e5",
            600: "#d4d4d4",
            700: "#a3a3a3",
            800: "#737373",
            900: "#404040",
          },
        },
        fontFamily: {
          sans: ["var(--font-inter)", "system-ui", "sans-serif"],
          display: ["var(--font-cabinet-grotesk)", "system-ui", "sans-serif"],
          mono: ["var(--font-fira-code)", "monospace"],
        },
        fontSize: {
          "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        },
        keyframes: {
          "fade-in": {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          "fade-out": {
            "0%": { opacity: "1" },
            "100%": { opacity: "0" },
          },
          "slide-in-bottom": {
            "0%": {
              transform: "translateY(30px)",
              opacity: "0",
            },
            "100%": {
              transform: "translateY(0)",
              opacity: "1",
            },
          },
          "slide-out-bottom": {
            "0%": {
              transform: "translateY(0)",
              opacity: "1",
            },
            "100%": {
              transform: "translateY(30px)",
              opacity: "0",
            },
          },
          "rotate-cw": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
          float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
          },
          pulse: {
            "0%, 100%": { opacity: "1" },
            "50%": { opacity: "0.5" },
          },
          blob: {
            "0%": {
              transform: "scale(1) translate(0px, 0px)",
            },
            "33%": {
              transform: "scale(1.1) translate(30px, -50px)",
            },
            "66%": {
              transform: "scale(0.9) translate(-20px, 20px)",
            },
            "100%": {
              transform: "scale(1) translate(0px, 0px)",
            },
          },
        },
        animation: {
          "fade-in": "fade-in 0.5s ease-in forwards",
          "fade-out": "fade-out 0.5s ease-out forwards",
          "slide-in-bottom": "slide-in-bottom 0.5s ease-out forwards",
          "slide-out-bottom": "slide-out-bottom 0.5s ease-in forwards",
          "rotate-slow": "rotate-cw 8s linear infinite",
          float: "float 3s ease-in-out infinite",
          "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          blob: "blob 7s infinite",
        },
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "hero-pattern":
            "url('/images/hero-pattern.svg')",
        },
        boxShadow: {
          neon: "0 0 5px theme('colors.primary.500'), 0 0 20px theme('colors.primary.500')",
          "neon-accent": "0 0 5px theme('colors.accent.500'), 0 0 20px theme('colors.accent.500')",
        },
        borderRadius: {
          '4xl': '2rem',
        },
        transitionTimingFunction: {
          'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
          'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  };
