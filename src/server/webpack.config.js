const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require("path");
const NotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

const extractServerCSS = new ExtractTextPlugin({
  filename: 'server.css',
  allChunks: true,
});

const title = 'Rooster Challenge - Server';

module.exports = {
  entry: {
    server: './src/server/index.ts',
  },
  devtool: false,
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          ...extractServerCSS.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', query: { sourceMap: true } },
              { loader: 'less-loader', query: { sourceMaps: true, silent: true, quiet: true } },
            ],
          }),
        ],
      },
      {
        test: /\.pug$/,
        use: [
          "html-loader",
          "pug-html-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: true,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true,
        },
        sourceMap: true,
      }),
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),
    new NotifierPlugin({
      title,
      suppressCompileStart: false,
    }),
    new ProgressBarPlugin({
      format: chalk`  building {blueBright ${title}} [:bar] {green :percent}`,
    }),
    new NodemonPlugin({
      nodeArgs: []
    }),
  ],
  node: {
    __dirname: true,
  },
};