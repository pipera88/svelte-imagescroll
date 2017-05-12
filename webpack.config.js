var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
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
    new HtmlWebpackPlugin({
      chunksSortMode: "dependency"
    })
  ]
};

var config;
if (ENV === "production") {
  config = merge(common, {
    devtool: "cheap-source-map",

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
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: ["polyfills", "vendor"].reverse()
      })
    ]
  });
} else {
  config = {
    devtool: 'source-map',
    entry: [
      "./src/index.js",
      "webpack/hot/dev-server",
      "webpack-dev-server/client?http://localhost:8090"
    ],
    output: {
      filename: "bundle.js",
      publicPath: '/dist/',
      path: path.resolve(__dirname, "dist")
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(html|svelte)$/,
          exclude: /node_modules/,
          use: "svelte-loader"
        },
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader"
        }
      ]
    }
  };
}

module.exports = config;
