class Campaign {
  constructor (actions) {
    this.actions = actions
  }

  prepareNewData ({ tokenAmount, wallet, ethAmount, linksAmount, tokenSymbol, tokenType }) {
    this.actions.dispatch({
      type: '*CAMPAIGNS.PREPARE_DATA',
      payload: {
        tokenAmount,
        wallet,
        tokenType,
        ethAmount,
        linksAmount,
        tokenSymbol
      }
    })
  }

  createProxyAddress ({ campaignId }) {
    this.actions.dispatch({ type: '*CAMPAIGNS.CREATE_PROXY_ADDRESS', payload: { campaignId } })
  }

  proceedPayment ({ cardNumber }) {
    this.actions.dispatch({
      type: '*CAMPAIGNS.PROCEED_PAYMENT',
      payload: {
        cardNumber
      }
    })
  }

  save ({ links }) {
    this.actions.dispatch({
      type: '*CAMPAIGNS.SAVE',
      payload: {
        links
      }
    })
  }

  getCSV ({ links, id }) {
    this.actions.dispatch({
      type: '*CAMPAIGNS.GET_CSV',
      payload: {
        links,
        id
      }
    })
  }

  changeStatus ({ id, chainId, account, action }) {
    this.actions.dispatch({
      type: '*CAMPAIGNS.CHANGE_STATUS',
      payload: {
        id,
        chainId,
        account,
        action
      }
    })
  }

  checkStatusTxHash ({ txHash, chainId, id, newStatus }) {
    this.actions.dispatch({
      type: '*CAMPAIGNS.CHECK_STATUS_TX_HASH',
      payload: {
        txHash,
        chainId,
        id,
        newStatus
      }
    })
  }
}

export default Campaign
