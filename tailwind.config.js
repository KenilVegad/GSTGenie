/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#000000',
        'dark-primary': '#000000',
        'dark-secondary': '#ffffff',
        indigo: {
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      backgroundColor: {
        primary: '#ffffff',
        secondary: '#f0f0f0',
        'dark-primary': '#000000',
        'dark-secondary': '#1a1a1a',
      },
      textColor: {
        primary: '#000000',
        secondary: '#333333',
        'dark-primary': '#ffffff',
        'dark-secondary': '#cccccc',
      }
    },
  },
  plugins: [],
}
