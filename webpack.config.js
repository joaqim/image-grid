const CopyWebpackPlugin = require("copy-webpack-plugin");
const yaml = require("js-yaml");
const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {
  return {
    entry: "./js/main",
    context: path.join(__dirname, "src"),
    devtool: "eval-source-map",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 8000,
      hot: true,
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
      new webpack.DefinePlugin({
        "process.env.PUBLIC_URL": env.production
          ? JSON.stringify("https://joaqim.xyz")
          : JSON.stringify("http://localhost:8000"),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: path.join(__dirname, "public") }],
      }),
    ],
  };
};
