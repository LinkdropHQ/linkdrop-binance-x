import user from './user'
import campaigns from './campaigns'
import tokens from './tokens'
import connector from './connector'

function * saga () {
  yield * user()
  yield * campaigns()
  yield * tokens()
  yield * connector()
}

export default saga
