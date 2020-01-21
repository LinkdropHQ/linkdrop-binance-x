import React from 'react'
import { actions, translate } from 'decorators'
import styles from '../styles.module'
import { convertFromExponents } from '@linkdrop/binance-commons'

@actions(({
  campaigns: {
    tokenAmount,
    tokenSymbol
  }
}) => ({
  tokenAmount,
  tokenSymbol
}))
@translate('pages.campaignCreate')
class LinkContents extends React.Component {
  render () {
    const { tokenAmount, tokenSymbol } = this.props
    return <p className={styles.dataContent}>
      {this.t('titles.oneLinkContents', {
        tokenAmount: convertFromExponents(tokenAmount),
        tokenSymbol
      })}
    </p>
  }
}

export default LinkContents
