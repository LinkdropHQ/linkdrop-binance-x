/* global INFURA_PK, CLAIM_HOST, DEFAULT_CHAIN_ID */
let config

try {
  config = require('../../../configs/app.config.json')
} catch (e) {
  config = {}
}

const claimHost = CLAIM_HOST || String(config.claimHost)
const infuraPk = INFURA_PK || String(config.infuraPk)
const linksLimit = config.linksLimit || String(config.linksLimit) || 1000
const defaultChainId = DEFAULT_CHAIN_ID || String(config.defaultChainId)

module.exports = {
  claimHost,
  infuraPk,
  linksLimit,
  defaultChainId
}
