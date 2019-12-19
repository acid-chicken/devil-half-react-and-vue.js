module.exports = {
  syntax: 'sugarss',
  plugins: [
    require('cssnano'),
    require('postcss-cssnext'),
    require('postcss-import'),
    require('postcss-preset-env'),
    require('postcss-sorting'),
  ],
}
