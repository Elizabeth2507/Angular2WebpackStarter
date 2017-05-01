"use strict";
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        'polyfills': './angular2App/polyfills.ts',
        'vendor': './angular2App/vendor.ts',
        'app': './angular2App/app/main.ts'
    },
    devtool: 'source-map',
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },
    output: {
        path: path.join(__dirname, 'wwwroot'),
        filename: 'js/[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name].[ext]',
            },

            // Load css files which are required in vendor.ts
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            }
        ]
    },
    plugins: [
         new ExtractTextPlugin('css/[name].bundle.css'),
         new webpack.optimize.CommonsChunkPlugin({
             name: ['app', 'vendor', 'polyfills']
         }),
         new CleanWebpackPlugin(
             [
                 './wwwroot/js/',
                 './wwwroot/css/',
                 './wwwroot/assets/',
                 './wwwroot/index.html'
             ]
         ),
         // inject in index.html
         new HtmlWebpackPlugin({
             template: './angular2App/index.html',
             inject: 'body',
             filename: 'index.html'
         }),
        
        new webpack.ContextReplacementPlugin(
  /angular(\\|\/)core(\\|\/)@angular/,
  path.resolve(__dirname, '../angular2app')
)

     
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};