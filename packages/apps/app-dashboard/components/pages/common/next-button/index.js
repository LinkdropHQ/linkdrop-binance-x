import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { Button } from 'components/common'

@actions(_ => ({}))
@translate('pages.campaignCreate')
class NextButton extends React.Component {
  render () {
    const { wallet = 'trust', tokenSymbol, tokenAmount = 0, linksAmount = 0 } = this.props
    return <div className={styles.controls}>
      <Button
        className={styles.button}
        disabled={this.defineIfButtonDisabled({ tokenAmount, linksAmount })}
        onClick={_ => this.actions().campaigns.prepareNewData({ tokenAmount, wallet, linksAmount, tokenSymbol })}
      >
        {this.t('buttons.next')}
      </Button>
    </div>
  }

  defineIfButtonDisabled ({ tokenAmount, linksAmount }) {
    return !Number(tokenAmount)
  }
}

export default NextButton
