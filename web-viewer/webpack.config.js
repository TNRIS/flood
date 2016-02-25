var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

var uglify = new webpack.optimize.UglifyJsPlugin();

var plugins = [];

if (isProd) {
  plugins.push(new ExtractTextPlugin('styles.css'));
  plugins.push(uglify);
}

//TODO: load /assets/styles.css in index.html when isProd

module.exports = {
  entry: path.join(__dirname, 'src/entry.jsx'),
  output: {
    path: path.join(__dirname, 'dist/assets/'),
    filename: 'scripts.js'
  },
  devServer: {
    contentBase: './dist',
    publicPath: '/assets/',
    colors: true,
    progress: true,
    watch: true,
    port: 3545
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: isProd ? ExtractTextPlugin.extract('css!sass')
          : 'style!css?sourceMap!sass?sourceMap'
      },
      {
        test: /\.(es|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    // allows extension-less require/import statements for files with these extensions
    extensions: ['', '.es', '.js', '.jsx']
  },
  plugins: plugins
};
