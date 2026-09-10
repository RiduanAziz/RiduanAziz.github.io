/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#f8fafc',
          dark: '#0f172a', 
        },
        accent: {
          DEFAULT: '#c76645', // Warm coral accent
          hover: '#a94d32',
        }
      }
    },
  },
  plugins: [],
}