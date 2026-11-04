const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';


  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin(),
    ],
    devServer: {
      port: 3000,
      open: true
    },
  };
};