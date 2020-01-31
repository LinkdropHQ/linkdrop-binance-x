import { put } from 'redux-saga/effects'
import { ethers } from 'ethers'

const generator = function * () {
  try {
    if (!window.trustProvider) { throw new Error('No window.trustProvider detected') }
    const promise = function() {
      return new Promise((resolve, reject) => {
        window.trustProvider
          .getAccounts()
          .then(result => resolve({ result }))
          .catch(err => reject({ err }))
      })
    }
    const { result } = yield promise()

    const binanceChainAddressObj = result.find(item => Number(item.network) === 714)
    if (binanceChainAddressObj) {
      return binanceChainAddressObj.address
    } else {
      throw new Error('No binance address detected')
    }
  } catch (err) {
    alert(err)
    console.error(err)
  }
}

export default generator
