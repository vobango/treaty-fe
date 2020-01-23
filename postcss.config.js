const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");
module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [
          purgecss({
            content: ["./src/**/*.html", "./src/**/*.tsx"],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          })
        ]
      : [])
  ]
};
