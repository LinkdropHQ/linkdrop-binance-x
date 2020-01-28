import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { Button } from 'components/common'

@actions(_ => ({}))
@translate('pages.campaignCreate')
class NextButton extends React.Component {
  render () {
    const { apiHost } = this.props
    return <div className={styles.controls}>
      <Button
        className={styles.button}
        disabled={!apiHost}
        onClick={_ => this.actions().campaigns.saveApiHost({ apiHost })}
      >
        {this.t('buttons.next')}
      </Button>
    </div>
  }
}

export default NextButton
