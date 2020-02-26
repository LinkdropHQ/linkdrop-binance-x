import { put, select, call } from 'redux-saga/effects'
import { convertArrayToCSV } from 'convert-array-to-csv'
import { getApiHost, saveApiHost } from 'data/api/user'
import { removeLastSlash, removeProtocol } from 'helpers'

const generator = function * ({ payload }) {
  try {
  	yield put({ type: 'CAMPAIGNS.SET_ERROR', payload: { error: null } })
    const { apiHost: apiHostInitial } = payload
    const apiHost = removeProtocol({ string: removeLastSlash({ string: apiHostInitial }) })
    const currentAddress = yield select(generator.selectors.currentAddress)
    const senderAddress = yield select(generator.selectors.senderAddress)
    const { success } = yield call(getApiHost, { apiHost })
    if (success) {
    	return yield put({ type: 'CAMPAIGNS.SET_ERROR', payload: { error: 'API_HOST_EXISTS' } })
    }
    const { success: saveSuccess } = yield call(saveApiHost, { apiHost, currentAddress, senderAddress })
    if (saveSuccess) {
    	yield put({ type: 'CAMPAIGNS.SET_API_HOST', payload: { apiHost } })
    	return yield put({ type: 'USER.SET_STEP', payload: { step: 3 } })
    }
    yield put({ type: 'CAMPAIGNS.SET_ERROR', payload: { error: 'ERROR_OCCURED' } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
generator.selectors = {
  currentAddress: ({ user: { currentAddress } }) => currentAddress,
  senderAddress: ({ user: { senderAddress } }) => senderAddress
}