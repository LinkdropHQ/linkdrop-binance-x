import fetch from '../fetch'

export default ({ address }) => fetch(`https://dex.binance.org/api/v1/account/${address}`, { disableDefaults: true })
