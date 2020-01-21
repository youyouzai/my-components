module.exports = {
    lintOnSave: false,
    devServer: {
      port: 8080
    },
    configureWebpack: config => {
        config.devtool = 'source-map'
    }
  }