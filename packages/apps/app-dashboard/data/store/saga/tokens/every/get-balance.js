import { put, select, call } from 'redux-saga/effects'
import { getAssets } from 'data/api/tokens'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_ERRORS', payload: { errors: [] } })
    const toAddress = yield select(generator.selectors.toAddress)
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const { balances, address, account_number: accountNumber, sequence } = yield call(getAssets, { address: toAddress })
    console.log({ balances, address, account_number: accountNumber, sequence })

    if (balances && balances.length > 0 && Number(balances[0].free) > 0) {
      yield put({ type: 'TOKENS.SET_BALANCE', payload: { balance: Number(balances[0].free) } })
    }

    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  toAddress: ({ user: { senderAddress } }) => senderAddress
}
