const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // set mode to dev to set process.env.NODE_ENV on DefinePlugin to value development
  mode: 'development',
  // entry point for this application will be in client dir w/in index.js
  entry: path.resolve('client', 'index.jsx'),
  output: {
    // output will be stored in dist dir
    path: path.resolve('dist'),
    // naming bundled file
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        // match & resolve js & jsx files w/ their corresponding loader
        test: /\.(js|jsx)$/,
        // ignore transpiling node_modules
        exclude: /node_modules/,
        // use the babel loader for transpiling code
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // pure CSS (i.e. w/o CSS modules)
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    // new webpack.EnvironmentPlugin(['GOOGLE_MAP_KEY']),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     GOOGLE_MAP_KEY: JSON.stringify(process.env),
    //   },
    // }),
    new Dotenv({ ignoreStub: true, systemvars: true }),
    // new Dotenv({ ignoreStub: true }),
  ],
};
