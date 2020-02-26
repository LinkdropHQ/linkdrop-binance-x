import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import classNames from 'classnames'
import { convertFromExponents } from '@linkdrop/binance-commons'
import { defineDefaultSymbol } from 'helpers'

@actions(({ user: { chainId } }) => ({ chainId }))
@translate('pages.campaignCreate')
class LinksContent extends React.Component {
  constructor (props) {
    super(props)
    const { chainId } = props
    this.defaultSymbol = defineDefaultSymbol({ chainId })
  }

  render () {
    const { tokenSymbol, tokenAmount, extraBnb } = this.props
    if (extraBnb && Number(extraBnb) > 0) {
      return <p className={classNames(styles.text, styles.textMargin30)}>
        {`${this.t('titles.oneLinkContains')} ${this.t('titles.oneLinkContentsWithBnb', { tokenAmount: convertFromExponents(tokenAmount), tokenSymbol, extraBnb })}`}
      </p>
    }
    return <p className={classNames(styles.text, styles.textMargin30)}>
      {`${this.t('titles.oneLinkContains')} ${this.t('titles.oneLinkContents', { tokenAmount: convertFromExponents(tokenAmount), tokenSymbol })}`}
    </p>
  }
}

export default LinksContent
