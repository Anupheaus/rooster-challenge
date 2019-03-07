const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const NotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk');
const TerserPlugin = require('terser-webpack-plugin');

const extractClientCSS = new ExtractTextPlugin({
  filename: 'client.css',
  allChunks: true,
});
const extractLibsCSS = new ExtractTextPlugin({
  filename: 'libs.css',
  allChunks: true,
});

const title = 'Rooster Challenge - Client';

module.exports = {
  entry: {
    client: './src/client/index.tsx',
  },
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: true,
          keep_classnames: true,
          keep_fnames: true,
        },
        sourceMap: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          ...extractClientCSS.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', query: { sourceMap: true } },
              { loader: 'less-loader', query: { sourceMaps: true, silent: true, quiet: true } },
            ],
          }),
        ],
      },
      {
        test: /\.css$/,
        loader: extractLibsCSS.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
          ],
        }),
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
  plugins: [
    extractClientCSS,
    extractLibsCSS,
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['libs.js'],
    }),
    new NotifierPlugin({
      title,
      suppressCompileStart: false,
    }),
    new ProgressBarPlugin({
      format: chalk`  building {blueBright ${title}} [:bar] {green :percent}`,
    }),
  ],
};
