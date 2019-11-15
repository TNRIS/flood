import fs from 'fs-extra'
import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import nunjucks from 'nunjucks'

const isProd = process.env.NODE_ENV === 'production'
const webpackMode = process.env.NODE_ENV
console.log('running in ' + webpackMode + ' mode!')

const folders = {
  dist: path.join(__dirname, 'dist/'),
  src: path.join(__dirname, 'src/')
}

//compile index.njk
const indexTpl = nunjucks.render(`${folders.src}index.njk`, {isProd: isProd})
fs.writeFileSync(`${folders.dist}index.html`, indexTpl)

// Move icons to dist directory
fs.mkdirsSync(folders.dist + "/icons")
fs.copy(folders.src + "images/icons", folders.dist + "/icons/", function (err) {
  if (err) return console.error(err)
});
fs.copy(folders.src + "images/flood-alert-legend.png", folders.dist + "/flood-alert-legend.png", function (err) {
  if (err) return console.error(err)
});

//setup webpack plugins
const plugins = []
if (isProd) {
  plugins.push(new MiniCssExtractPlugin({filename: 'styles.css'}))
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }))
}

plugins.push(new webpack.DefinePlugin({
  VERSION: JSON.stringify(require("./package.json").version),
  RELEASE: JSON.stringify(require("./package.json").release),
  SITE_URL: JSON.stringify(require("./package.json").site_url)
}))

export default {
  entry: `${folders.src}entry.jsx`,
  mode: webpackMode,
  output: {
    path: `${folders.dist}assets/`,
    publicPath: '/assets/',
    filename: 'scripts.js'
  },
  devServer: {
    contentBase: './dist',
    progress: true,
    watchContentBase: true,
    port: 3545
  },
  module: {
    // noParse: [/aws-sdk/],
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: isProd ? [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          : ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      },
      {
        test: /\.css$/,
        use: isProd ? [MiniCssExtractPlugin.loader, 'css-loader']
          : ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|gif|ico|woff)$/,
        loader: 'url-loader?limit=65536'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(es|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(mss|sql)$/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    // allows extension-less require/import statements for files with these extensions
    extensions: ['.es', '.js', '.jsx'],
    alias: {
      leaflet_css: __dirname + '/node_modules/leaflet/dist/leaflet.css',
      leaflet_marker: __dirname + '/node_modules/leaflet/dist/images/marker-icon.png',
      leaflet_marker_2x: __dirname + '/node_modules/leaflet/dist/images/marker-icon-2x.png',
      leaflet_marker_shadow: __dirname + '/node_modules/leaflet/dist/images/marker-shadow.png'
    }
  },
  plugins
}
