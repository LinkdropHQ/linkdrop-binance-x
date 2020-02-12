import React from 'react'
import { deploymentUrl } from 'app.config.js'
import { actions, translate } from 'decorators'
import connectToChild from 'penpal/lib/connectToChild'
import styles from './styles.module'
import { Input, PageLoader } from 'components/common'
import NextButton from './next-button'

@actions(({
	user: {
		senderPrivateKey,
		verifierAddress
	},
	campaigns: {
		error
	}
}) => ({
	senderPrivateKey,
	verifierAddress,
	error
}))
@translate('pages.campaignCreate')
class Step2 extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			apiHost: ''
		}
	}

	componentDidMount () {
		this.actions().campaigns.setError({ error: null })
	}

  render () {
  	const { senderPrivateKey, error, verifierAddress } = this.props
  	const { apiHost } = this.state
  	if (!senderPrivateKey || !verifierAddress) { return <Loading /> }
    return <div className={styles.container}>
  		<h2 className={styles.subtitle}>{this.t('titles.deployServer')}</h2>
      <a target='_blank' href={`https://heroku.com/deploy?template=https://github.com/LinkdropHQ/linkdrop-binance-x/tree/master/packages/server&env[SENDER_PRIVATE_KEY]=${senderPrivateKey}&env[VERIFIER_ADDRESS]=${verifierAddress}`}>
				<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" />
			</a>
			<div className={styles.instruction}>{this.t('titles.copyApiHost')}</div>
			<h2 className={styles.subtitle}>{this.t('titles.pasteApiHost')}</h2>
			<Input
        className={styles.input}
        value={apiHost}
        onChange={({ value }) => this.setState({ apiHost: value })}
      />
      <div className={styles.error}>{error && this.t(`errors.${error}`)}</div>
      <NextButton apiHost={apiHost} />      	
    </div>
  }
}

export default Step2
