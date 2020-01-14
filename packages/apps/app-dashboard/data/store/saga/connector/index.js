import { takeEvery } from 'redux-saga/effects'

import send from './every/send'

export default function * () {
  yield takeEvery('*CONNECTOR.SEND', send)
}
