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
          DEFAULT: '#2563eb', // Professional blue
          hover: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}