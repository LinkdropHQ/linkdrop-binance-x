import React from 'react'
import { Alert, Icons } from '@linkdrop/binance-ui-kit'
import { translate, actions } from 'decorators'
import styles from './styles.module'
import commonStyles from '../styles.module'
import config from 'config-claim'
import classNames from 'classnames'
import sdk from '@linkdrop/binance-sdk'

@actions(({ tokens: { transactionId } }) => ({ transactionId }))
@translate('pages.main')
class ClaimingFinishedPage extends React.Component {
  render () {
    const { transactionId, denoms, amounts } = this.props
    const amountFormatted = sdk.utils.formatUnits(amounts[0] || 0)
    return <div className={commonStyles.container}>
      <Alert icon={<Icons.Check />} className={styles.alert} />
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{
          __html: this.t('titles.tokensClaimed', {
            tokens: `${amountFormatted || ''} ${denoms[0] || ''}`
          })
        }}
      />
      <div
        className={classNames(styles.description, {
          [styles.descriptionHidden]: !transactionId
        })}
        dangerouslySetInnerHTML={{
          __html: this.t('titles.seeDetails', {
            transactionLink: `${config.binanceExplorer}${transactionId}`
          })
        }}
      />
    </div>
  }
}

export default ClaimingFinishedPage
