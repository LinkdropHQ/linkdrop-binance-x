import { Connectors } from 'web3-react'
import { infuraPk } from 'app.config.js'
const { NetworkOnlyConnector } = Connectors

const Infura = new NetworkOnlyConnector({
  providerURL: `https://mainnet.infura.io/v3/${infuraPk}`
})

export default { Infura }
