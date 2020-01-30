import React from 'react'
import { actions, translate } from 'decorators'
import { Button } from 'components/common'
import { multiply, add, bignumber } from 'mathjs'
import styles from './styles.module'

@actions(({}) => ({}))
@translate('pages.campaignCreate')
class CheckButton extends React.Component {
  render () {
    return <Button
      className={styles.button}
      onClick={_ => {
        this.actions().connector.send()
      }}
    >
      {this.t('buttons.check')}
    </Button>
  }
}

export default CheckButton
