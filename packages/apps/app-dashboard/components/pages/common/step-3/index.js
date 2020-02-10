import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { PageHeader, PageLoader, Instruction } from 'components/common'
import LinkContents from './link-contents'
import config from 'config-dashboard'
import { multiply, bignumber, add } from 'mathjs'

@actions(({
  user: {
    loading,
    errors,
    chainId,
    senderAddress
  },
  tokens: {
    approved,
    balance,
    bnbBalance,
    address
  },
  connector: {
    status: connectorStatus
  },
  campaigns: {
    linksAmount,
    amount,
    commonAmount,
    symbol,
    fee: campaignFee,
    extraBnb,
    commonExtraBnb,
    commonBnb
  }
}) => ({
  linksAmount,
  address,
  errors,
  commonAmount,
  loading,
  connectorStatus,
  chainId,
  balance,
  bnbBalance,
  approved,
  amount,
  campaignFee,
  symbol,
  senderAddress,
  extraBnb,
  commonExtraBnb,
  commonBnb
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
    const {
      linksAmount,
      campaignFee,
      amount,
      symbol,
      senderAddress,
      commonAmount,
      balance,
      bnbBalance,
      extraBnb,
      commonExtraBnb,
      commonBnb
    } = this.props

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
                __html: this.countAmount({ extraBnb, campaignFee, commonExtraBnb, symbol, senderAddress, commonAmount })
              }}
            />
          </div>
          {this.renderAssets({ commonAmount, commonBnb, commonExtraBnb, symbol, balance, bnbBalance })}
        </div>
      </div>
    </div>
  }

  countAmount ({ commonAmount, extraBnb, commonExtraBnb, symbol, campaignFee, senderAddress }) {
    if (!extraBnb) {
      return this.t('texts.sendInstruction', {
        amount: commonAmount,
        symbol,
        fee: campaignFee,
        senderAddress
      })
    }

    return this.t('texts.sendInstructionWithExtraBnb', {
      amount: commonAmount,
      symbol,
      extraBnb: commonExtraBnb,
      fee: campaignFee,
      senderAddress
    })

  }

  renderAssets ({ commonAmount, symbol, balance, bnbBalance, commonBnb }) {
    if (symbol === 'BNB') {
      return <div className={styles.assets}>
        <div className={styles.assetsItem}>
          BNB: <span>{bnbBalance}</span> / {commonBnb}
        </div>
      </div>
    }
    return <div className={styles.assets}>
      <div className={styles.assetsItem}>
        BNB: <span>{bnbBalance || 0}</span> / {commonBnb}
      </div>
      <div className={styles.assetsItem}>
        {symbol}: <span>{balance || 0}</span> / {commonAmount}
      </div>
    </div>
  }
}

export default Step3
