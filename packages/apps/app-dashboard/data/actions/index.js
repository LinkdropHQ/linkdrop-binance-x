import User from './user'
import Campaigns from './campaigns'
import Routing from './routing'
import Tokens from './tokens'
import Connector from './connector'

class Actions {
  constructor (env) {
    this.dispatch = (env.props || env).dispatch
    this.history = (env.props || env).history

    this.user = new User(this)
    this.campaigns = new Campaigns(this)
    this.routing = new Routing(this)
    this.tokens = new Tokens(this)
    this.connector = new Connector(this)
  }
}

export default Actions
