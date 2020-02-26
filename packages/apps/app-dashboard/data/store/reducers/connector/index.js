import reducers from './reducers'

const initialState = {
  status: null,
  loading: false
}

export default (state = initialState, action = {}) => {
  const newState = { ...state }
  const { type } = action
  const actionMethod = ACTIONS[type]
  if (!actionMethod) return newState

  return actionMethod(newState, action)
}

const ACTIONS = {
  'CONNECTOR.SET_STATUS': reducers.setStatus,
  'CONNECTOR.SET_LOADING': reducers.setLoading
}
