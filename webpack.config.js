const serverConfig = require('./src/server/webpack.config');
const clientConfig = require('./src/client/webpack.config');

module.exports = [
  clientConfig,
  serverConfig,
];
