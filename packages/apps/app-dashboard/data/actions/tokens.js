class Tokens {
  constructor (actions) {
    this.actions = actions
  }

  getAssets () {
    this.actions.dispatch({ type: '*TOKENS.GET_ASSETS' })
  }

  getBalance () {
    this.actions.dispatch({ type: '*TOKENS.GET_BALANCE' })
  }

  generateLink () {
    this.actions.dispatch({ type: '*TOKENS.GENERATE_LINK' })
  }

  emptyTokenData () {
    this.actions.dispatch({ type: '*TOKENS.EMPTY_DATA' })
  }
}

export default Tokens
