import tokens from './tokens'
import user from './user'

function * saga () {
  yield * tokens()
  yield * user()
}

export default saga
