const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const moderntInclude = require('./moderntInclude');

const srcPath = path.resolve('./src');
const isProd = process.env.NODE_ENV === 'production';

const config = {
    mode: process.env.NODE_ENV || 'development',
    devtool: isProd ? false : 'inline-source-map',
    entry: {
        client: [path.resolve('./src/index.tsx')],
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve('./dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/assets/index.html'),
        }),
    ],
    devServer: {
        hot: true,
        open: true,
        port: 3000,
        client: {
            overlay: false,
        },
        compress: true,
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true,
        },
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        modules: ['node_modules', 'src'],
        alias: {},
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx|json)$/,
                include: moderntInclude([srcPath]),
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

if (process.env.NODE_ENV === 'production') {
    const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

    config.plugins.push(
        new StatoscopeWebpackPlugin({
            saveTo: path.resolve('./dist/statoscope.html'),
            name: 'plugibe',
            open: 'file',
        }),
    );
}

module.exports = config;
