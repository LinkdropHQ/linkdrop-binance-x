import { put, select } from 'redux-saga/effects'
const ls = (typeof window === 'undefined' ? {} : window).localStorage
import { linksLimit } from 'app.config.js'

const generator = function * ({ payload }) {
  try {
    const { links } = payload
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    yield put({ type: 'USER.SET_STEP', payload: { step: links.length === 0 ? 6 : 5 } })
    const chainId = yield select(generator.selectors.chainId)
    const currentAddress = yield select(generator.selectors.currentAddress)
    // keys
    const senderPrivateKey = yield select(generator.selectors.senderPrivateKey)
    const verifierPrivateKey = yield select(generator.selectors.verifierPrivateKey)
    const senderAddress = yield select(generator.selectors.senderAddress)
    const verifierAddress = yield select(generator.selectors.verifierAddress)

    // campaign data
    const tokenAddress = yield select(generator.selectors.tokenAddress)
    const tokenDecimals = yield select(generator.selectors.tokenDecimals)
    const {
      amount,
      symbol,
      id,
      linksAmount,
      date,
      defaultWallet
    } = yield select(generator.selectors.campaignData)

    const newCampaign = {
      amount,
      symbol,
      defaultWallet,
      status: 'active',
      linksAmount,
      created: date,
      links,
      chainId,
      id,
      campaignId: id,
      currentAddress,
      senderPrivateKey,
      verifierPrivateKey,
      senderAddress,
      verifierAddress
    }
    const campaigns = yield select(generator.selectors.campaigns)
    const campaignsUpdated = campaigns.concat(newCampaign)
    yield put({ type: 'CAMPAIGNS.SET_ITEMS', payload: { items: campaignsUpdated } })
    const campaignsStringified = JSON.stringify(campaignsUpdated)
    ls && ls.setItem && ls.setItem('campaigns', window.btoa(campaignsStringified))
    yield put({ type: '*CAMPAIGNS.RESET_DATA' })
    yield put({ type: 'CAMPAIGNS.SET_CURRENT', payload: { current: proxyAddress } })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  currentAddress: ({ user: { currentAddress } }) => currentAddress,
  senderPrivateKey: ({ user: { senderPrivateKey } }) => senderPrivateKey,
  verifierPrivateKey: ({ user: { verifierPrivateKey } }) => verifierPrivateKey,
  senderAddress: ({ user: { senderAddress } }) => senderAddress,
  verifierAddress: ({ user: { verifierAddress } }) => verifierAddress,
  campaigns: ({ campaigns: { items: campaigns } }) => campaigns,
  chainId: ({ user: { chainId } }) => chainId,
  campaignData: ({
    campaigns: {
      amount,
      symbol,
      linksAmount,
      date,
      id,
      defaultWallet = 'trust'
    }
  }) => ({
    amount,
    symbol,
    linksAmount,
    defaultWallet,
    date,
    id
  })
}
