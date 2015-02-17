var webpack = require('webpack');

const ADDRESS = '0.0.0.0';
const PORT = 3000;

module.exports = {

    address: ADDRESS,
    port: PORT,
    devtool: 'source-map',
    watch: process.env.NODE_ENV === 'dev',
    entry: [
        'webpack-dev-server/client?http://' + ADDRESS + ':' + PORT,
        'webpack/hot/only-dev-server',
        __dirname + '/src/index.es6'
    ],
    module: {
        loaders: [
            { test: /\.(jsx|es6)$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader?optional=selfContained'] }
        ]
    },
    output: {
        path: __dirname + '/build',
        filename: 'react-webrtc.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.es6']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
