import { put, select } from 'redux-saga/effects'
import TokenMock from 'contracts/TokenMock.json'
import { ethers } from 'ethers'
import { infuraPk, jsonRpcUrlXdai } from 'app.config.js'
import { defineJsonRpcUrl } from '@linkdrop/binance-commons'
import getCurrentBalance from './get-current-balance'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const { tokenSymbol } = payload
    const currentAddress = yield select(generator.selectors.currentAddress)
    const assets = yield select(generator.selectors.assets)
    const chainId = yield select(generator.selectors.chainId)
    const { symbol, decimals, address } = assets.find(asset => asset.symbol === tokenSymbol)

    const actualJsonRpcUrl = defineJsonRpcUrl({ chainId, infuraPk, jsonRpcUrlXdai })
    const provider = yield new ethers.providers.JsonRpcProvider(actualJsonRpcUrl)
    const tokenContract = yield new ethers.Contract(address, TokenMock.abi, provider)
    const { tokenBalance, tokenBalanceFormatted } = yield getCurrentBalance({ payload: { decimals, contract: tokenContract, account: currentAddress } })
    yield put({
      type: 'TOKENS.SET_CURRENT_BALANCE',
      payload: {
        currentTokenBalance: Math.round(tokenBalanceFormatted * 100) / 100
      }
    })
    yield put({ type: 'TOKENS.SET_SYMBOL', payload: { symbol } })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  assets: ({ tokens: { assets } }) => assets,
  chainId: ({ user: { chainId } }) => chainId,
  currentAddress: ({ user: { currentAddress } }) => currentAddress
}
