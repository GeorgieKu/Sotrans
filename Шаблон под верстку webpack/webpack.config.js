const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Или 'production' для минификации
  entry: './src/js/index.js', // Ваш основной JS файл
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Очищает выходную папку перед каждой сборкой
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Если нужно поддерживать старые браузеры
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // Ваш основной HTML файл
      inject: true,
    }),
  ],
  devtool: 'source-map', // Для отладки
  devServer: {
    static: './dist',
    open: true, // Открывать браузер при запуске
  },
};