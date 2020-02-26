import reducers from './reducers'

const initialState = {
  loading: false,
  step: null,
  currentAddress: null,
  chainId: null,
  senderPrivateKey: null,
  senderAddress: null,
  verifierPrivateKey: null,
  verifierAddress: null,
  txHash: null,
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
  'USER.SET_TX_HASH': reducers.setTxHash,
  'USER.SET_SDK': reducers.setSdk,
  'USER.SET_WC_INSTANCE': reducers.setWCInstance,
  'USER.SET_CONNECTOR_NAME': reducers.setConnectorName,
  'USER.SET_ACCOUNT_NUMBER': reducers.setAccountNumber,
  'USER.SET_SEQUENCE': reducers.setSequence,
  'USER.SET_SENDER_PRIVATE_KEY': reducers.setSenderPrivateKey,
  'USER.SET_SENDER_ADDRESS': reducers.setSenderAddress,
  'USER.SET_VERIFIER_PRIVATE_KEY': reducers.setVerifierPrivateKey,
  'USER.SET_VERIFIER_ADDRESS': reducers.setVerifierAddress
}
