import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { defineDefaultSymbol } from 'helpers'
import { ethers } from 'ethers'
import classNames from 'classnames'
import { Select, Input, PageHeader, PageLoader } from 'components/common'
import config from 'config-dashboard'
import Immutable from 'immutable'
import wallets from 'wallets'
import { TokenAddressInput, LinksContent, NextButton } from 'components/pages/common'

@actions(({
  user: {
    chainId,
    currentAddress,
    loading,
    privateKey
  },
  campaigns: {
    items,
    proxyAddress,
    links
  },
  tokens: {
    assets,
    currentTokenBalance
  }
}) => ({
  assets,
  privateKey,
  chainId,
  loading,
  proxyAddress,
  currentAddress,
  items,
  links,
  currentTokenBalance
}))
@translate('pages.campaignCreate')
class Step1 extends React.Component {
  constructor (props) {
    super(props)
    const { assets, chainId } = this.props
    this.defaultSymbol = defineDefaultSymbol({ chainId })
    this.TOKENS = []
    this.WALLETS = this.createWalletOptions()
    const assetsPrepared = this.prepareAssets({ assets, chainId })
    this.state = {
      options: assetsPrepared,
      tokenSymbol: (assetsPrepared[0] || {}).value,
      tokenAmount: '0',
      linksAmount: '0',
      tokenAddress: null,
      wallet: this.WALLETS[0].value
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
    const { currentAddress, chainId, proxyAddress, items } = this.props
    // if (!proxyAddress) {
    //   this.actions().campaigns.createProxyAddress({ campaignId: items.length })
    // }
    this.actions().tokens.getAssets()
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
    const { tokenSymbol, linksAmount, tokenAmount, wallet, tokenAddress, options } = this.state
    const { loading, currentTokenBalance, chainId, privateKey, proxyAddress } = this.props
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
              onChange={({ value }) => this.setField({ field: 'tokenSymbol', value })}
            />
          </div>
          {this.renderTokenInputs({ tokenType, tokenAddress, tokenSymbol, tokenAmount })}
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
        wallet={wallet}
      />
    </div>
  }

  renderTokenInputs ({ tokenType, tokenAddress, tokenSymbol, tokenAmount }) {
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
      </div>
    </div>
  }

  prepareAssets ({ assets, chainId }) {
    return assets.map(({ symbol }) => ({
      label: symbol,
      value: symbol
    }))
  }

  defineTokenType ({ tokenSymbol, chainId }) {
    return 'erc20'
  }

  renderTexts ({ tokenAddress, linksAmount, tokenAmount, tokenSymbol, tokenType }) {
    if (!linksAmount || !tokenAmount) {
      return <p className={classNames(styles.text, styles.textGrey)}>{this.t('titles.fillTheField')}</p>
    }
    return <div>
      <p className={classNames(styles.text, styles.textMargin15)}>{tokenAmount * linksAmount} {tokenSymbol}</p>
      <LinksContent tokenAmount={tokenAmount} tokenSymbol={tokenSymbol} tokenType={tokenType} />
      <p className={styles.text} dangerouslySetInnerHTML={{ __html: this.t('titles.serviceFee', { symbol: this.defaultSymbol, price: config.linkPrice * linksAmount }) }} />
      <p className={classNames(styles.text, styles.textGrey)} dangerouslySetInnerHTML={{ __html: this.t('titles.serviceFeePerLink', { symbol: this.defaultSymbol, price: config.linkPrice }) }} />
    </div>
  }

  setField ({ value, field }) {
    const { tokenSymbol } = this.state
    const { chainId } = this.props
    if (field === 'tokenAmount') {
      return this.setState({
        [field]: value
      })
    }
    this.setState({
      [field]: value
    }, _ => {
      if (field === 'tokenSymbol') {
        this.actions().tokens.emptyTokenData()
      }
    })
  }
}

export default Step1
