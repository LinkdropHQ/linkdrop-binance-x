import fetch from '../fetch'

export default ({ currentAddress, senderAddress, apiHost }) => {
	const body = JSON.stringify({
		address: currentAddress,
		topupAddress: senderAddress,
		apiHost
	})
	return fetch(`http://rinkeby.linkdrop.io:6002/users`, { method: 'POST', body })
}
