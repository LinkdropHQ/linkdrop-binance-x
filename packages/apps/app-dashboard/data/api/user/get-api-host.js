import fetch from '../fetch'
import { host } from 'app.config.js'

export default ({ apiHost }) => fetch(`${host}/users/get-by-api-host/${apiHost}`)
