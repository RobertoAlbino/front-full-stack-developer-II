const webpack = require('webpack');
const path = require('path');
// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

exports.config = {
  entry: {
    main: './src/index.js',
  },
  output: {
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].[hash:20].js',
    path: path.resolve(__dirname, 'dist/static')
  },
  resolve: {
    alias: {
      '@views': path.resolve(__dirname, './../src/app/views'),
      '@node': path.resolve(__dirname, '../node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        },
        exclude: /node_modules/
      }, {
        test: /\.html$/,
        loader: 'raw-loader'
      }, {
        test: /\.(eot|svg|ico)$/,
        loader: 'file-loader?name=assets/[name].[ext]',
      }, {
        test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        loader: 'url-loader?name=assets/[name].[hash:20].[ext]&limit=10000',
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        include: /node_modules/
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'sass-loader'
        }),
        include: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'dependency',
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new CleanWebpackPlugin(['dist'], null),
  ],
  devServer: {
    stats: 'minimal',
    port: 9000,
  },
  stats: {
    assets: true,
    children: false,
    errors: true,
    errorDetails: true,
    modules: false,
    warnings: false,
  }
};
