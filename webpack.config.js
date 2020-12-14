var path = require('path');

module.exports = {
  entry: './src/main.js',

  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  }
};