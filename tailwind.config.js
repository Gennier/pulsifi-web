/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      'primary-color': '#4338CA',
      'secondary-color': '#4F46E5',
      'third-color': '#6366F1',
      'dark-color': '#3730A3',
      'light-color': '#A5B4FC',
      'primary-bg': colors.white,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
