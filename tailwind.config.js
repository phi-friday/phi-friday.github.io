/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        header: ['Cabinet Grotesk', ...defaultTheme.fontFamily.sans],
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        themeBackground: 'var(--background)',
        themeText: 'var(--text)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
