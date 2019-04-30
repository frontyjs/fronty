module.exports = [
  // Fronty itself
  {
    mode: 'production',
    entry: {
      fronty: '@frontyjs/core/src/index.js'
    }
  },

  // Legacy app
  {
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
  },

  // Our modern app
  {
    mode: 'development',

    entry: {
      modern: './modern/index.jsx'
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        }
      ]
    }
  }
];
