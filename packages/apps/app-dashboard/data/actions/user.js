class User {
  constructor (actions) {
    this.actions = actions
  }

  setStep ({ step }) {
    this.actions.dispatch({ type: 'USER.SET_STEP', payload: { step } })
  } 

  createKeys () {
    this.actions.dispatch({ type: '*USER.CREATE_KEYS' })
  }

  setCurrentAddress ({ currentAddress }) {
    this.actions.dispatch({ type: 'USER.SET_CURRENT_ADDRESS', payload: { currentAddress } })
  }

  setWCInstance ({ wc }) {
    console.log({ wc })
    this.actions.dispatch({ type: '*USER.SET_WC_INSTANCE', payload: { wc } })
  }

  setChainId ({ chainId }) {
    this.actions.dispatch({ type: 'USER.SET_CHAIN_ID', payload: { chainId } })
  }
}

export default User
