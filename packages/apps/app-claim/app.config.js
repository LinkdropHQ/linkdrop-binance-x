/* global INFURA_PK */
let config

try {
  config = require('../../../configs/app.config.json')
} catch (e) {
  config = {}
}

const infuraPk = INFURA_PK || String(config.infuraPk)

module.exports = {
  infuraPk
}
