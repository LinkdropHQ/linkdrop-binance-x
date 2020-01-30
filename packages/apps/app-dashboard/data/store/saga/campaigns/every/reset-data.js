import { put } from 'redux-saga/effects'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'CAMPAIGNS.SET_AMOUNT', payload: { amount: null } })
    yield put({ type: 'CAMPAIGNS.SET_SYMBOL', payload: { symbol: null } })
    yield put({ type: 'CAMPAIGNS.SET_DATE', payload: { date: null } })
    yield put({ type: 'CAMPAIGNS.SET_LINKS', payload: { links: [] } })
    yield put({ type: 'CAMPAIGNS.SET_LINKS_AMOUNT', payload: { linksAmount: null } })
    yield put({ type: 'CAMPAIGNS.SET_DEFAULT_WALLET', payload: { defaultWallet: null } })
    yield put({ type: 'CAMPAIGNS.SET_ID', payload: { id: null } })
    yield put({ type: 'USER.SET_SENDER_PRIVATE_KEY', payload: { senderPrivateKey: null } })
    yield put({ type: 'USER.SET_SENDER_ADDRESS', payload: { senderAddress: null } })
    yield put({ type: 'USER.SET_VERIFIER_PRIVATE_KEY', payload: { verifierPrivateKey: null } })
    yield put({ type: 'USER.SET_VERIFIER_ADDRESS', payload: { verifierAddress: null } })
    yield put({ type: 'TOKENS.SET_BALANCE', payload: { balance: null } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
