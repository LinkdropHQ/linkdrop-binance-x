import React from 'react'
import { actions, translate } from 'decorators'
import styles from './styles.module'
import { ProgressBar } from 'components/common'

@actions(({
  campaigns: {
    linksAmount,
    links
  }
}) => ({
  linksAmount,
  links
}))
@translate('pages.campaignCreate')
class Step4 extends React.Component {
  componentDidMount () {
    this.actions().tokens.generateLink()
  }

  componentWillReceiveProps ({ links }) {
    const {
      linksAmount,
      links: prevLinks,
    } = this.props
    // save campaign when links ready
    if (links.length === linksAmount) {
      return this.actions().campaigns.save()
    }
    if (links && links.length > 0 && links.length > prevLinks.length && links.length < linksAmount) {
      this.actions().tokens.generateLink()
    }
  }

  render () {
    const { linksAmount, links } = this.props
    return <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>{this.t('titles.generatingLinks')}</div>
        <div className={styles.subtitle} dangerouslySetInnerHTML={{ __html: this.t('titles.loadingProcess') }} />
        <ProgressBar current={links.length} max={linksAmount} />
      </div>
    </div>
  }
}

export default Step4
