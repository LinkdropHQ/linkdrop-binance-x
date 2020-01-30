/* global INFURA_PK, CLAIM_HOST, DEFAULT_CHAIN_ID, LINKS_LIMIT */
let config

try {
  config = require('../../../configs/app.config.json')
} catch (e) {
  config = {}
}

const claimHost = CLAIM_HOST || String(config.claimHost)
const infuraPk = INFURA_PK || String(config.infuraPk)
const linksLimit = LINKS_LIMIT || config.linksLimit || 1000
const defaultChainId = DEFAULT_CHAIN_ID || config.defaultChainId

module.exports = {
  claimHost,
  infuraPk,
  linksLimit,
  defaultChainId
}
