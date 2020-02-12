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
    fee:  campaignFee
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
    const { linksAmount, campaignFee, amount, symbol, senderAddress, commonAmount, balance, bnbBalance } = this.props
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
                __html: this.t('texts.sendInstruction', {
                  amount: String(multiply(bignumber(amount), bignumber(linksAmount))),
                  symbol,
                  fee: campaignFee,
                  senderAddress
                }
              )}}
            />
          </div>
          {this.renderAssets({ commonAmount, symbol, balance, bnbBalance, fee: campaignFee })}
        </div>
      </div>
    </div>
  }

  renderAssets ({ commonAmount, symbol, balance, bnbBalance, fee }) {
    if (symbol === 'BNB') {
      return <div className={styles.assets}>
        <div className={styles.assetsItem}>
          BNB: <span>{bnbBalance || '0'}</span> / {String(add(bignumber(commonAmount), bignumber(fee)))}
        </div>
      </div>
    }
    return <div className={styles.assets}>
      <div className={styles.assetsItem}>
        BNB: <span>{bnbBalance || '0'}</span> / {fee}
      </div>
      <div className={styles.assetsItem}>
        {symbol}: <span>{balance || '0'}</span> / {commonAmount}
      </div>
    </div>
  }
}

export default Step3
