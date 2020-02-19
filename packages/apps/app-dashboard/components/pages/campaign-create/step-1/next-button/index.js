import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { Button } from 'components/common'

@actions(_ => ({}))
@translate('pages.campaignCreate')
class NextButton extends React.Component {
  render () {
    const { wallet = 'trust', tokenSymbol, extraBnb = 0, tokenAmount = 0, linksAmount = 0 } = this.props
    return <div className={styles.controls}>
      <Button
        className={styles.button}
        disabled={this.defineIfButtonDisabled({ tokenAmount, linksAmount })}
        onClick={_ => this.actions().campaigns.prepareNewData({
          tokenAmount,
          wallet,
          linksAmount,
          tokenSymbol,
          extraBnb
        })}
      >
        {this.t('buttons.next')}
      </Button>
    </div>
  }

  defineIfButtonDisabled ({ tokenAmount, linksAmount }) {
    return !Number(tokenAmount) || !Number(linksAmount) || Number(linksAmount) > 1000
  }
}

export default NextButton
