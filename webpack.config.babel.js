import fs from 'fs-extra'
import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isProd = process.env.NODE_ENV === 'production'
const webpackMode = process.env.NODE_ENV
console.log('running in ' + webpackMode + ' mode!')

const folders = {
  dist: path.join(__dirname, 'dist/'),
  src: path.join(__dirname, 'src/')
}

// Move index file to dist directory
fs.copy(`${folders.src}index.html`, `${folders.dist}index.html`, function (err) {
  if (err) return console.error(err)
});
// Move icons to dist directory
fs.mkdirsSync(folders.dist + "/icons")
fs.copy(folders.src + "images/icons", folders.dist + "/icons/", function (err) {
  if (err) return console.error(err)
});

//setup webpack plugins
const plugins = [
  new MiniCssExtractPlugin({filename: '[name].css'}),
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(require("./package.json").version),
    RELEASE: JSON.stringify(require("./package.json").release),
    SITE_URL: JSON.stringify(require("./package.json").site_url)
  })
]

if (isProd) {
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }))
}

export default {
  entry: {
    'main': [`${folders.src}entry.jsx`],
    'vendor': [`${folders.src}/vendor/index.js`]
  },
  mode: webpackMode,
  output: {
    path: `${folders.dist}assets/`,
    publicPath: '/assets/',
    filename: '[name].bundle.js'
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|ico|woff)$/,
        loader: 'url-loader?limit=65536&name=[name].[ext]'
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
