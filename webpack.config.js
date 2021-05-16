const CopyWebpackPlugin = require("copy-webpack-plugin");
const yaml = require("js-yaml");
const path = require("path");
module.exports = {
  entry: "./js/main",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000,
  },
  output: {
    publicPath: "http://localhost:8000/",
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
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
