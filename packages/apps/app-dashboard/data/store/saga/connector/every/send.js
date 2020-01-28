import { put, select } from 'redux-saga/effects'
import { createSignTx } from 'helpers'
import { delay } from 'redux-saga'

const signTransaction = function ({ chainId, signTx, wcInstance }) {
  return new Promise((resolve, reject) => {
    console.log({ chainId, signTx })
    wcInstance.trustSignTransaction(chainId, signTx)
      .then(result => {
        console.log({ result })
        resolve(result)
      })
      .catch(error => {
        // Error returned when rejected
        console.error({ error })
        reject(error)
      })
  })
}

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'METAMASK.SET_STATUS', payload: { status: 'initial' } })
    yield put({ type: 'METAMASK.SET_STATUS', payload: { status: 'initial' } })
    const wcInstance = yield select(generator.selectors.wcInstance)
    const chainId = yield select(generator.selectors.chainId)
    const toAddress = yield select(generator.selectors.toAddress)
    const fromAddress = yield select(generator.selectors.fromAddress)
    const amount = yield select(generator.selectors.amount)
    const symbol = yield select(generator.selectors.symbol)
    const linksAmount = yield select(generator.selectors.linksAmount)
    const sequence = yield select(generator.selectors.sequence)
    const accountNumber = yield select(generator.selectors.accountNumber)
    const assets = yield select(generator.selectors.assets)
    const bnbAssets = assets.find(asset => asset.symbol === 'BNB')


    const signTx = createSignTx({
      chainId: 'Binance-Chain-Tigris',
      toAddress,
      fromAddress,
      amount: amount * linksAmount,
      symbol,
      sequence,
      accountNumber,
      feeSymbol: 'BNB',
      feeAmount: Number(bnbAssets.free) / 100
    })
    
    const transaction = yield signTransaction({ chainId, signTx, wcInstance })
    console.log({ transaction })
    delay(3000)
    if (String(result) === 'null') {
      yield put({ type: 'METAMASK.SET_STATUS', payload: { status: 'finished' } })
    }
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  amount: ({ campaigns: { amount } }) => amount,
  symbol: ({ campaigns: { symbol } }) => symbol,
  linksAmount: ({ campaigns: { linksAmount } }) => linksAmount,
  fromAddress: ({ user: { currentAddress } }) => currentAddress,
  toAddress: ({ user: { senderAddress } }) => senderAddress,
  wcInstance: ({ user: { wcInstance }}) => wcInstance,
  chainId: ({ user: { chainId }}) => chainId,
  sequence: ({ user: { sequence }}) => sequence,
  assets: ({ tokens: { assets }}) => assets,
  accountNumber: ({ user: { accountNumber }}) => accountNumber
}
