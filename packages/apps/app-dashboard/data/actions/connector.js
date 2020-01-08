class Metamask {
  constructor (actions) {
    this.actions = actions
  }

  sendEth ({ chainId, ethAmount, account }) {
    this.actions.dispatch({ type: '*CONNECTOR.SEND_ETH', payload: { ethAmount, account, chainId } })
  }

  sendErc20 ({ tokenAmount, account, chainId }) {
    this.actions.dispatch({ type: '*CONNECTOR.SEND_ERC20', payload: { chainId, account, tokenAmount } })
  }
}

export default Metamask
