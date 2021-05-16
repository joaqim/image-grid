const CopyWebpackPlugin = require("copy-webpack-plugin");
const yaml = require("js-yaml");
const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {
  const PUBLIC_URL = env.production
    ? "https://joaqim.xyz"
    : "http://localhost:8000";
  return {
    entry: "./js/main",
    mode: "development",
    context: path.join(__dirname, "src"),
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
        "process.env.PUBLIC_URL": JSON.stringify(PUBLIC_URL),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: path.join(__dirname, "public") }],
      }),
    ],
  };
};
