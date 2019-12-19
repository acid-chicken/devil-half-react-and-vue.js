/* eslint-disable @typescript-eslint/no-var-requires */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const {
  NODE_ENV = 'development',
} = process.env

/**
 * @type {import('webpack').Configuration}
 */ module.exports = {
  mode: NODE_ENV,
  entry: [
    path.join(__dirname, 'src', 'index.tsx'),
  ],
  output: {
    publicPath: '/',
    filename: '[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.[cs]ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              shadowMode: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '.css',
      '.js',
      '.jsx',
      '.sss',
      '.ts',
      '.tsx',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[chunkhash].css',
      filename: '[chunkhash].css',
    }),
    new VueLoaderPlugin,
  ],
  optimization: {
    concatenateModules: true,
    minimize: true,
    minimizer: [
      new TerserPlugin,
    ],
    removeEmptyChunks: true,
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      maxSize: 1e5,
    },
    usedExports: true,
  },
}
