var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var ENV = process.env.NODE_ENV || "develelopment";

var common = {
  entry: {
    "imagescroll": "./src/index.js",
  },

  output: {
    filename: "[name].bundle.js",
    publicPath: "./dist/",
    path: path.resolve(__dirname, "dist"),
    sourceMapFilename: "[name].map"
  },

  module: {
    rules: [
      {
        test: /\.(js|html)$/,
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        include: [
          path.resolve(__dirname, "dist"),
          path.resolve(__dirname, "src")
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "stage-0"]
          }
        }
      },
      {
        test: /\.(html|svelte)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: "svelte-loader"
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ["polyfills", "vendor"].reverse()
    })
  ]
};

var config;
if (ENV === "production") {
  config = merge(common, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          keep_fnames: true
        },
        comments: false
      }),

      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production")
        }
      })
    ]
  });
} else {
  config = merge(common, {
    devtool: "cheap-module-source-map",

    entry: [
      "./src/index.js",
    ],
    
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

module.exports = config;
