import React from 'react'
import { actions, translate } from 'decorators'
import { Button } from 'components/common'
import { multiply, add, bignumber } from 'mathjs'
import styles from './styles.module'

@actions(({ user: { chainId } }) => ({ chainId }))
@translate('pages.campaignCreate')
class NextButton extends React.Component {
  render () {
    const { chainId, tokenAmount, currentAddress, linksAmount, serviceFee } = this.props
    return <Button
      className={styles.button} onClick={_ => {
        this.actions().connector.send({
          tokenAmount: multiply(bignumber(tokenAmount), bignumber(linksAmount)),
          account: currentAddress,
          chainId
        })
      }}
    >
      {this.t('buttons.approve')}
    </Button>
  }
}

export default NextButton
