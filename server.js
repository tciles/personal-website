'use strict';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  open: true,
});
const server = new WebpackDevServer(compiler, devServerOptions);

const protocol = "http" + (webpackConfig.devServer.https ? "s" : "");
const port = webpackConfig.devServer.port || 3000;

server.listen(port, '127.0.0.1', () => {
  console.log(`Starting server on ${protocol}://localhost:${port}`);
});