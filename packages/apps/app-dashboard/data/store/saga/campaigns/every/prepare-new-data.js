import { put, select } from 'redux-saga/effects'
import { fee, multisendFee } from 'app.config.js'
import { multiply, bignumber, add } from 'mathjs'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'CAMPAIGNS.SET_ERROR', payload: { error: null } })
    const { tokenAmount, linksAmount, tokenSymbol, wallet, extraBnb } = payload
    const actualFee = Number(extraBnb) > 0 ? multisendFee : fee
    console.log({ tokenAmount, linksAmount, tokenSymbol, wallet, extraBnb })
    const id = yield select(generator.selectors.senderAddress)
    const commonAmount = String(multiply(bignumber(tokenAmount), bignumber(linksAmount)))
    const commonFee = String(multiply(bignumber(actualFee), bignumber(linksAmount)))
    console.log({ commonFee })
    const extraBnbInSingleLink = Number(extraBnb) === 0 ? '0' : extraBnb
    console.log({ extraBnbInSingleLink })
    const extraBnbInAllLinks = Number(extraBnb) === 0 ? '0' : String(multiply(bignumber(extraBnb), bignumber(linksAmount)))
    console.log({ extraBnbInAllLinks })
    const commonBnbInAllLinks = String(defineCommonBnb({ extraBnbInAllLinks, commonFee, tokenSymbol, commonAmount }))
    console.log({ commonBnbInAllLinks })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    // amount of single link
    yield put({ type: 'CAMPAIGNS.SET_AMOUNT', payload: { amount: tokenAmount } })
    // amount of tokens in all links
    yield put({ type: 'CAMPAIGNS.SET_COMMON_AMOUNT', payload: { commonAmount } })
    // amount of fee
    yield put({ type: 'CAMPAIGNS.SET_FEE', payload: { fee: commonFee } })
    // amount of extra bnb in single link
    yield put({ type: 'CAMPAIGNS.SET_EXTRA_BNB', payload: { extraBnb: extraBnbInSingleLink } })
    // amount of common extra bnb in all links
    yield put({ type: 'CAMPAIGNS.SET_COMMON_EXTRA_BNB', payload: {  commonExtraBnb: extraBnbInAllLinks } })
    // amount of common bnb in all links
    yield put({ type: 'CAMPAIGNS.SET_COMMON_BNB', payload: {  commonBnb: commonBnbInAllLinks } })


    yield put({ type: 'CAMPAIGNS.SET_DEFAULT_WALLET', payload: { defaultWallet: wallet } })
    yield put({ type: 'CAMPAIGNS.SET_SYMBOL', payload: { symbol: tokenSymbol } })
    yield put({ type: 'CAMPAIGNS.SET_ID', payload: { id } })
    yield put({ type: 'CAMPAIGNS.SET_DATE', payload: { date: new Date() } })
    yield put({ type: 'CAMPAIGNS.SET_LINKS_AMOUNT', payload: { linksAmount } })
    yield put({ type: 'USER.SET_STEP', payload: { step: 2 } })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

function defineCommonBnb ({ extraBnbInAllLinks, commonFee, tokenSymbol, commonAmount }) {
  console.log({ extraBnbInAllLinks, commonFee, tokenSymbol, commonAmount })
  const extraBnbAndFee = add(bignumber(extraBnbInAllLinks), bignumber(commonFee))
  if (tokenSymbol !== 'BNB') {
    return extraBnbAndFee
  }
  return add(bignumber(commonAmount), extraBnbAndFee)
}

export default generator
generator.selectors = {
  senderAddress: ({ user: { senderAddress } }) => senderAddress
}