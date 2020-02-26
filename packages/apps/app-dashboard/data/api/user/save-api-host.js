import fetch from '../fetch'
import { host } from 'app.config.js'

export default ({ currentAddress, senderAddress, apiHost }) => {
	const body = JSON.stringify({
		address: currentAddress,
		topupAddress: senderAddress,
		apiHost
	})
	return fetch(`${host}/users`, { method: 'POST', body })
}
