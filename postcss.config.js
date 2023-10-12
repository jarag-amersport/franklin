/* eslint-disable global-require */
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss')('./tailwind.config.js'),
  ],
};
