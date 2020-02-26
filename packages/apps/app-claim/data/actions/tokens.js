class Tokens {
  constructor (actions) {
    this.actions = actions
  }

  claimTokens ({ denoms, amounts, linkKey, verifierSignature, receiverAddress, host }) {
    this.actions.dispatch({ type: '*TOKENS.CLAIM_TOKENS', payload: { denoms, amounts, host, linkKey, verifierSignature, receiverAddress } })
  }

  checkIfClaimed ({ host, linkKey }) {
    this.actions.dispatch({ type: '*TOKENS.CHECK_IF_CLAIMED', payload: { host, linkKey } })
  }
}

export default Tokens
