const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.less|\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    index: 'i-want-to-play-a-game.html',
    port: 3000,
    open: true,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css'
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'i-want-to-play-a-game.html'
    }),
    new CopyPlugin([
      { from: 'public/assets', to: 'assets' },
    ]),
  ]
};
