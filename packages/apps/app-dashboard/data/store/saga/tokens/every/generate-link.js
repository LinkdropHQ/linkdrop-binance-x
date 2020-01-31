import { put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { utils } from 'ethers'
import { removeLastSlash } from 'helpers'
import { convertFromExponents } from '@linkdrop/binance-commons'
import sdk from "@linkdrop/binance-sdk"
import { claimHost } from 'app.config.js'
import { multiply, bignumber, add } from 'mathjs'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const defaultWallet = yield select(generator.selectors.defaultWallet)
    const symbol = yield select(generator.selectors.symbol)
    const verifierPrivateKey = yield select(generator.selectors.verifierPrivateKey)
    const amount = yield select(generator.selectors.amount)
    const apiHost = yield select(generator.selectors.apiHost)
    const links = yield select(generator.selectors.links)

    const link = yield sdk.generateLink({
      claimHost,
      privateKey: verifierPrivateKey,
      asset: symbol,
      amount: String(multiply(bignumber(amount), bignumber(100000000))),
      apiHost: removeLastSlash({ string: apiHost })
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
