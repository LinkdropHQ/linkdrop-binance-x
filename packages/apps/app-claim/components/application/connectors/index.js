import { Connectors } from 'web3-react'
const { NetworkOnlyConnector } = Connectors

const Infura = new NetworkOnlyConnector({
  providerURL: 'https://mainnet.infura.io'
})

export default { Infura }
