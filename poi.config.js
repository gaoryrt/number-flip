module.exports = (options, req) => ({
  entry: 'number-flip.js',
  format: 'umd',
  filename: {
    js: 'number-flip.min.js'
  },
  configureWebpack(config, context) {
    return config
  }
})
