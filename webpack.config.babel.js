import fs from 'fs-extra'
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

// Move icons to dist directory
fs.mkdirsSync(folders.dist + "/icons")
fs.copy(folders.src + "images/icons", folders.dist + "/icons/", function (err) {
  if (err) return console.error(err)
});
fs.copy(folders.src + "images/flood-alert-legend.png", folders.dist + "/flood-alert-legend.png", function (err) {
  if (err) return console.error(err)
});
// fs.createReadStream(folders.src + "images/icons").pipe(fs.createWriteStream(folders.dist + "/icons/"))

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
    noParse: [/aws-sdk/],
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
          : 'style!css',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader?limit=65536'
      },
      {
        test: /\.(es|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(mss|sql)$/,
        loader: 'raw-loader'
      },
    ]
  },
  resolve: {
    // allows extension-less require/import statements for files with these extensions
    extensions: ['', '.es', '.js', '.jsx'],
    alias: {
      leaflet_css: __dirname + '/node_modules/leaflet/dist/leaflet.css',
      leaflet_marker: __dirname + '/node_modules/leaflet/dist/images/marker-icon.png',
      leaflet_marker_2x: __dirname + '/node_modules/leaflet/dist/images/marker-icon-2x.png',
      leaflet_marker_shadow: __dirname + '/node_modules/leaflet/dist/images/marker-shadow.png'
    }
  },
  plugins
}
