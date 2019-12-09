const ethers = require('ethers')
const utils = require('./utils')
const axios = require('axios')

/**
 * Function to check whether a `linkId` has already been claimed
 * @param {String} host Relayer service host, e.g. https://binance.linkdrop.io
 * @param {String} linkId Link id
 * @return {Promise<Boolean>} True if link was claimed before, false otherwise
 */
const isClaimed = async ({ host, linkId }) => {
  try {
    const response = await axios.get(`${host}/api/v1/is-claimed/${linkId}`)

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
 * @param {String} privateKey Private key to sign address with
 * @param {String} receiverAddress Address of receiver
 * @return {Promise<String>} Signature
 */
const signReceiverAddress = async ({ privateKey, receiverAddress }) => {
  const signer = new ethers.Wallet(privateKey)
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
 * @return {Promise<Object>} `{url, linkId, linkKey, verifierSignature}`
 */
const generateLink = async ({ claimHost, privateKey, asset, amount }) => {
  if (claimHost == null || claimHost === '') {
    throw new Error(`Please provide claim host`)
  }

  if (privateKey == null || privateKey === '') {
    throw new Error(`Please provide a private key to sign link params with`)
  }

  if (asset == null || asset === '') {
    throw new Error(`Please provide asset symbol`)
  }

  if (amount == null || amount === '') {
    throw new Error(`Please provide asset amount`)
  }

  const { linkKey, linkId, verifierSignature } = await constructLink({
    privateKey,
    asset,
    amount
  })

  // Construct url
  let url = `${claimHost}/#/receive?asset=${asset}&amount=${amount}&linkKey=${linkKey}&verifierSignature=${verifierSignature}`

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
  signReceiverAddress,
  checkVerifierSignature,
  checkReceiverSignature,
  checkLinkParams,
  utils
}
