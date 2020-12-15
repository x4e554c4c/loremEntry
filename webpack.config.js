var path = require('path');

module.exports = {
  mode: 'development',
  cache: true,

  resolve: {
    alias: {
      '~': './',
    }
  },

  entry: {
    extension: './src/extensions/extension.js',
    main: './src/services/main.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    port: 8080,

    hot: true,
  }
};