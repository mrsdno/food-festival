const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

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
  devServer: {
    static: "./",
  },
  optimization: {
    runtimeChunk: "single",
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
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("assets/img/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ],

  // provide the mode in which we want the webpack to run
  // by default wants to run in 'production' which will minify all code automatically
  mode: "development",
};
