var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {

    publicPath: config.output.publicPath,
    hot: true
})
.listen(config.port, config.address, function (err, result) {

  if (err) { console.log(err); }

  console.log('Listening at http://' + config.address + ':' + config.port);
});
