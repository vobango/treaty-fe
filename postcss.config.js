const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = context => {
  return {
    plugins: [
      tailwindcss('./tailwind.js'),
      require('autoprefixer'),
      context.env === 'production'
        ? purgecss({
            content: ['./public/index.html', './src/**/*.js'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          })
        : null
    ]
  };
};
