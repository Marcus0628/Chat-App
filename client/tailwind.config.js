/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#02adb5',
        secondary: '#058187',
      },
    },
  },
  plugins: [],
};
