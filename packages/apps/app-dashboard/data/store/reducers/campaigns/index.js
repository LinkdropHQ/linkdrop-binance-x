import reducers from './reducers'
const ls = (typeof window === 'undefined' ? {} : window).localStorage
const campaigns = ls && ls.getItem && ls.getItem('campaigns')
const campaignsDecoded = campaigns ? JSON.parse(window.atob(campaigns)) : []
const initialState = {
  amount: null,
  symbol: null,
  linksAmount: null,
  date: null,
  links: [],
  items: campaignsDecoded,
  current: null,
  id: null,
  defaultWallet: null,
  apiHost: null,
  fee: null,
  commonAmount: null,
  error: null
}

export default (state = initialState, action = {}) => {
  const newState = { ...state }
  const { type } = action
  const actionMethod = ACTIONS[type]
  if (!actionMethod) return newState
  return actionMethod(newState, action)
}

const ACTIONS = {
  'CAMPAIGNS.SET_AMOUNT': reducers.setAmount,
  'CAMPAIGNS.SET_SYMBOL': reducers.setSymbol,
  'CAMPAIGNS.SET_LINKS_AMOUNT': reducers.setLinksAmount,
  'CAMPAIGNS.SET_LINKS': reducers.setLinks,
  'CAMPAIGNS.SET_DATE': reducers.setDate,
  'CAMPAIGNS.SET_ITEMS': reducers.setItems,
  'CAMPAIGNS.SET_CURRENT': reducers.setCurrent,
  'CAMPAIGNS.SET_ID': reducers.setId,
  'CAMPAIGNS.SET_FEE': reducers.setFee,
  'CAMPAIGNS.SET_DEFAULT_WALLET': reducers.setDefaultWallet,
  'CAMPAIGNS.SET_API_HOST': reducers.setApiHost,
  'CAMPAIGNS.SET_COMMON_AMOUNT': reducers.setCommonAmount,
  'CAMPAIGNS.SET_ERROR': reducers.setError
}
