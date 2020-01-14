class Tokens {
  constructor (actions) {
    this.actions = actions
  }

  getAssets () {
    this.actions.dispatch({ type: '*TOKENS.GET_ASSETS' })
  }

  getTokenData ({ tokenAddress, chainId }) {
    this.actions.dispatch({ type: '*TOKENS.GET_DATA', payload: { tokenAddress, chainId } })
  }


  getBalance ({ chainId, tokenAddress, account, currentAddress }) {
    this.actions.dispatch({ type: '*TOKENS.GET_BALANCE', payload: { chainId, tokenAddress, account, currentAddress } })
  }


  generateLink ({ chainId, currentAddress }) {
    this.actions.dispatch({ type: '*TOKENS.GENERATE_LINK', payload: { chainId, currentAddress } })
  }


  setTokenData ({ tokenSymbol }) {
    this.actions.dispatch({ type: '*TOKENS.SET_DATA', payload: { tokenSymbol } })
  }

  emptyTokenData () {
    this.actions.dispatch({ type: '*TOKENS.EMPTY_DATA' })
  }
}

export default Tokens
