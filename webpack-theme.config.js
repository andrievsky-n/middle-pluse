const webpack = require('webpack');
const paths = require('./paths');

const isDebug = process.env.NODE_ENV !== 'production';

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
    }),
];

if (!isDebug) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
        }) // eslint-disable-line comma-dangle
    );
}

module.exports = {
    entry: [`${paths.srcThemes}/dw/assets/scripts/theme.js`],
    output: {
        filename: 'theme.js'
    },
    watch: isDebug,
    devtool: isDebug ? 'inline-source-map' : false,
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [paths.src],
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                include: [paths.src],
                exclude: [`${paths.srcScripts}/vendor`],
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins,
    externals: {
        jquery: 'jQuery',
    },
    resolve: {
        modules: [paths.src, 'node_modules'],
    },
};
