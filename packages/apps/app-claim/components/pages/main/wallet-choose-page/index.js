import React from 'react'
import { Button, Alert, Icons } from '@linkdrop/binance-ui-kit'
import { translate, actions, platform } from 'decorators'
import { getWalletLink, getWalletData } from 'helpers'
import classNames from 'classnames'
import styles from './styles.module'
import commonStyles from '../styles.module'
import variables from 'variables'

@actions(({ user: { walletType } }) => ({ walletType }))
@translate('pages.main')
@platform()
class WalletChoosePage extends React.Component {
  render () {
    const { platform } = this
    const buttonLink = platform !== 'desktop' && getWalletLink({ platform, wallet: 'trust', currentUrl: window.location.href })
    const buttonTitle = getWalletData({ wallet: 'trust' }).name
    return <div className={classNames(commonStyles.container, styles.container)}>
      <Alert className={styles.alert} icon={<Icons.Exclamation fill={variables.decentralandColor} />} />
      <div className={styles.title}>{this.t('titles.needWallet')}</div>
      {platform !== 'desktop' && <Button href={buttonLink} target='_blank' className={styles.button}>
        {this.t('buttons.useWallet', { wallet: buttonTitle })}
      </Button>}
    </div>
  }
}

export default WalletChoosePage
