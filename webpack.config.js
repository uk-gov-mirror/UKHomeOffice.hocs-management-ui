const MinificationPlugin = require('terser-webpack-plugin');

const serverConfig = {
    entry: {
        app: './src/shared/index.jsx'
    },
    output: {
        path: __dirname,
        filename: 'build/server/[name].server.js',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, loader: 'css-loader/locals' }
        ]
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom'
    },
    plugins: [
        new MinificationPlugin({
            sourceMap: true,
            parallel: true
        })
    ],
};


module.exports = [serverConfig];