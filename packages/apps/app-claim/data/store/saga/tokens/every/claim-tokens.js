import { put } from 'redux-saga/effects'
import { ethers } from 'ethers'
import sdk from '@linkdrop/binance-sdk'
import defineTrustReceiverAddress from './define-trust-receiver-address'

const generator = function * ({ payload }) {
  try {
    let { asset, amount, linkKey, verifierSignature, receiverAddress, host } = payload
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    if (!receiverAddress) {
      receiverAddress = yield defineTrustReceiverAddress()
    }
    const receiverSignature = yield sdk.signReceiverAddress({
      linkKey,
      receiverAddress
    })

    const linkId = new ethers.Wallet(linkKey).address
    const { success, txHash } = yield sdk.claim({
      receiverSignature,
      apiHost: host,
      linkId,
      asset,
      amount,
      receiverAddress,
      verifierSignature
    })

    if (success) {
      yield put({ type: 'TOKENS.SET_TRANSACTION_ID', payload: { transactionId: txHash } })
      yield put({ type: 'USER.SET_STEP', payload: { step: 5 } })
    }
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

export default generator

generator.selectors = {
  wallet: ({ user: { wallet } }) => wallet
}
