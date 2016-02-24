var path = require('path');
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production';

var uglify = new webpack.optimize.UglifyJsPlugin();

var plugins = [];

if (isProd) {
  plugins.push(uglify);
}

//TODO: Hot CSS/SASS reloading via css-loader + style-loader

module.exports = {
  entry: path.join(__dirname, 'src/entry.jsx'),
  output: {
    path: path.join(__dirname, 'dist/assets/js/'),
    filename: 'scripts.js'
  },
  devServer: {
    contentBase: './dist',
    publicPath: '/assets/js/',
    colors: true,
    progress: true,
    watch: true,
    port: 3545
  },
  module: {
    loaders: [
      // {
      //   test: /\.css$/,
      //   include: [
      //     path.resolve(__dirname, 'src/vendor/'),
      //     path.resolve(__dirname, 'node_modules'),
      //   ],
      //   loader: ExtractTextPlugin.extract('css')
      // },
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract('css!sass')
      // },
      {
        test: /\.(es|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'babel!svg-react-loader'
      }
    ]
  },
  resolve: {
    // allows extension-less require/import statements for files with these extensions
    extensions: ['', '.es', '.js', '.jsx']
  },
  plugins: plugins
};
