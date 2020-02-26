/* global web3 */
import React from 'react'
import { Loading } from '@linkdrop/binance-ui-kit'
import { actions, translate, platform } from 'decorators'
import InitialPage from './initial-page'
import WalletChoosePage from './wallet-choose-page'
import ClaimingProcessPage from './claiming-process-page'
import ErrorPage from './error-page'
import { parseAssetsFromUrl } from 'helpers'
import ClaimingFinishedPage from './claiming-finished-page'
import { getHashVariables } from '@linkdrop/binance-commons'

@actions(({ user: { errors, step, loading: userLoading, readyToClaim, alreadyClaimed }, tokens: { transactionId }, contract: { loading, decimals, amount, symbol, icon } }) => ({
  userLoading,
  loading,
  decimals,
  symbol,
  amount,
  icon,
  step,
  transactionId,
  errors,
  alreadyClaimed,
  readyToClaim
}))
@platform()
@translate('pages.claim')
class Claim extends React.Component {
  componentDidMount () {
    const {
      linkKey,
      apiHost
    } = getHashVariables()
    this.actions().tokens.checkIfClaimed({ linkKey, host: apiHost })
  }

  render () {
    return this.renderCurrentPage()
  }

  renderCurrentPage () {
    const { icon, loading: userLoading, errors, alreadyClaimed, step } = this.props
    const {
      receiverAddress
    } = getHashVariables()
    const {
      denoms,
      amounts
    } = parseAssetsFromUrl({ url: window.location.href })

    const commonData = { decimals: 18, amounts, denoms, icon, wallet: receiverAddress, loading: userLoading }
    if (errors && errors.length > 0) {
      // if some errors occured and can be found in redux store, then show error page
      return <ErrorPage error={errors[0]} />
    }

    if (alreadyClaimed) {
      // if tokens we already claimed (if wallet is totally empty).
      return <ClaimingFinishedPage
        {...commonData}
      />
    }
    switch (step) {
      case 1:
        return <InitialPage
          {...commonData}
          onClick={_ => {
            try {
              if (web3.currentProvider.isTrust) {
                // if wallet account was found in web3 context, then go to step 4 and claim data
                return this.actions().user.setStep({ step: 4 })
              }
              // if wallet was not found in web3 context, then go to step 2 with wallet select page and instructions
              this.actions().user.setStep({ step: 2 })
            } catch (e) {
              this.actions().user.setStep({ step: 2 })
            }
          }}
        />
      case 2:
        // page with wallet select component
        return <WalletChoosePage onClick={_ => {
          this.actions().user.setStep({ step: 3 })
        }} />
      case 3:
        // page with info about current wallet and button to claim tokens
        return <InitialPage
          {...commonData}
          onClick={_ => {
            this.actions().user.setStep({ step: 4 })
          }}
        />
      case 4:
        // claiming is in process
        return <ClaimingProcessPage
          {...commonData}
        />
      case 5:
        // claiming finished successfully
        return <ClaimingFinishedPage
          {...commonData}
        />
      default:
        // зloading
        return <Loading />
    }
  }
}

export default Claim
