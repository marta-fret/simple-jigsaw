const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/'
  },
  mode: 'production',
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css'
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'i-want-to-play-a-game.html',
      inlineSource: '.(js|css)$'
    }),
    // new HtmlWebpackInlineSourcePlugin(),
    new CopyPlugin([
      { from: 'public/assets', to: 'assets' },
    ]),
    new CleanWebpackPlugin(),
  ]
};
