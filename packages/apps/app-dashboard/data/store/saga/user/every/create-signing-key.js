/* global web3 */
import { put, select } from 'redux-saga/effects'
import { ethers } from 'ethers'
import { factory, jsonRpcUrlXdai, infuraPk } from 'app.config.js'
import LinkdropFactory from 'contracts/LinkdropFactory.json'
import LinkdropMastercopy from 'contracts/LinkdropMastercopy.json'
import { defineJsonRpcUrl } from '@linkdrop/binance-commons'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const { account, chainId } = payload
    const newWallet = ethers.Wallet.createRandom()
    const { address: wallet, privateKey } = newWallet
    const actualJsonRpcUrl = defineJsonRpcUrl({ chainId, infuraPk, jsonRpcUrlXdai })
    const provider = yield new ethers.providers.JsonRpcProvider(actualJsonRpcUrl)
    const factoryContract = yield new ethers.Contract(factory, LinkdropFactory.abi, provider)
    const isDeployed = yield factoryContract.isDeployed(account)
    let data
    let to
    if (!isDeployed) {
      data = yield factoryContract.interface.functions.deployProxyWithSigner.encode([wallet])
      to = factory
    } else {
      const proxyAddress = yield select(generator.selectors.proxyAddress)
      const proxyContract = yield new ethers.Contract(proxyAddress, LinkdropMastercopy.abi, provider)
      data = yield proxyContract.interface.functions.addSigner.encode([wallet])
      to = proxyAddress
    }
    const promise = new Promise((resolve, reject) => {
      web3.eth.sendTransaction({ to, from: account, value: 0, data }, (err, txHash) => {
        if (err) { console.error(err); reject(err) }
        return resolve({ txHash })
      })
    })
    const { txHash } = yield promise
    yield put({ type: 'USER.SET_TX_HASH', payload: { txHash } })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
    yield put({ type: 'USER.SET_PRIVATE_KEY', payload: { privateKey } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  proxyAddress: ({ campaigns: { proxyAddress } }) => proxyAddress
}
