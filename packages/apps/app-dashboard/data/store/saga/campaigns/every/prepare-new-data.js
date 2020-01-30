import { put, select } from 'redux-saga/effects'

const generator = function * ({ payload }) {
  try {
    const { tokenAmount, linksAmount, tokenSymbol, wallet } = payload
    const id = yield select(generator.selectors.senderAddress)
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    yield put({ type: 'CAMPAIGNS.SET_AMOUNT', payload: { amount: tokenAmount } })
    yield put({ type: 'CAMPAIGNS.SET_DEFAULT_WALLET', payload: { defaultWallet: wallet } })
    yield put({ type: 'CAMPAIGNS.SET_SYMBOL', payload: { symbol: tokenSymbol } })
    yield put({ type: 'CAMPAIGNS.SET_ID', payload: { id } })
    yield put({ type: 'CAMPAIGNS.SET_DATE', payload: { date: new Date() } })
    yield put({ type: 'CAMPAIGNS.SET_LINKS_AMOUNT', payload: { linksAmount } })
    yield put({ type: 'USER.SET_STEP', payload: { step: 2 } })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  senderAddress: ({ user: { senderAddress } }) => senderAddress
}