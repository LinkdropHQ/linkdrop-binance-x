import React from 'react'
import { Alert, Button } from '@linkdrop/binance-ui-kit'
import { translate } from 'decorators'
import { shortenString } from '@linkdrop/binance-commons'
import text from 'texts'
import sdk from '@linkdrop/binance-sdk'
import icon from './token-icon.png'
import styles from './styles.module'
import commonStyles from '../styles.module'

@translate('pages.main')
class InitialPage extends React.Component {
  render () {
    const { onClick, amount, symbol, loading, wallet } = this.props
    const amountFormatted = sdk.utils.formatUnits(amount || 0)
    const finalIcon = <img className={styles.icon} src={icon} />
    return <div className={commonStyles.container}>
      <Alert className={styles.tokenIcon} icon={finalIcon} />
      <div className={styles.title}>
        <span>{amountFormatted}</span> {symbol}
      </div>
      <Button loading={loading} className={styles.button} onClick={_ => onClick && onClick()}>
        {text('common.buttons.claim')}
      </Button>
      <div className={styles.terms} dangerouslySetInnerHTML={{ __html: this.t('titles.agreeWithTerms', {
        termsHref: 'http://linkdrop.io/terms',
        privacyHref: 'http://linkdrop.io/privacy'
      }) }} />
      {wallet && <div className={styles.wallet} dangerouslySetInnerHTML={{ __html: this.t('titles.claimTo', { wallet: shortenString({ wallet }) }) }} />}
    </div>
  }
}

export default InitialPage
