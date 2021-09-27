const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => ({
  entry: "./src/index.ts",
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: ["sass-to-string", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      crypto: false,
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
