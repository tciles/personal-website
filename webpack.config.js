const path = require('path');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: !devMode ? 'production' : 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: devMode ? '[name].js' : '[name].[hash:5].js',
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        inline: true,
        // https: true,
        compress: true,
        watchOptions: {
            ignored: "src",
        },
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\\/]node_modules[\\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
        ]
    },
    plugins: [
        new HtmWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash:5].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash:5].css'
        }),
        devMode && new webpack.HotModuleReplacementPlugin()
    ],
};
