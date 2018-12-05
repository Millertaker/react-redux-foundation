const path = require('path');

const paths = {
  DIST: path.resolve(__dirname, '../devsrv/js'),
  SRC: path.resolve(__dirname, '../src'),
  JS: path.resolve(__dirname, '../src'),
};
// Webpack configuration
module.exports = {
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.min.js',
  },
  // Tell webpack to use html plugin
  plugins: [
  ],
  //for development
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
          }
        },
      }
    ],
  }
};
