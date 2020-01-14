class Connector {
  constructor (actions) {
    this.actions = actions
  }

  send ({ tokenAmount, account, chainId }) {
    this.actions.dispatch({ type: '*CONNECTOR.SEND', payload: { chainId, account, tokenAmount } })
  }
}

export default Connector
