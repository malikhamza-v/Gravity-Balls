const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  watchOptions: {
    ignored: "**/node_modules",
  },
  entry: { bundle: "./src/js/index.js" },
  output: {
    path: __dirname + "/dist/",
    filename: "./js/index.[name].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["dist"] },
      files: ["./dist/*"],
      notify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: "favicon.ico",
      template: "src/index.html",
    }),
  ],
  devtool: "source-map",
};
