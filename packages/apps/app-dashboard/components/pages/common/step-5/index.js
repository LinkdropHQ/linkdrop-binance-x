/* global Image */
import React from 'react'
import { ethers, utils } from 'ethers'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import classNames from 'classnames'
import { Button, PageHeader, PageLoader } from 'components/common'
import { Icons } from '@linkdrop/binance-ui-kit'
import { getImages, defineDefaultSymbol } from 'helpers'

@actions(({ user: { loading, chainId }, campaigns: { items, current } }) => ({ chainId, items, current, loading }))
@translate('pages.campaignCreate')
class Step5 extends React.Component {
  constructor (props) {
    super(props)
    const { chainId } = this.props
    this.defaultSymbol = defineDefaultSymbol({ chainId })
  }

  render () {
    const { items, current, campaignToCheck, loading, chainId } = this.props
    const currentCampaign = items.find(item => item.id === (campaignToCheck || current))
    const images = getImages({ src: 'claim-page' })
    if (!currentCampaign) { return null }
    const {
      amount,
      symbol,
      defaultWallet,
      linksAmount,
      created,
      links,
      id,
      campaignId,
      currentAddress,
      senderPrivateKey,
      verifierPrivateKey,
      senderAddress,
      verifierAddress
    } = currentCampaign 

    return <div className={styles.container}>
      <PageHeader title={this.t('titles.getTheLinks')} />
      {loading && <PageLoader />}
      <div className={styles.content}>
        <div className={styles.automatic}>
          <p className={styles.text}>{this.t('titles.linkdropSdk')}</p>
          <p className={classNames(styles.text, styles.textGrey, styles.textMargin40)}>{this.t('titles.automaticDistribution')}</p>
          <Button onClick={_ => window.open('https://github.com/LinkdropProtocol/linkdrop-monorepo/tree/master/packages/sdk', '_blank')} className={classNames(styles.button, styles.buttonMargin40, styles.buttonWithImg)}>
            <span>{this.t('buttons.useLinkdropSdk')}</span><Icons.ExternalLink fill='#FFF' />
          </Button>
          <p className={classNames(styles.text, styles.textMargin80)}>{this.t('titles.nodeJsSupport')}</p>
          {false && <xmp className={styles.codeBlock}>
            {this.t('texts.codeBlock')}
          </xmp>}
        </div>
        <div className={styles.manual}>
          <p className={styles.text}>{this.t('titles.downloadFile')}</p>
          <p className={classNames(styles.text, styles.textGrey, styles.textMargin40)}>{this.t('titles.manual')}</p>
          <div className={styles.buttonsContainer}>
            <Button onClick={_ => links && this.actions().campaigns.getCSV({ links, id: campaignToCheck || current })} className={styles.button}>{this.t('buttons.downloadCsv')}</Button>
          </div>
          <p
            onClick={e => {
              if (e.target.tagName === 'A') {
                e.preventDefault()
                const image = new Image()
                image.src = e.target.getAttribute('href')
                const w = window.open('')
                w.document.write(image.outerHTML)
              }
            }} className={classNames(styles.text, styles.textMargin60)} dangerouslySetInnerHTML={{ __html: this.t('titles.howToClaimPreview', { href: images.image }) }}
          />
          {false && <p className={classNames(styles.text, styles.textMargin20)} dangerouslySetInnerHTML={{ __html: this.t('titles.visitHelpCenter', { href: 'https://www.notion.so/Help-Center-9cf549af5f614e1caee6a660a93c489b' }) }} />}
        </div>
      </div>

      <div>
        <p className={classNames(styles.text, styles.textMargin20)}>{this.t('titles.contractParams')}</p>
        <p className={classNames(styles.text, styles.textMargin10, styles.ellipsis)} dangerouslySetInnerHTML={{ __html: this.t('titles.senderAddress', { address: senderAddress }) }} />
        <p className={classNames(styles.text, styles.textMargin10, styles.ellipsis)} dangerouslySetInnerHTML={{ __html: this.t('titles.verifierAddress', { address: verifierAddress }) }} />
        <p className={classNames(styles.text, styles.ellipsis)} dangerouslySetInnerHTML={{ __html: this.t('titles.campaignId', { campaignId }) }} />
      </div>
    </div>
  }
}

export default Step5
