import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { ethers } from 'ethers'
import classNames from 'classnames'
import { Select, Input, PageHeader, PageLoader } from 'components/common'
import Immutable from 'immutable'
import wallets from 'wallets'
import AddBnb from './add-bnb'
import LinksContent from './links-content'
import NextButton from './next-button'

@actions(({
  user: {
    loading
  },
  campaigns: {
    items
  },
  tokens: {
    assets
  }
}) => ({
  assets,
  loading,
  items
}))
@translate('pages.campaignCreate')
class Step1 extends React.Component {
  constructor (props) {
    super(props)
    const { assets } = this.props
    this.TOKENS = []
    this.WALLETS = this.createWalletOptions()
    const assetsPrepared = this.prepareAssets({ assets })
    this.state = {
      options: assetsPrepared,
      tokenSymbol: (assetsPrepared[0] || {}).value,
      tokenAmount: '0',
      linksAmount: '0',
      tokenAddress: null,
      wallet: this.WALLETS[0].value,
      addBnb: false,
      extraBnb: '0'
    }
  }

  createWalletOptions () {
    return (['trust', 'coinbase', 'opera', 'status', 'imtoken', 'gowallet', 'buntoy', 'tokenpocket']).map(wallet => {
      const label = wallets[wallet].name
      return {
        label: wallet === 'trust' ? `Default: ${label}` : label,
        value: wallet
      }
    })
  }

  componentDidMount () {
    const { items } = this.props
    this.actions().tokens.getAssets()
    this.actions().user.createKeys()
  }

  componentWillReceiveProps ({ assets }) {
    const { assets: prevAssets } = this.props
    if (assets != null && assets.length > 0 && !Immutable.fromJS(assets).equals(Immutable.fromJS(prevAssets))) {
      const assetsPrepared = this.prepareAssets({ assets })
      this.setState({
        options: assetsPrepared,
        tokenSymbol: (assetsPrepared[0] || {}).value
      })
    }
  }

  render () {
    const { tokenSymbol, addBnb, extraBnb, linksAmount, tokenAmount, wallet, tokenAddress, options } = this.state
    const { loading } = this.props
    const tokenType = this.defineTokenType({ tokenSymbol })
    return <div className={styles.container}>
      {loading && <PageLoader />}
      <PageHeader title={this.t('titles.setupCampaign')} />
      <div className={styles.main}>
        <div className={styles.form}>
          <div className={styles.chooseTokens}>
            <h3 className={styles.subtitle}>{this.t('titles.chooseToken')}</h3>
            <Select
              options={options}
              value={tokenSymbol}
              onChange={({ value }) => this.setState({
                tokenSymbol: value,
                extraBnb: '0',
                tokenAmount: '0'
              })}
            />
            <div className={styles.currentBalance}>
              {this.t('titles.balance')} {this.renderAmount({ tokenSymbol, options })}
            </div>
          </div>
          {this.renderTokenInputs({ addBnb, tokenSymbol, tokenAmount, extraBnb })}
          <div className={styles.linksAmount}>
            <h3 className={styles.subtitle}>{this.t('titles.totalLinks')}</h3>
            <div className={styles.linksAmountContainer}>
              <Input
                numberInput
                decimalSeparator={false}
                className={styles.input}
                value={linksAmount}
                onChange={({ value }) => this.setField({ field: 'linksAmount', value: parseFloat(value) })}
              />
            </div>
          </div>
          <div className={styles.chooseWallet}>
            <h3 className={styles.subtitle}>{this.t('titles.receiverWallet')}</h3>
            <Select
              options={this.WALLETS}
              value={wallet}
              onChange={({ value }) => {
                this.setState({
                  wallet: value
                })
              }}
            />
          </div>
        </div>

        <div className={styles.summary}>
          <h3 className={styles.subtitle}>{this.t('titles.total')}</h3>
          {this.renderTexts({
            tokenAddress,
            tokenType,
            linksAmount,
            tokenAmount,
            tokenSymbol
          })}
        </div>
      </div>
      <NextButton
        tokenAmount={tokenAmount}
        linksAmount={linksAmount}
        tokenSymbol={tokenSymbol}
        extraBnb={extraBnb}
        wallet={wallet}
      />
    </div>
  }

  renderAmount ({ tokenSymbol, options }) {
    if (!options) { return null }
    if (options.length === 0) { return null }
    const currentAsset = options.find(asset => tokenSymbol === asset.value)
    if (!currentAsset) { return null }
    return <div>{currentAsset.amount}</div>
  }

  renderTokenInputs ({ tokenSymbol, tokenAmount, addBnb, extraBnb }) {
    return <div className={styles.tokensAmount}>
      <h3 className={styles.subtitle}>{this.t('titles.amountPerLink')}</h3>
      <div className={styles.tokensAmountContainer}>
        <Input
          disabled={!tokenSymbol}
          numberInput
          suffix={tokenSymbol}
          className={styles.input}
          value={tokenAmount}
          onChange={({ value }) => this.setField({ field: 'tokenAmount', value: parseFloat(value) })}
        />
        {tokenSymbol && tokenSymbol !== 'BNB' && <AddBnb
          value={extraBnb}
          addValue={({ value }) => this.setField({ field: 'extraBnb', value: parseFloat(value) })}
        />}
      </div>
    </div>
  }

  prepareAssets ({ assets }) {
    return assets.map(({ symbol, amount }) => ({
      label: symbol,
      value: symbol,
      amount
    }))
  }

  defineTokenType ({ tokenSymbol }) {
    return 'erc20'
  }

  renderTexts ({ tokenAddress, linksAmount, tokenAmount, tokenSymbol, tokenType }) {
    if (!linksAmount || !tokenAmount) {
      return <p className={classNames(styles.text, styles.textGrey)}>{this.t('titles.fillTheField')}</p>
    }
    return <div>
      <p className={classNames(styles.text, styles.textMargin15)}>{tokenAmount * linksAmount} {tokenSymbol}</p>
      <LinksContent tokenAmount={tokenAmount} tokenSymbol={tokenSymbol} tokenType={tokenType} />
    </div>
  }

  setField ({ value, field }) {
    this.setState({
      [field]: value
    })
  }
}

export default Step1
