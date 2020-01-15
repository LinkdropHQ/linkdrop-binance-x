import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { TransactionPopup } from 'components/common'
import { convertFromExponents } from '@linkdrop/binance-commons'
import { multiply, bignumber, add } from 'mathjs'
import config from 'config-dashboard'

@actions(_ => ({}))
@translate('common.instruction')
class Instruction extends React.Component {
  render () {
    const { tokenAmount, tokenSymbol, linksAmount } = this.props
    return <div className={styles.container}>
      <p className={styles.text} dangerouslySetInnerHTML={{ __html: this.t('texts._3') }} />
      <TransactionPopup amount={0} />
      <p className={styles.textExtra} dangerouslySetInnerHTML={{ __html: this.t('texts._2') }} />
    </div>
  }
}

export default Instruction
