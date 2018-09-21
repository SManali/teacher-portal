const path = require('path');
const config = {
    entry: './components/app.jsx',
    output: {
      path: path.join(__dirname, "./dist/javascripts/"),
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          query: {
            presets:
            [
              'es2015',
              'react',
            ],
          },
        },
      ],
    },
  };
  
  module.exports = config;