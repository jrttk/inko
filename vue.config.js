module.exports = {
  configureWebpack: {
    module: {
      rules: [ {
        test: /\.md$/,
       loader: 'raw-loader',
      }]
    }
  }
}