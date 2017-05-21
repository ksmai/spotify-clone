const AotPlugin = require('@ngtools/webpack').AotPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const paths = require('./paths');

module.exports = {
  devtool: 'source-map',

  entry: {
    polyfills: paths.polyfills,
    main: paths.main,
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: paths.docs,
    publicPath: paths.publicPath,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            conservativeCollapse: false,
          },
        },
      },
      {
        test: /\.(?:sa|s?c)ss$/,
        include: paths.app,
        use: [
          'to-string-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:sa|s?c)ss$/,
        exclude: paths.app,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.ts$/,
        use: '@ngtools/webpack',
      },
      {
        test: /\.(?:gif|svg|png|jpe?g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 7,
              },
              mozjpeg: {
                quality: 30,
              },
              pngquant: {
                quality: 50,
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(?:\\|\/)core(?:\\|\/)@angular/,
      paths.src,
      {}
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[chunkhash].js',
      chunks: ['main'],
      minChunks: function (module) {
        return module.context &&
          module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new AotPlugin({
      tsConfigPath: paths.tsConfig,
      entryModule: paths.entryModule,
    }),
    new HTMLPlugin({
      template: paths.index,
      minify: {
        collapseWhitespace: true,
        caseSensitive: true,
      },
    }),
    new HTMLPlugin({
      filename: '404.html',
      template: paths.index,
      minify: {
        collapseWhitespace: true,
        caseSensitive: true,
      },
    }),
    new FaviconsPlugin(paths.favicon),
  ],
};
