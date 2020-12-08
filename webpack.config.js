const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
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
        open: false,
        port: 3000,
        overlay: true,
        compress: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
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
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[folder].[name].[local]',
                            },
                        },
                    },
                ],
            },
        ],
    },
};
