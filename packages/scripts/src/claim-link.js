import queryString from 'query-string'
import sdk from '@linkdrop/binance-sdk'
import { ethers } from 'ethers'
import path from 'path'
import config from '../config/config.json'
import csvToJson from 'csvtojson'

export const parseUrl = async rawUrl => {
  const url = await queryString.extract(rawUrl.replace('#', ''))
  return queryString.parse(url)
}

const main = async () => {
  const csvFilePath = path.resolve(__dirname, `../output/linkdrop.csv`)
  const jsonArray = await csvToJson().fromFile(csvFilePath)
  const rawUrl = jsonArray[0].url
  const { amount, asset, linkKey, verifierSignature, apiHost } = await parseUrl(
    rawUrl
  )
  const linkId = new ethers.Wallet(linkKey).address

  const receiverAddress = config.RECEIVER_ADDRESS
  const receiverSignature = await sdk.signReceiverAddress({
    linkKey,
    receiverAddress
  })

  const claimParams = {
    apiHost,
    asset,
    amount,
    linkId,
    verifierSignature,
    receiverAddress,
    receiverSignature
  }
  console.log('Claim params: ', JSON.stringify(claimParams, '', 4))

  const { success, txHash, error } = await sdk.claim(claimParams)

  if (success === true) {
    console.log('✅  Submitted claim transaction')
    console.log(`#️⃣  Tx hash: ${txHash}`)
  } else throw new Error(error)
}

main()
