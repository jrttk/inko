module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/inko/'
    : '/',
  configureWebpack: {
    module: {
      rules: [ {
        test: /\.md$/,
       loader: 'raw-loader',
      }]
    }
  }
}