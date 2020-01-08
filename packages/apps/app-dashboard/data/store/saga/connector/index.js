import { takeEvery } from 'redux-saga/effects'

import sendEth from './every/send-eth'
import sendErc20 from './every/send-erc20'

export default function * () {
  yield takeEvery('*CONNECTOR.SEND_ETH', sendEth)
  yield takeEvery('*CONNECTOR.SEND_ERC20', sendErc20)
}
