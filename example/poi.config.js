module.exports = (options, req) => ({
  vendor: false,
  entry: './index.js',
  html: { template: './index.html' },
  autoprefixer: { browsers: ['iOS > 8', 'Android >= 4.4'] }
})
