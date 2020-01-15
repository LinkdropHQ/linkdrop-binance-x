/* global web3 */
import React from 'react'
import { actions, translate } from 'decorators'
import { Button } from 'components/common'
import styles from './styles.module'
import { getHashVariables, defineNetworkName } from '@linkdrop/binance-commons'
import { infuraPk, portisDappId, formaticApiKeyTestnet, formaticApiKeyMainnet } from 'app.config.js'
import WalletConnect from "@trustwallet/walletconnect"
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal"

@actions(({ campaigns: { items } }) => ({ items }))
@translate('pages.main')
class Web3Injector extends React.Component {
  constructor (props) {
    super(props)
    const { chainId = '1' } = getHashVariables()
    const networkName = defineNetworkName({ chainId })
    this.wc = new WalletConnect({
      bridge: "https://bridge.walletconnect.org"
    })

    if (this.wc.connected) {
      console.log('here initial connect')
      this.applyWalletConnect(this.wc)
    }

    this.wc.on("session_update", (error, payload) => {
      console.log({ payload })
      if (error) {
        throw error;
      }
      console.log('here session update')
      this.applyWalletConnect(null)
    })

    this.wc.on("connect", (error, payload) => {
      console.log({ payload })
      if (error) {
        throw error
      }

      console.log('here connect')
      WalletConnectQRCodeModal.close()
      this.applyWalletConnect(this.wc)
    })

    this.wc.on("disconnect", (error, payload) => {
      if (error) {
        throw error
      }
      console.log('here disconnect')

      WalletConnectQRCodeModal.close()
      this.applyWalletConnect(null)
    })
  }

  applyWalletConnect (wc) {
    this.actions().user.setWCInstance({ wc })
  }

  openModal () {
    this.wc.createSession().then(() => {
      const uri = this.wc.uri
      console.log({ uri })
      WalletConnectQRCodeModal.open(uri, () => {
        console.log("QR Code Modal closed")
      })
    })
  }

  render () {
    const { disabled } = this.props
    return <div className={styles.container}>
      <h2 className={styles.title}>{this.t('titles.connectorSignIn')}</h2>
      <Button
        disabled={disabled}
        className={styles.button}
        onClick={_ => this.openModal()}
      >
        {this.t('buttons.signIn')}
      </Button>
    </div>
  }
}

export default Web3Injector
