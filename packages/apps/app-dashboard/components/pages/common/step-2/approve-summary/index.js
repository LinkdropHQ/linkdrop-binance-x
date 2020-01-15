import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { multiply, add, bignumber } from 'mathjs'
import classNames from 'classnames'
import { convertFromExponents } from '@linkdrop/binance-commons'
import { defineDefaultSymbol } from 'helpers'

@actions(({ user: { chainId } }) => ({ chainId }))
@translate('pages.campaignCreate')
class ApproveSummary extends React.Component {
  constructor (props) {
    super(props)
    const { chainId } = props
    this.defaultSymbol = defineDefaultSymbol({ chainId })
  }

  render () {
    const { linksAmount, tokenAmount, tokenSymbol } = this.props
    return <div className={classNames(styles.container, styles.tokens)}>
      <div
        dangerouslySetInnerHTML={{
          __html: this.t('titles.approveTokens', {
            tokenAmount: convertFromExponents(multiply(bignumber(tokenAmount), bignumber(linksAmount))),
            tokenSymbol
          })
        }}
      />
    </div>
  }
}

export default ApproveSummary
