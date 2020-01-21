import reducers from './reducers'

const initialState = {
  assets: [],
  symbol: null,
  loading: false,
  balance: null,
  currentBalance: null
}

export default (state = initialState, action = {}) => {
  const newState = { ...state }
  const { type } = action
  const actionMethod = ACTIONS[type]
  if (!actionMethod) return newState
  return actionMethod(newState, action)
}

const ACTIONS = {
  'TOKENS.SET_ASSETS': reducers.setAssets,
  'TOKENS.SET_SYMBOL': reducers.setSymbol,
  'TOKENS.SET_BALANCE': reducers.setBalance,
  'TOKENS.SET_LOADING': reducers.setLoading,
  'TOKENS.SET_CURRENT_BALANCE': reducers.setCurrentBalance
}
