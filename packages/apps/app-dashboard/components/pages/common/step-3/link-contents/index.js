import React from 'react'
import { actions, translate } from 'decorators'
import styles from '../styles.module'
import { convertFromExponents } from '@linkdrop/binance-commons'

@actions(({
  campaigns: {
    amount,
    symbol
  }
}) => ({
  amount,
  symbol
}))
@translate('pages.campaignCreate')
class LinkContents extends React.Component {
  render () {
    const { amount, symbol } = this.props
    return <p className={styles.dataContent}>
      {this.t('titles.oneLinkContents', {
        tokenAmount: amount,
        tokenSymbol: symbol
      })}
    </p>
  }
}

export default LinkContents
