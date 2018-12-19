const path = require('path');
const webpack = require('webpack');
const UglifyJS = require("uglify-js");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new UglifyJsPlugin({
    uglifyOptions: {
      output: {
        ascii_only: true
      }
    }
  })
]

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dr'),
    filename: 'index.js',
    library: 'DocReact',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '../example'),
          path.join(__dirname, '../src'),
          path.join(__dirname, '../libs')
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader : 'url-loader'
      },
      {
        test: /\.md$/,
        loader : 'raw-loader'
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals : {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}