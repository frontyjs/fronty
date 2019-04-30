const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const context = resolve(__dirname, 'src');

module.exports = {
  entry: {
    app: ['./']
  },

  context,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      title: 'Orchestrator',
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      template: 'index.html'
    })
  ],

  devServer: {
    proxy: {
      '/content': {
        target: 'http://localhost:3030'
      },

      '/footer': {
        target: 'http://localhost:4040'
      }
    }
  }
};
