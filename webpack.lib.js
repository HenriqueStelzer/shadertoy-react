const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require("fs");

class CopyTypesPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap("CopyTypesPlugin", () => {
      fs.copyFileSync(
        path.join(__dirname, "src/index.d.ts"),
        path.join(__dirname, "lib/index.d.ts")
      );
    });
  }
}

module.exports = {
  entry: {
    "glsl-helpers-react": path.join(__dirname, "src/index.jsx"),
    "glsl-helpers-react.min": path.join(__dirname, "src/index.jsx"),
  },
  output: {
    path: path.join(__dirname, "lib/"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
  plugins: [new CopyTypesPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  devServer: {
    port: 3001,
  },
};
