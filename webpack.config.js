var path = require('path');
var webpack = require('webpack');

var config = {
  entry: "./assets/js/entry.js",
  output: {
    path: path.join(__dirname, "assets/js/generated"),
    filename: "bundle.js"
  },
  devtool: "#source-map",
  module: {
    loaders: [
      {
        // components.js is effectively a hand-rolled bundle.js. Break it apart.
        test: /components\.js$/,
        loader: "imports?this=>window"
      },
      {
        test: /foundation\.js$/,
        loader: "imports?this=>window"
      },
      {
        test: /\.modernizrrc/,
        loader: "modernizr"
      },
      {
        // Loaders are executed bottom to top, right to left. This MUST
        // appear before the \.coffee loader.
        test: /wow\.coffee$/,
        loaders: [ "imports?this=>window", "exports?this.WOW" ]
      },
      {
        test: /\.coffee$/, loader: "coffee-loader"
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, "./.modernizrrc"),
      jquery: "jquery/src/jquery"
    }
  },
  plugins: [
    // See http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
    new webpack.ProvidePlugin({
      "$": "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery" 
    })
  ]
};

module.exports = config;