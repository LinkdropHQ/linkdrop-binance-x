import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { defaultChainId } from 'app.config.js'
console.log({ defaultChainId })

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const { wc } = payload
    if (!wc) {
      yield delay(2000)
      yield put({ type: 'USER.SET_CURRENT_ADDRESS', payload: { currentAddress: null } })
      yield put({ type: 'USER.SET_CHAIN_ID', payload: { chainId } })
      yield put({ type: 'USER.SET_WC_INSTANCE', payload: { wcInstance: null } })
      yield put({ type: 'USER.SET_CONNECTOR_NAME', payload: { connectorName: null } })
      return yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
    }

    yield put({ type: 'USER.SET_WC_INSTANCE', payload: { wcInstance: wc } })
    yield put({ type: 'USER.SET_CONNECTOR_NAME', payload: { connectorName: 'Wallet Connect' } })
    const getAccountsPromise = new Promise((resolve, reject) => {
      wc.getAccounts()
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          // Error returned when rejected
          reject(error)
        })
    })
    const addresses = yield getAccountsPromise
    const binanceAddress = addresses.find(address => address.network === Number(defaultChainId))
    if (!binanceAddress) {
      return yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
    }
    window.addressChangeInterval && window.clearInterval(window.addressChangeInterval)
    yield put({ type: 'USER.SET_CURRENT_ADDRESS', payload: { currentAddress: binanceAddress.address } })
    yield put({ type: 'USER.SET_CHAIN_ID', payload: { chainId: Number(defaultChainId) } })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
    // window.addressChangeInterval = window.setInterval(async () => {
    //   const currentMetamaskAddress = await provider.eth.getAccounts()
    //   if ((address || '').toLowerCase() !== ((currentMetamaskAddress || [])[0] || '').toLowerCase()) {
    //     window.location.reload()
    //   }
    // }, 2000)
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  step: ({ user: { step } }) => step
}
