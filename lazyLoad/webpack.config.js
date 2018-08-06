var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry:  './main.js',
    output: {
        path: path.resolve(__dirname ,'dist'), 
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
              test: /\.(html)$/,
              use: {
                loader: 'html-loader'
              }
            }
        ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      }
    }
}