import React from 'react'
import styles from './styles.module'
import { Aside, Header, Button } from 'components/common'
import { translate, actions } from 'decorators'
import { Scrollbars } from 'react-custom-scrollbars'
import Web3Injector from './web3-injector'
import { Loading } from '@linkdrop/binance-ui-kit'
import NetworkNotSupported from './network-not-supported'
import { defineNetworkName } from '@linkdrop/binance-commons'
const ls = window.localStorage
const ss = window.sessionStorage

@actions(({ user: { currentAddress, chainId, loading, step, wcInstance } }) => ({ loading, currentAddress, chainId, step, wcInstance }))
@translate('pages.page')
class Page extends React.Component {
  // componentDidMount () {
  //   const { wcInstance } = this.props
  //   if (wcInstance && wcInstance.connected) {
  //     this.actions().user.setWCInstance({ provider: web3Provider })
  //   }
  // }

  defineContent ({ currentAddress }) {
    const { chainId, loading, wcInstance } = this.props
    if (!wcInstance) {
      return <Web3Injector />
    }
    if (currentAddress === null && loading) {
      return <div>
        <Loading />
        <Button className={styles.button} onClick={_ => this.emptyWalletconnectSession()}>{this.t('titles.reloadSession')}</Button>
      </div>
    }
    // commented out because we need to define valid network ids
    // if (!defineNetworkName({ chainId })) {
    //   return <NetworkNotSupported />
    // }
    return this.props.children
  }

  render () {
    const { currentAddress, step } = this.props
    const content = this.defineContent({ currentAddress })
    return <div className={styles.container}>
      <div className={styles.easterEgg} onClick={_ => this.emptyLs()} />
      <Aside />
      <div className={styles.mainWrapper}>
        <Scrollbars style={{
          heigth: '100%',
          width: '100%'
        }}
        >
          <div className={styles.main}>
            <Header step={step} />
            {content}
          </div>
        </Scrollbars>
      </div>
    </div>
  }

  emptyWalletconnectSession () {
    ls.removeItem('walletconnect')
    window.location.reload()
  }

  emptyLs () {
    ls.clear()
    window.location.reload()
  }
}

export default Page
