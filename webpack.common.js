/* eslint-env node */
const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const info = require("./package.json")


module.exports = {
    entry: {
        "main": './src/main.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'covidTimeSeries',
            template: './src/index.html',
            filename: 'index.html',
            favicon: './src/assets/aris_logo_small.png',
        }),
        new webpack.BannerPlugin(() => {
            return `${info.name}, ${info.version}\n\n${fs.readFileSync('./LICENSE', 'utf-8')}`
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    module: {
        strictExportPresence: true,  // Missing exports fail the build
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'

            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 25000,
                            esModule: false
                        },
                    },
                ]
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ]
    },
    resolve: {
        alias: {
            'src': path.resolve(__dirname, 'src')
        }
    },
    output: {
        filename: "[name].min.js",
    },
};
