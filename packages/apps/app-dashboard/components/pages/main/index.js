import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { ActionBlock } from 'components/common'
import { defineDefaultSymbol } from 'helpers'

@actions(({ user: { currentAddress, chainId }, campaigns: { items } }) => ({ chainId, currentAddress, items }))
@translate('pages.main')
class Main extends React.Component {
  constructor (props) {
    super(props)
    const { chainId } = this.props
    this.defaultSymbol = defineDefaultSymbol({ chainId })
  }

  render () {
    return <div className={styles.container}>
      <ActionBlock
        title={this.t('titles.campaign')}
        description={this.t('texts.listOfLinks')}
        extraContent={''}
        href='/#/campaigns/create'
        buttonTitle={this.t('buttons.create')}
      />

      <ActionBlock
        transparent
        transparentButton
        title={this.t('titles.customSolutions')}
        description={this.t('texts.incentivizeCustomer')}
        onClick={_ => {
          window.open('https://linkdrop.io/contact', '_blank')
        }}
        buttonTitle={this.t('buttons.contactUs')}
      />
    </div>
  }
}

export default Main
