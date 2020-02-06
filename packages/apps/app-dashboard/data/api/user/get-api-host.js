import fetch from '../fetch'

export default ({ apiHost }) => fetch(`http://rinkeby.linkdrop.io:6002/users/get-by-api-host/${apiHost}`)
