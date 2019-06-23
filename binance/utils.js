import axios from 'axios'
import BncClient from '@binance-chain/javascript-sdk'
const { crypto } = BncClient

const apiHost = 'https://dex.binance.org'
const prefix = 'bnb'
const network = 'mainnet'
const transferFee = 37500

/**
 * @dev Function to retrieve balance of a given address
 * @param {String} address Address to get balance of
 * @param {String} asset Asset symbol
 * @return {Object} Balance info
 */
const getBalance = async ({ address, asset }) => {
  try {
    if (!crypto.checkAddress(address)) {
      throw new Error('Please provide valid address')
    }

    const result = await axios.get(`${apiHost}/api/v1/account/${address}`)
    const balances = result.data.balances

    const balance = balances.find(
      b => b.symbol.toUpperCase() === asset.toUpperCase()
    )

    if (!balance) {
      const result = {
        free: '0.00000000',
        frozen: '0.00000000',
        locked: '0.00000000',
        symbol: asset.toUpperCase()
      }
      console.error(`Account ${address} does not hold any ${asset}`)
      return result
    }
    return balance
  } catch (err) {
    console.error(err)
  }
}

/**
 * Function to get address from private key
 * @param {String} privateKey Private key to get address from
 * @return {String} Address corresponding to `privateKey`
 */
const getAddressFromPrivateKey = privateKey =>
  crypto.getAddressFromPrivateKey(privateKey, prefix)

/**
 * @dev Returns a sequence for a given address
 * @param {String} address
 * @return {Number} Sequence
 */
const getSequence = async address => {
  const url = `${apiHost}/api/v1/account/${address}/sequence`
  const sequence = (await axios.get(url)).data.sequence || 0
  return Number(sequence)
}

/**
 * @dev Parse the string representation of units into a Number instance of the amount of units.
 * @param {String | Number} value
 * @return {Number} Value in atomic units
 */
const parseUnits = value => {
  return parseInt(Number(value) * 10 ** 8)
}

/**
 * @dev Format an amount of units into a decimal string representing the amount of units.
 * @param {String | Number} value
 * @return {Number} Value in decimal respresentation
 */
const formatUnits = value => {
  return Number(value) / 10 ** 8
}

/**
 * Function to retrieve transaction metadata for a passed tx hash
 * @param {String} hash Transaction hash
 * @return {Promise<Object>} Transaction metadata
 */
const getTransaction = async hash => {
  const url = `${apiHost()}/api/v1/tx/${hash}?format=json`
  return (await axios.get(url)).data
}

/**
 * Function to initialize binance chain client
 * @param {String} privateKey Private key
 * @return {Object} Binance chain client
 */
const initBncClient = async privateKey => {
  const bncClient = new BncClient(apiHost)
  await bncClient.chooseNetwork(network)
  await bncClient.setPrivateKey(privateKey)
  await bncClient.initChain()
  return bncClient
}

/**
 * Function to retrieve private key based on mnemonic phrase
 * @param {String} mnemonic Mnemonic to get private key from
 * @return {String} Private key
 */
const getPrivateKeyFromMnemonic = mnemonic =>
  crypto.getPrivateKeyFromMnemonic(mnemonic)

export default {
  initBncClient,
  getTransaction,
  getBalance,
  formatUnits,
  parseUnits,
  getSequence,
  getAddressFromPrivateKey,
  apiHost,
  prefix,
  network,
  transferFee,
  getPrivateKeyFromMnemonic
}
