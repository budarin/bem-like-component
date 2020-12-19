const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: process.env.NODE_ENV || 'development',
    devtool: 'inline-source-map',
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
        overlay: true,
        compress: true,
        historyApiFallback: true,
        writeToDisk: true,
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
                include: [path.resolve('./src')],
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
    const StatoscopeWebpackPlugin = require('@statoscope/ui-webpack');

    config.plugins.push(
        new StatoscopeWebpackPlugin({
            saveTo: path.resolve('./dist/statoscope.html'),
            name: 'plugibe',
            open: 'file',
        }),
    );
}

module.exports = config;
