import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { TransactionPopup } from 'components/common'

@actions(_ => ({}))
@translate('common.instruction')
class Instruction extends React.Component {
  render () {
    return <div className={styles.container}>
      <p className={styles.text} dangerouslySetInnerHTML={{ __html: this.t('texts._3') }} />
      <TransactionPopup />
      <p className={styles.textExtra} dangerouslySetInnerHTML={{ __html: this.t('texts._2') }} />
    </div>
  }
}

export default Instruction
