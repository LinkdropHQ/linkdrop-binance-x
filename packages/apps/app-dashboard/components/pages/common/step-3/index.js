import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { PageHeader, PageLoader, Instruction } from 'components/common'
import LinkContents from './link-contents'
import ApproveSummary from './approve-summary'
import NextButton from './next-button'
import config from 'config-dashboard'
import { linksLimit } from 'app.config.js'

@actions(({
  user: {
    loading,
    errors,
    chainId
  },
  tokens: {
    balance,
    address
  },
  connector: {
    status: connectorStatus
  },
  campaigns: {
    linksAmount
  }
}) => ({
  linksAmount,
  address,
  errors,
  loading,
  connectorStatus,
  chainId,
  balance
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

  componentWillReceiveProps ({ linksAmount, connectorStatus, errors, balance }) {
    const {
      connectorStatus: prevConnectorStatus,
      errors: prevErrors,
      balance: prevBalance,
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

    if (balance && Number(balance) > 0 && balance !== prevBalance) {
      this.setState({
        loading: false
      }, _ => {
        this.intervalCheck && window.clearInterval(this.intervalCheck)
        window.setTimeout(_ => this.actions().user.setStep({ step: 3 }), config.nextStepTimeout)
      })
    }
  }

  render () {
    const { linksAmount, loading } = this.props
    const { loading: stateLoading } = this.state
    return <div className={styles.container}>
      <PageHeader title={this.t('titles.summaryPay')} />
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
              <div className={styles.data}>
                <h3 className={styles.dataTitle}>
                  {this.t('titles.serviceFeeTitle')}
                </h3>
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
          <div
            className={styles.serviceFee}
          >
            {this.t('texts._18')}
          </div>
          <ApproveSummary />
          <NextButton />
        </div>
        <div className={styles.description}>
          <Instruction />
        </div>
      </div>
    </div>
  }
}

export default Step3
