class Connector {
  constructor (actions) {
    this.actions = actions
  }

  send () {
    this.actions.dispatch({ type: '*CONNECTOR.SEND' })
  }
}

export default Connector
