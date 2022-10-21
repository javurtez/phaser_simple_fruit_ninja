const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const packageJSON = require('../package.json');

// ** Define Global Constants
var instDefine = new webpack.DefinePlugin({
    __PKG_VERSION__: JSON.stringify(packageJSON.version),
    __PKG_NAME__: JSON.stringify(packageJSON.name),
    __PKG_DESC__: JSON.stringify(packageJSON.description),
});

var instHTML = new HtmlWebpackPlugin({
    title: packageJSON.description,
    filename: path.join(__dirname, '../public/') + '/index.html',
    template: "./src/index.html",
    minify: true,
    inject: false
});

module.exports = {
    mode: "production",
    entry: {
        app: './src/ts/Game.js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    externals: {
        phaser: 'Phaser'
    },
    output: {
        clean: true,
        filename: 'app.js',
        path: path.join(__dirname, '../public/')
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    },
    devtool: false,
    plugins: [
        instDefine,
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './node_modules/phaser/dist/phaser.min.js',
                    to: 'lib'
                },
                {
                    from: './src/*.css',
                    to: '[name][ext]'
                },
                {
                    from: './src/assets',
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.md']
                    }
                }
            ]
        }),
        instHTML
    ],
    performance: {
        assetFilter: function (assetFilename) {
            let customExclusions = ['lib/phaser.min.js'];
            if (customExclusions.includes(assetFilename)) {
                return false;
            }
            return !/\.map$/.test(assetFilename);
        }
    }
};
