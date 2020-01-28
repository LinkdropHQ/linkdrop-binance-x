import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { multiply, add, bignumber } from 'mathjs'
import classNames from 'classnames'
import { convertFromExponents } from '@linkdrop/binance-commons'

@actions(({
  user: {
    chainId
  },
  campaigns: {
    amount,
    symbol,
    linksAmount
  }
}) => ({
  chainId,
  amount,
  symbol,
  linksAmount
}))
@translate('pages.campaignCreate')
class ApproveSummary extends React.Component {
  render () {
    const { linksAmount, amount, symbol } = this.props
    console.log({ amount, symbol })
    return <div className={classNames(styles.container, styles.tokens)}>
      <div
        dangerouslySetInnerHTML={{
          __html: this.t('titles.approveTokens', {
            tokenAmount: convertFromExponents(multiply(bignumber(amount), bignumber(linksAmount))),
            tokenSymbol: symbol
          })
        }}
      />
    </div>
  }
}

export default ApproveSummary
