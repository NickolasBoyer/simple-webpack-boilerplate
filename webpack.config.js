const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require('webpack')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/" // for serving on the dev server
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.pug/,
        use: [
          'html-loader',
          'pug-html-loader'
        ],
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Tag Demo',
      template: 'src/index.pug'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
}
