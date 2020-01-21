import React from 'react'
import { deploymentUrl } from 'app.config.js'
import { actions, translate } from 'decorators'
import connectToChild from 'penpal/lib/connectToChild'
import styles from './styles.module'

@actions(({
	user: {
		senderPrivateKey,
		verifierAddress
	}
}) => ({
	senderPrivateKey,
	verifierAddress
}))
@translate('pages.campaignCreate')
class Step2 extends React.Component {
	componentDidMount () {
		this.actions().user.createKeys()
	}

  render () {
  	const { senderPrivateKey, verifierAddress } = this.props
  	console.log({ senderPrivateKey, verifierAddress })
    return <div>
      <a target='_blank' href={`https://heroku.com/deploy?template=https://github.com/LinkdropHQ/linkdrop-binance-x/tree/master/packages/server&env[SENDER_PRIVATE_KEY]=${senderPrivateKey}&env[VERIFIER_ADDRESS]=${verifierAddress}`}>
				<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" />
			</a>
    </div>
  }
}

export default Step2
