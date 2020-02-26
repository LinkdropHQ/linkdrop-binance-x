import { takeEvery } from 'redux-saga/effects'

import createKeys from './every/create-keys'
import setWCInstance from './every/set-wc-instance'

export default function * () {
  yield takeEvery('*USER.CREATE_KEYS', createKeys)
  yield takeEvery('*USER.SET_WC_INSTANCE', setWCInstance)
}
