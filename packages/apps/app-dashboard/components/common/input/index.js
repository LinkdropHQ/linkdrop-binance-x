import React from 'react'
import classNames from 'classnames'
import styles from './styles.module'
import { Input } from '@linkdrop/binance-ui-kit'

class InputNew extends React.Component {
  render () {
    const { className } = this.props
    return <Input {...this.props} className={classNames(className, styles.container)} />
  }
}

export default InputNew
