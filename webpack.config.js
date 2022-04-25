const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintPlugin = require("eslint-webpack-plugin");

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 3000,
          contentBase: path.join(__dirname, "public"),
        },
      };

module.exports = ({ develop }) => ({
  mode: develop ? "development" : "production",
  devtool: develop ? "inline-source-map" : false,
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    filename: "[name]bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
    publicPath: "/",
    // chunkFilename: '[name].chunk.js',
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|git|png|jpg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@modules": path.resolve(__dirname, "src/modules"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {from: './public'}
    //   ]
    // }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new EslintPlugin({
      extensions: ["ts", "js"],
    }),
  ],
  devServer: {
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
    // contentBase: path.join(__dirname, 'public')
  },
});
