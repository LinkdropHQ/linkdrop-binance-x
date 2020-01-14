import { takeEvery } from 'redux-saga/effects'

import createSigningKey from './every/create-signing-key'
import setWCInstance from './every/set-wc-instance'
import prepareVersionVar from './every/prepare-version-var'

export default function * () {
  yield takeEvery('*USER.CREATE_SIGNING_KEY', createSigningKey)
  yield takeEvery('*USER.SET_WC_INSTANCE', setWCInstance)
  yield takeEvery('*USER.PREPARE_VERSION_VAR', prepareVersionVar)
}
