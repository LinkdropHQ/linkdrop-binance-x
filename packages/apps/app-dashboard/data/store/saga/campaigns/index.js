import { takeEvery } from 'redux-saga/effects'

import prepareNewData from './every/prepare-new-data'
import proceedPayment from './every/proceed-payment'
import resetData from './every/reset-data'
import save from './every/save'
import getCSV from './every/get-csv'
import changeStatus from './every/change-status'
import checkStatusTxHash from './every/check-status-tx-hash'

export default function * () {
  yield takeEvery('*CAMPAIGNS.PREPARE_NEW_DATA', prepareNewData)
  yield takeEvery('*CAMPAIGNS.PROCEED_PAYMENT', proceedPayment)
  yield takeEvery('*CAMPAIGNS.SAVE', save)
  yield takeEvery('*CAMPAIGNS.RESET_DATA', resetData)
  yield takeEvery('*CAMPAIGNS.GET_CSV', getCSV)
  yield takeEvery('*CAMPAIGNS.CHANGE_STATUS', changeStatus)
  yield takeEvery('*CAMPAIGNS.CHECK_STATUS_TX_HASH', checkStatusTxHash)
}
