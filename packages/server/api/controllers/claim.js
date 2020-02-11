import ClaimTx from '../models/ClaimTx'
import { wrapAsync } from '../utils'
import sdk from '@linkdrop/binance-sdk'
import config from '../../config'

/**
 * Function to check whether a `linkId` has already been claimed
 */
const isClaimed = wrapAsync(async (req, res) => {
  const linkId = req.params.linkId

  // Check whether a claim tx exists in database
  const oldClaimTx = await ClaimTx.findOne({
    linkId
  })

  if (oldClaimTx && oldClaimTx.txHash) {
    return res.json({
      isClaimed: true,
      txHash: oldClaimTx.txHash
    })
  } else return res.json({ isClaimed: false })
})

/**
 * Helper function to transfer funds
 * @param {String} privateKey Private key to send funds from
 * @param {String} to Address to send funds to
 * @param {String} asset Asset symbol
 * @param {String} memo An optional message to send along with funds
 * @return {Promise<Object>) `{success, txHash, error}`
 */
const transfer = async ({ privateKey, to, asset, amount, memo }) => {
  try {
    const from = sdk.utils.getAddressFromPrivateKey(privateKey)
    const sequence = await sdk.utils.getSequence(from)
    const bncClient = await sdk.utils.initBncClient(privateKey)

    const result = await bncClient.transfer(
      from,
      to,
      amount,
      asset,
      memo,
      sequence
    )

    if (result.status === 200) {
      return { success: true, txHash: result.result[0].hash }
    } else {
      return { success: false, error: result }
    }
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Helper function to transfer funds
 * @param {String} privateKey Private key to send funds from
 * @param {String} to Address to send funds to
 * @param {String} assets Assets array
 * @param {String} memo An optional message to send along with funds
 * @return {Promise<Object>) `{success, txHash, error}`
 */
const multiSend = async ({ privateKey, to, assets, memo }) => {
  try {
    const from = sdk.utils.getAddressFromPrivateKey(privateKey)
    const sequence = await sdk.utils.getSequence(from)
    const bncClient = await sdk.utils.initBncClient(privateKey)

    let coins = []

    for (const asset of assets) {
      coins.push({
        denom: asset.denom,
        amount: sdk.utils.formatUnits(Number(asset.amount))
      })
    }

    const outputs = [{ to, coins }]

    const result = await bncClient.multiSend(from, outputs, memo, sequence)

    if (result.status === 200) {
      return { success: true, txHash: result.result[0].hash }
    } else {
      return { success: false, error: result }
    }
  } catch (err) {
    throw new Error(err)
  }
}

const claim = wrapAsync(async (req, res) => {
  const {
    assets,
    linkId,
    verifierSignature,
    receiverAddress,
    receiverSignature
  } = req.body

  const VERIFIER_ADDRESS =
    process.env.VERIFIER_ADDRESS || config.VERIFIER_ADDRESS
  const SENDER_PRIVATE_KEY =
    process.env.SENDER_PRIVATE_KEY || config.SENDER_PRIVATE_KEY
  const senderAddress = sdk.utils.getAddressFromPrivateKey(SENDER_PRIVATE_KEY)

  // Check whether a claim tx exists in database
  const oldClaimTx = await ClaimTx.findOne({
    linkId
  })

  if (oldClaimTx && oldClaimTx.txHash) {
    console.log('\n✅  Submitted claim transaction')
    console.log('Tx hash', oldClaimTx.toObject().txHash, '\n')

    return res.json({
      success: true,
      txHash: oldClaimTx.txHash
    })
  } else {
    if (
      (await sdk.checkLinkParams({
        assets,
        linkId,
        verifierAddress: VERIFIER_ADDRESS,
        verifierSignature,
        receiverAddress,
        receiverSignature,
        senderAddress
      })) === true
    ) {
      try {
        const memo = `Linkdrop Id: ${linkId}`

        const { success, txHash, error } = await multiSend({
          privateKey: SENDER_PRIVATE_KEY,
          to: receiverAddress,
          assets,
          memo
        })

        if (success === true && txHash) {
          // Save claim tx to database
          let claimTx = new ClaimTx({
            assets,
            linkId,
            senderAddress,
            receiverAddress,
            verifierAddress: VERIFIER_ADDRESS,
            txHash
          })

          const document = await claimTx.save()

          claimTx = claimTx.toObject()

          console.log('\n✅  Submitted claim transaction')
          for (let key in claimTx) {
            if (key !== '_id' && (key !== '__v') & (key !== assets)) {
              console.log({ [key]: claimTx[key] })
            }
          }
          console.log('\n')
        }

        res.json({
          success,
          txHash,
          error
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
})

export default { claim, isClaimed }
