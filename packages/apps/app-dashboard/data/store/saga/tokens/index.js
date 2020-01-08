import { takeEvery } from 'redux-saga/effects'

import getAssets from './every/get-assets'
import getEthData from './every/get-eth-data'
import getEthBalance from './every/get-eth-balance'

import getErc20Data from './every/get-erc20-data'

import getErc20Balance from './every/get-erc20-balance'
import setErc20Data from './every/set-erc20-data'
import emptyErc20Data from './every/empty-erc20-data'

import generateErc20Link from './every/generate-erc20-link'
import generateEthLink from './every/generate-eth-link'

export default function * () {
  yield takeEvery('*TOKENS.GET_ASSETS', getAssets)
  yield takeEvery('*TOKENS.GET_ETH_DATA', getEthData)
  yield takeEvery('*TOKENS.GET_ETH_BALANCE', getEthBalance)
  yield takeEvery('*TOKENS.GET_ERC20_BALANCE', getErc20Balance)
  yield takeEvery('*TOKENS.SET_ERC20_DATA', setErc20Data)
  yield takeEvery('*TOKENS.EMPTY_ERC20_DATA', emptyErc20Data)
  yield takeEvery('*TOKENS.GET_ERC20_DATA', getErc20Data)
  yield takeEvery('*TOKENS.GENERATE_ERC20_LINK', generateErc20Link)
  yield takeEvery('*TOKENS.GENERATE_ETH_LINK', generateEthLink)
}
