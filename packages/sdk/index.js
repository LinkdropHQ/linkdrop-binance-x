const ethers = require('ethers')
const utils = require('./utils')
const axios = require('axios')

/**
 * Function to check whether a `linkId` has already been claimed
 * @param {String} apiHost Relayer service host, e.g. https://binance.linkdrop.io
 * @param {String} linkId Link id
 * @return {Promise<Boolean>} True if link was claimed before, false otherwise
 */
const isClaimed = async ({ apiHost, linkId }) => {
  if (apiHost == null || apiHost === '' || typeof apiHost !== 'string') {
    throw new Error('Please provide `apiHost`')
  }
  if (linkId == null || linkId === '' || typeof linkId !== 'string') {
    throw new Error('Please provide `linkId`')
  }

  try {
    const response = await axios.get(`${apiHost}/api/v1/is-claimed/${linkId}`)

    if (response.status !== 200) {
      throw new Error(`Invalid response status ${response.status}`)
    } else {
      const { isClaimed, txHash } = response.data
      return { isClaimed, txHash }
    }
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Function to sign link params
 * @param {String} privateKey Private key to sign link params with
 * @param {String} asset Asset symbol
 * @param {Number} amount Asset amount in atomic value
 * @param {String} linkId Link id
 * @return {Promise<String>} Signature
 */
const signLinkParams = async ({ privateKey, asset, amount, linkId }) => {
  if (privateKey == null || privateKey === '') {
    throw new Error('Please provide `privateKey`')
  }
  if (asset == null || asset === '') {
    throw new Error('Please provide `asset`')
  }
  if (amount == null || amount === '') {
    throw new Error('Please provide `amount`')
  }
  if (linkId == null || linkId === '') {
    throw new Error('Please provide `linkId`')
  }

  const signer = new ethers.Wallet(privateKey)

  let hash = ethers.utils.solidityKeccak256(
    ['string', 'uint', 'address'],
    [asset, Number(amount), linkId]
  )
  let message = ethers.utils.arrayify(hash)

  return signer.signMessage(message)
}

/**
 * Function to sign receiver address
 * @param {String} linkKey Link key to sign `receiverAddress` with
 * @param {String} receiverAddress Address of receiver
 * @return {Promise<String>} Signature
 */
const signReceiverAddress = async ({ linkKey, receiverAddress }) => {
  if (linkKey == null || linkKey === '') {
    throw new Error('Please provide `linkKey`')
  }
  if (receiverAddress == null || receiverAddress === '') {
    throw new Error('Please provide `receiverAddress`')
  }
  const signer = new ethers.Wallet(linkKey)
  const hash = ethers.utils.solidityKeccak256(['string'], [receiverAddress])
  const message = ethers.utils.arrayify(hash)
  return signer.signMessage(message)
}

/**
 * Function to construct link params
 * @param {String} privateKey Private key to sign link params with
 * @param {String} asset Asset symbol
 * @param {Number} amount Asset amount in atomic value
 * @return {Promise<Object>} Links params
 */
const constructLink = async ({ privateKey, asset, amount }) => {
  if (privateKey == null || privateKey === '') {
    throw new Error('Please provide `privateKey`')
  }
  if (asset == null || asset === '') {
    throw new Error('Please provide `asset`')
  }
  if (amount == null || amount === '') {
    throw new Error('Please provide `amount`')
  }

  let wallet = ethers.Wallet.createRandom()
  let linkKey = wallet.privateKey
  let linkId = wallet.address

  let verifierSignature = await signLinkParams({
    privateKey,
    asset,
    amount,
    linkId
  })

  return {
    linkKey, // Link's ephemeral private key
    linkId, // Address corresponding to link key
    verifierSignature
  }
}

/**
 * Function to generate url based on passed params
 * @param {String} claimHost Claim host
 * @param {String} privateKey Private key to sign link params with
 * @param {String} asset Asset symbol
 * @param {Number} amount Asset amount in atomic value
 * @param {String} apiHost API host
 * @return {Promise<Object>} `{url, linkId, linkKey, verifierSignature}`
 */
const generateLink = async ({
  claimHost,
  privateKey,
  asset,
  amount,
  apiHost
}) => {
  if (claimHost == null || claimHost === '') {
    throw new Error('Please provide `claimHost`')
  }
  if (privateKey == null || privateKey === '') {
    throw new Error('Please provide `privateKey`')
  }
  if (asset == null || asset === '') {
    throw new Error('Please provide `asset`')
  }
  if (amount == null || amount === '') {
    throw new Error('Please provide `amount`')
  }
  if (apiHost == null || apiHost === '') {
    throw new Error('Please provide `apiHost`')
  }

  const { linkKey, linkId, verifierSignature } = await constructLink({
    privateKey,
    asset,
    amount
  })

  // Construct url
  let url = `${claimHost}/#/receive?asset=${asset}&amount=${amount}&linkKey=${linkKey}&verifierSignature=${verifierSignature}&apiHost=${apiHost}`

  return { url, linkId, linkKey, verifierSignature }
}

/**
 * Function to check whether link params are signed by `verifierAddress`
 * @param {String} asset Asset symbol
 * @param {Number} amount Asset amount in atomic value
 * @param {String} linkId Link id
 * @param {String} verifierAddress Verifier address
 * @param {String} verifierSignature Verifier signature
 * @return {Promise<Boolean>} True if success
 */
const checkVerifierSignature = async ({
  asset,
  amount,
  linkId,
  verifierAddress,
  verifierSignature
}) => {
  if (asset == null || asset === '') {
    throw new Error('Please provide `asset`')
  }
  if (amount == null || amount === '') {
    throw new Error('Please provide `amount`')
  }
  if (linkId == null || linkId === '') {
    throw new Error('Please provide `linkId`')
  }
  if (verifierAddress == null || verifierAddress === '') {
    throw new Error('Please provide `verifierAddress`')
  }
  if (verifierSignature == null || verifierSignature === '') {
    throw new Error('Please provide `verifierSignature`')
  }

  let hash = ethers.utils.solidityKeccak256(
    ['string', 'uint', 'address'],
    [asset, Number(amount), linkId]
  )
  let message = ethers.utils.arrayify(hash)

  return (
    (await ethers.utils.verifyMessage(message, verifierSignature)) ==
    verifierAddress
  )
}

/**
 * Function to check whether `receiverAddress` is signed by key corresponding to `linkId`
 * @param {String} linkId Link id
 * @param {String} receiverAddress Receiver address
 * @param {String} receiverSignature Receiver signature
 * @return {Promise<Boolean>} True if success
 */
const checkReceiverSignature = async ({
  linkId,
  receiverAddress,
  receiverSignature
}) => {
  if (linkId == null || linkId === '') {
    throw new Error('Please provide `linkId`')
  }
  if (receiverAddress == null || receiverAddress === '') {
    throw new Error('Please provide `receiverAddress`')
  }
  if (receiverSignature == null || receiverSignature === '') {
    throw new Error('Please provide `receiverSignature`')
  }
  let hash = ethers.utils.solidityKeccak256(['string'], [receiverAddress])
  let message = ethers.utils.arrayify(hash)

  return (
    (await ethers.utils.verifyMessage(message, receiverSignature)) == linkId
  )
}

/**
 * Function to check whether an `address` holds at least `amount` of tokens
 * @param {String} asset Asset symbol
 * @param {Number} amount Asset amount in atomic value
 * @param {String} address Address to check balance of
 * @return {Promise<Boolean} True if success
 */
const checkBalanceAvailable = async ({ asset, amount, address }) => {
  if (asset == null || asset === '') {
    throw new Error('Please provide `asset`')
  }
  if (amount == null || amount === '') {
    throw new Error('Please provide `amount`')
  }
  if (address == null || address === '') {
    throw new Error('Please provide `address`')
  }
  try {
    const balance = await utils.getBalance({ address, asset })
    const freeBalance = utils.parseUnits(balance['free'])
    return !(freeBalance < Number(amount))
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Function to check whether link params are valid
 * @param {String} asset Asset symbol
 * @param {Number} amount Asset amount in atomic value
 * @param {String} linkId Link id
 * @param {String} verifierAddress Verifier address
 * @param {String} verifierSignature Verifier signature
 * @param {String} receiverAddress Receiver address
 * @param {String} receiverSignature Receiver signature
 * @param {String} senderAddress Sender address
 * @return {Promise<Boolean>} True is success
 */
const checkLinkParams = async ({
  asset,
  amount,
  linkId,
  verifierAddress,
  verifierSignature,
  receiverAddress,
  receiverSignature,
  senderAddress
}) => {
  if (asset == null || asset === '') {
    throw new Error('Please provide `asset`')
  }
  if (amount == null || amount === '') {
    throw new Error('Please provide `amount`')
  }
  if (linkId == null || linkId === '') {
    throw new Error('Please provide `linkId`')
  }
  if (verifierAddress == null || verifierAddress === '') {
    throw new Error('Please provide `verifierAddress`')
  }
  if (verifierSignature == null || verifierSignature === '') {
    throw new Error('Please provide `verifierSignature`')
  }
  if (receiverAddress == null || receiverAddress === '') {
    throw new Error('Please provide `receiverAddress`')
  }
  if (receiverSignature == null || receiverSignature === '') {
    throw new Error('Please provide `receiverSignature`')
  }
  if (senderAddress == null || senderAddress === '') {
    throw new Error('Please provide `senderAddress`')
  }

  // Verify that `linkId` has not been claimed on the server

  // Verify that amount is positive and less than max total supply
  if (Number(amount) <= 0 || Number(amount) > 9000000000000000000) {
    throw new Error('Invalid amount')
  }

  // Verify that sender has enough balance to linkdrop
  if (
    (await checkBalanceAvailable({
      asset,
      amount,
      address: senderAddress
    })) === false
  ) {
    throw new Error(`Insufficient ${asset} on ${senderAddress} balance`)
  }

  // Verify that link params are signed by `verifierAddress`
  if (
    (await checkVerifierSignature({
      asset,
      amount,
      linkId,
      verifierAddress,
      verifierSignature
    })) === false
  ) {
    throw new Error(`Failed to verify verifier signature`)
  }

  // Verify that receiver address is signed by ephemeral key corresponding to `linkId`
  if (
    (await checkReceiverSignature({
      linkId,
      receiverAddress,
      receiverSignature
    })) === false
  ) {
    throw new Error(`Failed to verify receiver signature`)
  }

  return true
}

/**
 Function to claim link
 * @param {String} apiHost Relayer service host, e.g. https://binance.linkdrop.io
 * @param {String} asset Asset symbol
 * @param {Number} amount Asset amount in atomic value
 * @param {String} linkId Link id
 * @param {String} receiverAddress Receiver address
 * @param {String} verifierSignature Verifier signature
 * @param {String} receiverSignature Receiver signature
 * @return {Promise<Object} `{success, txHash, error}`
 */
const claim = async ({
  apiHost,
  asset,
  linkId,
  amount,
  receiverAddress,
  verifierSignature,
  receiverSignature
}) => {
  if (apiHost == null || apiHost === '') {
    throw new Error('Please provide `apiHost`')
  }
  if (asset == null || asset === '') {
    throw new Error('Please provide `asset`')
  }
  if (amount == null || amount === '') {
    throw new Error('Please provide `amount`')
  }
  if (linkId == null || linkId === '') {
    throw new Error('Please provide `linkId`')
  }
  if (verifierSignature == null || verifierSignature === '') {
    throw new Error('Please provide `verifierSignature`')
  }
  if (receiverAddress == null || receiverAddress === '') {
    throw new Error('Please provide `receiverAddress`')
  }
  if (receiverSignature == null || receiverSignature === '') {
    throw new Error('Please provide `receiverSignature`')
  }

  try {
    const claimParams = {
      asset,
      linkId,
      amount,
      receiverAddress,
      verifierSignature,
      receiverSignature
    }

    const response = await axios.post(`${apiHost}/api/v1/claim`, claimParams)

    if (response.status !== 200) {
      throw new Error(`Invalid response status ${response.status}`)
    } else {
      const { success, txHash, error } = response.data
      return { success, txHash, error }
    }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  isClaimed,
  claim,
  generateLink,
  checkBalanceAvailable,
  signLinkParams,
  signReceiverAddress,
  checkVerifierSignature,
  checkReceiverSignature,
  checkLinkParams,
  utils
}
