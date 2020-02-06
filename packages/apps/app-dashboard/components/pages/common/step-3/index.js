import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { PageHeader, PageLoader, Instruction } from 'components/common'
import LinkContents from './link-contents'
import ApproveSummary from './approve-summary'
import config from 'config-dashboard'
import { linksLimit, fee } from 'app.config.js'
import { multiply, bignumber } from 'mathjs'

@actions(({
  user: {
    loading,
    errors,
    chainId,
    senderAddress
  },
  tokens: {
    approved,
    address
  },
  connector: {
    status: connectorStatus
  },
  campaigns: {
    linksAmount,
    amount,
    symbol,
    fee
  }
}) => ({
  linksAmount,
  address,
  errors,
  loading,
  connectorStatus,
  chainId,
  approved,
  amount,
  fee,
  symbol,
  senderAddress
}))
@translate('pages.campaignCreate')
class Step3 extends React.Component {
  constructor (props) {
    super(props)
    const { chainId } = props
    this.state = {
      loading: false
    }
  }

  componentDidMount () {
    this.actions().connector.send()
  }

  componentWillReceiveProps ({ linksAmount, connectorStatus, errors, approved }) {
    const {
      connectorStatus: prevConnectorStatus,
      errors: prevErrors,
      approved: prevApproved,
      proxyAddress,
      chainId,
      address: tokenAddress,
      currentAddress
    } = this.props

    if (connectorStatus && connectorStatus === 'finished' && connectorStatus !== prevConnectorStatus) {
      this.setState({
        loading: true
      }, _ => {
        this.intervalCheck = window.setInterval(_ => this.actions().tokens.getBalance(), config.balanceCheckInterval)
      })
    }

    if (errors && errors[0] && prevErrors.length === 0 && errors[0] !== prevErrors[0]) {
      this.setState({
        loading: false
      }, _ => {
        window.alert(this.t(`errors.${errors[0]}`))
        this.intervalCheck && window.clearInterval(this.intervalCheck)
      })
    }

    if (approved && !prevApproved) {
      this.setState({
        loading: false
      }, _ => {
        this.intervalCheck && window.clearInterval(this.intervalCheck)
        window.setTimeout(_ => this.actions().user.setStep({ step: 4 }), config.nextStepTimeout)
      })
    }
  }

  render () {
    const { linksAmount, fee, loading, amount, symbol, senderAddress } = this.props
    const { loading: stateLoading } = this.state
    return <div className={styles.container}>
      <PageHeader title={this.t('titles.summaryPay')} />
      {(stateLoading || loading) && <PageLoader />}
      <div className={styles.main}>
        <div className={styles.summary}>
          <div className={styles.summaryBox}>
            <div>
              <div className={styles.data}>
                <h3 className={styles.dataTitle}>
                  {this.t('titles.linksToGenerate')}
                </h3>

                <div className={styles.dataContent}>
                  {linksAmount}
                </div>
              </div>
            </div>

            <div>
              <div className={styles.data}>
                <h3 className={styles.dataTitle}>
                  {this.t('titles.oneLinkContainsTitle')}
                </h3>
                <div className={styles.dataContent}>
                  <LinkContents />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.serviceFee}>
            <div className={styles.title}>{this.t('titles.instruction')}</div>
            <div
              className={styles.instruction}
              dangerouslySetInnerHTML={{
                __html: this.t('texts.sendInstruction', {
                  amount: String(multiply(bignumber(amount), bignumber(linksAmount))),
                  symbol,
                  fee,
                  senderAddress
                }
              )}}
            />
          </div>
        </div>
      </div>
    </div>
  }
}

export default Step3
