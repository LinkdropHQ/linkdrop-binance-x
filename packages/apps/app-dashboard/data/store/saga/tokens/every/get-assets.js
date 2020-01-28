import { put, call, select } from 'redux-saga/effects'
import { getAssets } from 'data/api/tokens'

const generator = function * () {
  try {
    const currentAddress = yield select(generator.selectors.currentAddress)
    // const { ethBalanceFormatted } = yield getCurrentEthBalance({ payload: { account: currentAddress, chainId } })
    // yield put({
    //   type: 'TOKENS.SET_CURRENT_ETH_BALANCE',
    //   payload: {
    //     currentEthBalance: Math.round(ethBalanceFormatted * 100) / 100
    //   }
    // })

    const { balances, address, account_number: accountNumber, sequence } = yield call(getAssets, { address: currentAddress })
    if (balances && balances.length > 0) {
      const assets = balances.map(item => {
        return {
          ...item,
          amount: item.free
        }
      })
      yield put({ type: 'TOKENS.SET_ASSETS', payload: { assets } })
    }
    yield put({ type: 'USER.SET_ACCOUNT_NUMBER', payload: { accountNumber } })
    yield put({ type: 'USER.SET_SEQUENCE', payload: { sequence } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  chainId: ({ user: { chainId } }) => chainId,
  currentAddress: ({ user: { currentAddress } }) => currentAddress
}

const defineDecimals = ({ decimals }) => {
  if (!decimals || decimals.length === 0) { return 0 }
  return Number(decimals)
}

const defineSymbol = ({ item, chainId }) => {
  if (Number(chainId) === 1 && item.contractAddress.toLowerCase() === '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359') {
    return 'SAI'
  }
  return item.symbol
}
