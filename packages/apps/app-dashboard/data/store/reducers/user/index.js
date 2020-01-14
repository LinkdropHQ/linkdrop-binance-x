import reducers from './reducers'

const initialState = {
  loading: false,
  step: null,
  currentAddress: null,
  chainId: null,
  privateKey: null,
  txHash: null,
  version: null,
  sdk: null,
  wcInstance: null,
  connectorName: null
}

export default (state = initialState, action = {}) => {
  const newState = { ...state }
  const { type } = action
  const actionMethod = ACTIONS[type]
  if (!actionMethod) return newState
  return actionMethod(newState, action)
}

const ACTIONS = {
  'USER.SET_LOADING': reducers.setLoading,
  'USER.SET_STEP': reducers.setStep,
  'USER.SET_CURRENT_ADDRESS': reducers.setCurrentAddress,
  'USER.SET_CHAIN_ID': reducers.setChainId,
  'USER.SET_PRIVATE_KEY': reducers.setPrivateKey,
  'USER.SET_TX_HASH': reducers.setTxHash,
  'USER.SET_VERSION_VAR': reducers.setVersionVar,
  'USER.SET_SDK': reducers.setSdk,
  'USER.SET_WC_INSTANCE': reducers.setWCInstance,
  'USER.SET_CONNECTOR_NAME': reducers.setConnectorName
}
