import { put } from 'redux-saga/effects'
import { convertArrayToCSV } from 'convert-array-to-csv'
const generator = function * ({ payload }) {
  try {
    const { apiHost } = payload
    yield put({ type: 'CAMPAIGNS.SET_API_HOST', payload: { apiHost } })
    yield put({ type: 'USER.SET_STEP', payload: { step: 3 } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
