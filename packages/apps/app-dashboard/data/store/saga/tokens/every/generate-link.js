import { put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { utils } from 'ethers'
import configs from 'config-dashboard'
import { convertFromExponents } from '@linkdrop/binance-commons'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const tokenAmount = yield select(generator.selectors.tokenAmount)
    const defaultWallet = yield select(generator.selectors.defaultWallet)
    const campaignId = yield select(generator.selectors.campaignId)
    const privateKey = yield select(generator.selectors.privateKey)
    const tokenAddress = yield select(generator.selectors.tokenAddress)
    const link = yield sdk.generateLink({
      signingKeyOrWallet: privateKey,
      weiAmount: weiAmount || 0,
      tokenAddress,
      wallet: defaultWallet,
      tokenAmount: String(erc20BalanceFormatted),
      expirationTime: configs.expirationTime,
      campaignId
    })

    yield delay(10)
    const links = yield select(generator.selectors.links)
    const linksUpdated = links.concat(link.url)
    yield put({ type: 'CAMPAIGNS.SET_LINKS', payload: { links: linksUpdated } })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  tokenAmount: ({ campaigns: { tokenAmount } }) => tokenAmount,
  ethAmount: ({ campaigns: { ethAmount } }) => ethAmount,
  privateKey: ({ user: { privateKey } }) => privateKey,
  links: ({ campaigns: { links } }) => links,
  decimals: ({ tokens: { decimals } }) => decimals,
  version: ({ user: { version } }) => version,
  tokenAddress: ({ tokens: { address } }) => address,
  sdk: ({ user: { sdk } }) => sdk,
  defaultWallet: ({ campaigns: { defaultWallet } }) => defaultWallet,
  campaignId: ({ campaigns: { id } }) => id
}
