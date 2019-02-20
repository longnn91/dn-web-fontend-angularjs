/*
    ./webpack.config.js
*/
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
dotenv.config();

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
         {from:'./assets/img',to:'img'},
         {from:'./assets/video',to:'video'},
         {from:'./assets/font',to:'font'}
     ]);

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'app_bundle.js'
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      assets: path.resolve(__dirname, './assets'),
      src: path.resolve(__dirname, './src'),
      modules: path.resolve(__dirname, './src/modules'),
      services: path.resolve(__dirname, './src/services'),
      configs: path.resolve(__dirname, './src/configs'),
      components: path.resolve(__dirname, './src/components'),
      styles: path.resolve(__dirname, './src/styles'),
      base: path.resolve(__dirname, './src/base'),
      i18n: path.resolve(__dirname, './i18n')
    }
  },
  module: {
    rules: [
      { test: /\.(html)$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: [':data-src']
            }
          }
        ]
      },
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          { loader: "file-loader?name=img/[name].[ext]" }
        ]
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'file-loader'
      },
       {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [ 'angular-template-url-loader', 'babel-loader' ]
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig,
    new webpack.DefinePlugin({
      'APP_NAME': JSON.stringify(process.env.APP_NAME),
      'API_URL': JSON.stringify(process.env.API_URL)
    })
  ],
  devServer: {
    contentBase: '/dist',
    historyApiFallback: true,
    host: 'training-frontend.com',
    port: 3002
  }
}
