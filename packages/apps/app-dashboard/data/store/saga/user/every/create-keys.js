/* global web3 */
import { put, select } from 'redux-saga/effects'
import { ethers } from 'ethers'
const BnbApiClient = require('@binance-chain/javascript-sdk')

const generator = function * () {
  try {
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const newWallet = ethers.Wallet.createRandom()
    const api = 'https://dex.binance.org/'
    const bnbClient = new BnbApiClient(api)
    yield bnbClient.chooseNetwork('mainnet')
    const { privateKey: senderPrivateKey, address: senderAddress } = yield bnbClient.createAccount()
    console.log({ senderPrivateKey, senderAddress })
    const { address: verifierAddress, privateKey: verifierPrivateKey } = newWallet
    console.log({ verifierAddress, verifierPrivateKey })
    yield put({ type: 'USER.SET_VERIFIER_PRIVATE_KEY', payload: { verifierPrivateKey } })
    yield put({ type: 'USER.SET_VERIFIER_ADDRESS', payload: { verifierAddress } })
    yield put({ type: 'USER.SET_SENDER_PRIVATE_KEY', payload: { senderPrivateKey } })
    yield put({ type: 'USER.SET_SENDER_ADDRESS', payload: { senderAddress } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  proxyAddress: ({ campaigns: { proxyAddress } }) => proxyAddress
}
