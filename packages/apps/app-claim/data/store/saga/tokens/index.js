import { takeEvery } from 'redux-saga/effects'

import claimTokens from './every/claim-tokens'
import checkIfClaimed from './every/check-if-claimed'

export default function * () {
  yield takeEvery('*TOKENS.CLAIM_TOKENS', claimTokens)
  yield takeEvery('*TOKENS.CHECK_IF_CLAIMED', checkIfClaimed)
}
