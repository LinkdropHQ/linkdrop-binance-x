/* global API_HOST */
let jsonRpcUrl, masterCopy, factory, claimHost, apiHost
try {
  const config = require('../../../configs/app.config.json')
  apiHost = String(config.apiHost)
} catch (e) {
  apiHost = API_HOST
}

module.exports = {
  jsonRpcUrl,
  claimHost,
  apiHost,
  masterCopy,
  factory
}
