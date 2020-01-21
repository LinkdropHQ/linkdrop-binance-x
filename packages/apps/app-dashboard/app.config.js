/* global MASTER_COPY, INFURA_PK, FACTORY, CLAIM_HOST */
let config

try {
  config = require('../../../configs/app.config.json')
} catch (e) {
  config = {}
}

const masterCopy = MASTER_COPY || String(config.masterCopy)
const factory = FACTORY || String(config.factory)
const claimHost = CLAIM_HOST || String(config.claimHost)
const infuraPk = INFURA_PK || String(config.infuraPk)
const linksLimit = config.linksLimit || 1000
const deploymentUrl = DEPLOYMENT_URL || config.deploymentUrl || 'http://localhost:9004'

module.exports = {
  claimHost,
  masterCopy,
  factory,
  infuraPk,
  linksLimit,
  deploymentUrl
}
