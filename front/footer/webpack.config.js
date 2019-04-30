const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const context = resolve(__dirname, 'src');

module.exports = {
  entry: {
    app: ['./']
  },

  output: {
    publicPath: '/footer'
  },
  context,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-react-jsx']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      title: 'React App',
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    })
  ]
};
