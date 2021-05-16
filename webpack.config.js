const path = require("path");
const yaml = require("js-yaml");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const vendors = ["./vendors/pig.js"];

const webpack = require("webpack");

const PUBLIC_URL = process.env.PUBLIC_URL || "localhost:8000";

module.exports = {
  entry: {
    bundle: "./js/entry.js",
    vendors,
  },
  //entry: { bundle: "./js/entry.js" },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    port: 8000,
  },
  context: path.join(__dirname, "src"),
  stats: {
    // Disable the verbose output on build
    children: false,
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "http://localhost:8000/",
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, "./"),
      "@js": path.resolve(__dirname, "src/js/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@vendors": path.resolve(__dirname, "src/vendors/"),
    },
    extensions: ["", ".js", "sass", "scss"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /.\.ya?ml$/,
        use: [
          {
            loader: "json-loader",
            options: {
              name: "[name].json",
            },
          },
          {
            loader: "yaml-loader",
          },
        ],
      },
      {
        test: /\.s[c|a]ss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        // Don't generate automatic common chunks
        default: false,
        // Don't generate automatic vendor chunks
        vendors: false,
        // Custom common chunk
        bundle: {
          name: "commons",
          chunks: "all",
          minChunks: 3,
          reuseExistingChunk: false,
        },
        // Custom vendor chunk by name
        vendor: {
          chunks: "initial",
          name: "vendors",
          test: "vendors",
        },
        // Merge all the CSS into one file
        styles: {
          name: "styles",
          test: /\.s?css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },

  plugins: [
    //new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: "index.html",
      template: path.join(__dirname, "src", "index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(__dirname, "public") }],
    }),
    new webpack.DefinePlugin({
      "process.env.PUBLIC_URL": JSON.stringify(PUBLIC_URL),
    }),
  ],
};
