module.exports = {
  mode: 'development',

  entry: {
    legacy: './legacy/src/index.js'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  }
};
