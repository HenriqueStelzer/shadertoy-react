const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        "shadertoy-react" : path.join(__dirname, "src/index.jsx"),
        "shadertoy-react.min" : path.join(__dirname, "src/index.jsx"),
    },
    output: {
        path: path.join(__dirname, "lib/"),
        filename: "[name].js",
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
            }),
        ],
    },
    devServer: {
        port: 3001
    }
};
