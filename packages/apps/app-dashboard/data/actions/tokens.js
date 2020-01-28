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


  getBalance () {
    this.actions.dispatch({ type: '*TOKENS.GET_BALANCE' })
  }


  generateLink () {
    this.actions.dispatch({ type: '*TOKENS.GENERATE_LINK' })
  }


  setTokenData ({ tokenSymbol }) {
    this.actions.dispatch({ type: '*TOKENS.SET_DATA', payload: { tokenSymbol } })
  }

  emptyTokenData () {
    this.actions.dispatch({ type: '*TOKENS.EMPTY_DATA' })
  }
}

export default Tokens
