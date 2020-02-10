import React from 'react'
import { translate } from 'decorators'
import styles from './styles.module'
import { Input } from 'components/common'

@translate('pages.step1')
class AddBnb extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      enableInput: false
    }
  }

  render () {
    const { enableInput} = this.state
    const { addValue, value } = this.props
    return <div className={styles.container}>
      <span className={styles.plus}>+</span> {this.renderContent({ enableInput, value, addValue })}
    </div>
  }

  renderContent ({ value, enableInput, addValue }) {
    if (enableInput) {
      return <Input
        value={value}
        numberInput
        suffix='BNB'
        onChange={({ value }) => addValue && addValue({ value })}
      />
    }
    return <div className={styles.button} onClick={_ => this.setState({ enableInput: true })}>{this.t('titles.addBnb')}</div>
  }
}

export default AddBnb
