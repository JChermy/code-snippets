const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: './app.js',
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '__build__'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},
            { test: /\.vue$/, use: ['vue-loader']},
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader']}
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'shared',
                    filename: 'shared.js',
                    chunks: 'initial'
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}