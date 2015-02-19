var webpack = require('webpack'),
    colors = require('colors');

if (process.env.NODE_ENV !== 'dev') {

    throw 'Dev build only!'.red;
}

const ADDRESS = '0.0.0.0';
const PORT = 3000;

module.exports = {

    address: ADDRESS,
    port: PORT,
    devtool: 'source-map',
    watch: true,
    entry: [
        'webpack-dev-server/client?http://' + ADDRESS + ':' + PORT,
        'webpack/hot/only-dev-server',
        __dirname + '/examples/main.jsx'
    ],
    module: {
        loaders: [
            { test: /\.(jsx|es6)$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader?optional=selfContained'] }
        ]
    },
    output: {
        path: __dirname + '/',
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
