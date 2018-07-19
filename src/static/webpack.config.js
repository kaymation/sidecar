const path = require('path');

module.exports = {
  entry: './dedupe/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dynamic/static')
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};


