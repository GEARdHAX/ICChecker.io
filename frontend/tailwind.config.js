/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/primereact/**/*.{js,jsx}",
  ],
  darkMode: 'class', // We'll default to dark mode
  theme: {
    extend: {
      colors: {
        primary: '#22d3ee',   // cyan-400
        secondary: '#0f172a', // slate-900
        accent: '#38bdf8',    // sky-400
        'text-main': '#f8fafc', // slate-50
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(34, 211, 238, 0.4)',
        'glow-sky': '0 0 15px rgba(56, 189, 248, 0.4)',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}