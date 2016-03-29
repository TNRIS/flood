import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import swig from 'swig'

const isProd = process.env.NODE_ENV === 'production'

const folders = {
  dist: path.join(__dirname, 'dist/'),
  src: path.join(__dirname, 'src/')
}

//compile index.swig
const indexTpl = swig.compileFile(`${folders.src}index.swig`)
fs.writeFileSync(`${folders.dist}index.html`, indexTpl({isProd}))

//setup webpack plugins
const plugins = []
if (isProd) {
  plugins.push(new ExtractTextPlugin('styles.css'))
  plugins.push(new webpack.optimize.UglifyJsPlugin())
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }))
}

export default {
  entry: `${folders.src}entry.jsx`,
  output: {
    path: `${folders.dist}assets/`,
    publicPath: '/assets/',
    filename: 'scripts.js'
  },
  devServer: {
    contentBase: './dist',
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
        test: /\.css$/,
        loader: isProd ? ExtractTextPlugin.extract('css')
          : 'style!css'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(es|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.(mss)$/,
        loader: 'raw-loader'
      },
    ]
  },
  resolve: {
    // allows extension-less require/import statements for files with these extensions
    extensions: ['', '.es', '.js', '.jsx']
  },
  plugins
}
