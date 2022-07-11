const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // root of the bundle and the beginning of the dependency graph
  // give it the relative path to the clients code
  // add multiple entry points if you are splitting application into separate modules
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },

  // specify the output folder
  // best practice to bundle into folder named dist for 'distribution
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },

  // regex to process any image file with the file extention .jpg
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },

  // Whenever you work with libraries that are dependent on the use of a global variable
  //  you must tell webpack to make exceptions using webpack.ProvidePlugin
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
  ],

  // provide the mode in which we want the webpack to run
  // by default wants to run in 'production' which will minify all code automatically
  mode: "development",
};