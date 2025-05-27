/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fff1f6',
          100: '#ffe2ed',
          200: '#ffc6da',
          300: '#ff9dbc',
          400: '#ff6599',
          500: '#FF85A2',
          600: '#f91c61',
          700: '#d90f4d',
          800: '#b31042',
          900: '#94113c',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};