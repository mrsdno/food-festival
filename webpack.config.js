const path = require("path");
const webpack = require("webpack");

module.exports = {
  // root of the bundle and the beginning of the dependency graph
  // give it the relative path to the clients code
  entry: "./assets/js/script.js",

  // specify the output folder
  // best practice to bundle into folder named dist for 'distribution
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },

  // Whenever you work with libraries that are dependent on the use of a global variable
  //  you must tell webpack to make exceptions using webpack.ProvidePlugin
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],

  // provide the mode in which we want the webpack to run
  // by default wants to run in 'production' which will minify all code automatically
  mode: "development",
};