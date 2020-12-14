var path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
    extension: './src/extension.js'
  },

  cache: true,

  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },

  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    port: 8080,

    hot: true,
  }
};