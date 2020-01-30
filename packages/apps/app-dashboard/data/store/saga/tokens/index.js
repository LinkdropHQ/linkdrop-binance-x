import { takeEvery } from 'redux-saga/effects'

import getAssets from './every/get-assets'
import getData from './every/get-data'
import getBalance from './every/get-balance'
import emptyData from './every/empty-data'
import generateLink from './every/generate-link'

export default function * () {
  yield takeEvery('*TOKENS.GET_ASSETS', getAssets)
  yield takeEvery('*TOKENS.GET_BALANCE', getBalance)
  yield takeEvery('*TOKENS.EMPTY_DATA', emptyData)
  yield takeEvery('*TOKENS.GET_DATA', getData)
  yield takeEvery('*TOKENS.GENERATE_LINK', generateLink)
}
