import { put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { utils } from 'ethers'
import configs from 'config-dashboard'
import { convertFromExponents } from '@linkdrop/binance-commons'
import sdk from "@linkdrop/binance-sdk"

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const defaultWallet = yield select(generator.selectors.defaultWallet)
    const symbol = yield select(generator.selectors.symbol)
    const verifierPrivateKey = yield select(generator.selectors.verifierPrivateKey)
    const amount = yield select(generator.selectors.amount)
    const apiHost = yield select(generator.selectors.apiHost)
    const links = yield select(generator.selectors.links)
    console.log({
      claimHost: 'http://localhost:9002',
      privateKey: verifierPrivateKey,
      asset: symbol,
      amount,
      apiHost
    })

    const link = yield sdk.generateLink({
      claimHost: 'http://localhost:9002',
      privateKey: verifierPrivateKey,
      asset: symbol,
      amount: String(amount),
      apiHost
    })

    yield delay(10)
    const linksUpdated = links.concat(link.url)
    yield put({ type: 'CAMPAIGNS.SET_LINKS', payload: { links: linksUpdated } })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  amount: ({ campaigns: { amount } }) => amount,
  apiHost: ({ campaigns: { apiHost } }) => apiHost,
  symbol: ({ campaigns: { symbol } }) => symbol,
  links: ({ campaigns: { links } }) => links,
  defaultWallet: ({ campaigns: { defaultWallet } }) => defaultWallet,
  verifierPrivateKey: ({ user: { verifierPrivateKey } }) => verifierPrivateKey
}
