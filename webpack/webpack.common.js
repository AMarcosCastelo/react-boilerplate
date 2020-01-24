/* eslint-disable quote-props */
'use strict'

const { join } = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    join(__dirname, '..', 'src/index')
  ],
  output: {
    path: join(__dirname, '..', 'dist'),
    filename: '[name]-[chunkhash].js'
  },
  resolve: {
    alias: {
      src: join(__dirname, '..', 'src'),
      components: join(__dirname, '..', 'src/components')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      title: 'React App',
      template: join(__dirname, '..', 'src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?modules']
      }
    ]
  }
};
