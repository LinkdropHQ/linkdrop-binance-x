import React from 'react'
import styles from './style.module'
import connectToParent from 'penpal/lib/connectToParent'
import { getHashVariables } from '@linkdrop/binance-commons'

const connection = connectToParent({
  methods: {
    multiply(num1, num2) {
      return num1 * num2;
    }
  }
})

class Application extends React.Component {
	render () {
		const { senderPrivateKey, verifierAddress } = getHashVariables()
		console.log({ senderPrivateKey, verifierAddress })
		return <div className={styles.container}>
			<a target='_blank' href="https://heroku.com/deploy?template=https://github.com/LinkdropHQ/linkdrop-binance-x/tree/master/packages/server&env[SENDER_PRIVATE_KEY]=SENDER_PRIVATE_KEY&env[VERIFIER_ADDRESS]=VERIFIER_ADDRESS">
				<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" />
			</a>
		</div>
	}
}

export default Application