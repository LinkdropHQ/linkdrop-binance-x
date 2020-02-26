import { put } from 'redux-saga/effects'
import sdk from '@linkdrop/binance-sdk'
import { ethers } from 'ethers'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const { linkKey, host } = payload
    const linkId = new ethers.Wallet(linkKey).address
    const { isClaimed, txHash } = yield sdk.isClaimed({ apiHost: `https://${host}`, linkId })
    yield put({ type: 'USER.SET_ALREADY_CLAIMED', payload: { alreadyClaimed: isClaimed } })
    yield put({ type: 'USER.SET_READY_TO_CLAIM', payload: { readyToClaim: true } })
    if (isClaimed) {
      yield put({ type: 'TOKENS.SET_TRANSACTION_ID', payload: { transactionId: txHash } })
      yield put({ type: 'USER.SET_STEP', payload: { step: 5 } })
    } else {
      yield put({ type: 'USER.SET_STEP', payload: { step: 1 } })
    }
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
