var path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
    extension: './src/extension.js'
  },

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
    compress: true,
    port: 8080  
  }
};