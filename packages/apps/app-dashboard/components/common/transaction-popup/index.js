import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { RetinaImage, Icons } from '@linkdrop/binance-ui-kit'
import { getImages } from 'helpers'

@actions(({ user: { chainId } }) => ({ chainId }))
@translate('common.pageHeader')
class TransactionPopup extends React.Component {
  render () {
    const popup = this.definePopup()
    return <div className={styles.container}>
      {popup}
    </div>
  }

  definePopup () {
    return <div className={styles.content}>
      <RetinaImage
        className={styles.img}
        width={245}
        {...getImages({ src: 'popup-approve' })}
      />
      <div className={styles.arrow}>
        <Icons.Cursor />
      </div>
    </div>
  }
}

export default TransactionPopup
