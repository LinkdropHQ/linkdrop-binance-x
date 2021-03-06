/* global INFURA_PK, FEE, MULTISEND_FEE, CLAIM_HOST, DEFAULT_CHAIN_ID, LINKS_LIMIT */
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
const fee = FEE || config.binanceFee
const multisendFee = MULTISEND_FEE || config.binanceMultisendFee
const host = HOST || config.host

module.exports = {
  claimHost,
  infuraPk,
  linksLimit,
  defaultChainId,
  fee,
  multisendFee,
  host
}
