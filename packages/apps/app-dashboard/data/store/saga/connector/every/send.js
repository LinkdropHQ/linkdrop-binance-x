import { put, select } from 'redux-saga/effects'
import { createSignTx, byteArrayToBase64, stringToByteArray } from 'helpers'
import { delay } from 'redux-saga'
import base58check from 'base58check'
import hex from 'string-hex'
import toBytes from 'to-byte-array'

console.log({ base58check })

const encodeAddress = function ({ address }) {
  const hexAddress = hex(address)
  const addressBase58Check = base58check.encode(hexAddress)
  const addressBase58CheckByteArray = new Uint8Array(toBytes(addressBase58Check))
  console.log({ address, hexAddress, addressBase58Check, addressBase58CheckByteArray })
  return byteArrayToBase64({ byteArray: addressBase58CheckByteArray })
}

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
    const toAddressEncoded = encodeAddress({ address: toAddress })
    const fromAddressEncoded = encodeAddress({ address: fromAddress })
    
    console.log({
      toAddressEncoded,
      fromAddressEncoded
    })

    const signTx = createSignTx({
      chainId: 'Binance-Chain-Tigris',
      toAddress: toAddressEncoded,
      fromAddress: fromAddressEncoded,
      amount: amount * linksAmount,
      symbol,
      sequence,
      accountNumber
    })

    console.log({ signTx })
    
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
  accountNumber: ({ user: { accountNumber }}) => accountNumber
}
