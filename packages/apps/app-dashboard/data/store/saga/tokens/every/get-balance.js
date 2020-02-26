import { put, select, call } from 'redux-saga/effects'
import { getAssets } from 'data/api/tokens'
import { balanceIsApproved } from './helpers'
import { prepareAssets } from './helpers'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_ERRORS', payload: { errors: [] } })
    const toAddress = yield select(generator.selectors.toAddress)
    const fee = yield select(generator.selectors.fee)
    const symbol = yield select(generator.selectors.symbol)
    const commonAmount = yield select(generator.selectors.commonAmount)
    const amount = yield select(generator.selectors.amount)
    const commonBnb = yield select(generator.selectors.commonBnb)
    const extraBnb = yield select(generator.selectors.extraBnb)
    const assets = prepareAssets({ symbol, amount, extraBnb })
    const { balances } = yield call(getAssets, { address: toAddress })

    if (balances && balances.length > 0) {
      const {
        bnbBalance,
        balance,
        approved
      } = balanceIsApproved({ symbol, balances, amount: commonAmount, commonBnb })
      console.log({
        bnbBalance,
        balance,
        approved
      })
      yield put({
        type: 'TOKENS.SET_BALANCE',
        payload: {
          balance,
          bnbBalance,
          approved
        }
      })
    }

  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  toAddress: ({ user: { senderAddress } }) => senderAddress,
  fee: ({ campaigns: { fee } }) => fee,
  symbol: ({ campaigns: { symbol } }) => symbol,
  commonBnb: ({ campaigns: { commonBnb } }) => commonBnb,
  amount: ({ campaigns: { amount } }) => amount,
  extraBnb: ({ campaigns: { extraBnb } }) => extraBnb,
  commonAmount: ({ campaigns: { commonAmount } }) => commonAmount
}
