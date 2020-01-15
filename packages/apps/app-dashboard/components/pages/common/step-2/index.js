import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { PageHeader, PageLoader, Instruction } from 'components/common'
import LinkContents from './link-contents'
import ApproveSummary from './approve-summary'
import NextButton from './next-button'
import config from 'config-dashboard'
import { defineDefaultSymbol } from 'helpers'
import { linksLimit } from 'app.config.js'

@actions(({
  user: {
    loading,
    currentAddress,
    errors,
    chainId
  },
  tokens: {
    balanceFormatted,
    address
  },
  connector: {
    status: connectorStatus
  },
  campaigns: {
    tokenAmount,
    linksAmount,
    proxyAddress,
    tokenSymbol
  }
}) => ({
  tokenAmount,
  linksAmount,
  address,
  errors,
  tokenSymbol,
  loading,
  currentAddress,
  connectorStatus,
  chainId,
  balanceFormatted,
  proxyAddress
}))
@translate('pages.campaignCreate')
class Step2 extends React.Component {
  constructor (props) {
    super(props)
    const { chainId } = props
    this.defaultSymbol = defineDefaultSymbol({ chainId })
    this.state = {
      loading: false
    }
  }

  componentWillReceiveProps ({ linksAmount, connectorStatus, errors, balanceFormatted }) {
    const {
      connectorStatus: prevConnectorStatus,
      errors: prevErrors,
      balanceFormatted: prevBalanceFormatted,
      proxyAddress,
      chainId,
      address: tokenAddress,
      currentAddress
    } = this.props

    if (connectorStatus && connectorStatus === 'finished' && connectorStatus !== prevConnectorStatus) {
      this.setState({
        loading: true
      }, _ => {
        this.intervalCheck = window.setInterval(_ => this.actions().tokens.getBalance({
          chainId,
          tokenAddress,
          account: proxyAddress,
          currentAddress
        }), config.balanceCheckInterval)
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

    if (balanceFormatted && Number(balanceFormatted) > 0 && balanceFormatted !== prevBalanceFormatted) {
      this.setState({
        loading: false
      }, _ => {
        this.intervalCheck && window.clearInterval(this.intervalCheck)
        window.setTimeout(_ => this.actions().user.setStep({ step: 3 }), config.nextStepTimeout)
      })
    }
  }

  render () {
    const { tokenAmount, linksAmount, tokenSymbol, loading, currentAddress } = this.props
    const { loading: stateLoading } = this.state
    return <div className={styles.container}>
      {(stateLoading || loading) && <PageLoader transaction={stateLoading} />}
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
                <div className={styles.dataContent}>
                  {`${linksAmount * config.linkPrice} ${this.defaultSymbol}`}
                </div>
                <div className={styles.extraDataContent}>
                  {this.t('titles.ethPerLink', { symbol: this.defaultSymbol, eth: config.linkPrice })}
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
          <div className={styles.serviceFee}>{this.t('texts._18')}</div>
          <ApproveSummary
            linksAmount={linksAmount}
            serviceFee={config.linkPrice}
            tokenAmount={tokenAmount}
            tokenSymbol={tokenSymbol}
          />
          <NextButton
            tokenAmount={tokenAmount}
            currentAddress={currentAddress}
            linksAmount={linksAmount}
            serviceFee={config.linkPrice}
          />
        </div>
        <div className={styles.description}>
          <Instruction
            linksAmount={linksAmount}
            tokenAmount={tokenAmount}
          />
        </div>
      </div>
    </div>
  }
}

export default Step2
