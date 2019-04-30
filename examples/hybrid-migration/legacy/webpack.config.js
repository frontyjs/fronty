var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/app/index.js'],
    vendors: ['jquery', 'angular', 'angular-ui-router']
  },

  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve('./public'),
    publicPath: '/'
  },

  context: __dirname,

  devtool: 'eval',

  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.json$/, loader: 'json' },
      { test: /jquery\.js$/, loader: 'expose?$' },
      { test: /jquery\.js$/, loader: 'expose?jQuery' }
    ],

    noParse: [/^jquery(\-.*)?$/, /^angular(\-.*)?$/]
  },

  plugins: [
    new ngAnnotatePlugin({
      add: true
    }),

    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/[name].bundle.js')
  ]
};
