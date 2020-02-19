import React from 'react'
import { actions, translate } from 'decorators'
import styles from '../styles.module'
import { convertFromExponents } from '@linkdrop/binance-commons'

@actions(({
  campaigns: {
    amount,
    symbol,
    extraBnb
  }
}) => ({
  amount,
  symbol,
  extraBnb
}))
@translate('pages.campaignCreate')
class LinkContents extends React.Component {
  render () {
    const { amount, symbol, extraBnb } = this.props
    if (extraBnb && Number(extraBnb)) {
      return <p className={styles.dataContent}>
      {this.t('titles.oneLinkContentsWithBnb', {
        tokenAmount: amount,
        tokenSymbol: symbol,
        extraBnb
      })}
    </p>
    }
    return <p className={styles.dataContent}>
      {this.t('titles.oneLinkContents', {
        tokenAmount: amount,
        tokenSymbol: symbol
      })}
    </p>
  }
}

export default LinkContents
