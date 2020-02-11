import queryString from 'query-string'
import sdk from '@linkdrop/binance-sdk'
import { ethers } from 'ethers'
import path from 'path'
import config from '../config/config.json'
import csvToJson from 'csvtojson'

const duplicates = array => {
  return array.reduce(function (acc, el, i, arr) {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el)
    return acc
  }, [])
}

const parseUrl = url => {
  url = new URL(url.replace('#', ''))
  let keys = Array.from(url.searchParams.keys())
  let parsed = {}
  for (let key of keys) {
    if (duplicates(keys).includes(key)) {
      parsed[key.replace(/\[.*?\]/g, '')] = url.searchParams.getAll(key)
    } else {
      parsed[key] = url.searchParams.get(key)
    }
  }
  return parsed
}

const main = async () => {
  const csvFilePath = path.resolve(__dirname, `../output/linkdrop.csv`)
  const jsonArray = await csvToJson().fromFile(csvFilePath)
  const rawUrl = jsonArray[0].url
  const {
    linkKey,
    verifierSignature,
    apiHost,
    denoms,
    amounts
  } = await parseUrl(rawUrl)

  let assets = []

  denoms.forEach((denom, index) => {
    const amount = amounts[index]
    assets.push({ denom, amount })
  })

  const linkId = new ethers.Wallet(linkKey).address

  const receiverAddress = config.RECEIVER_ADDRESS
  const receiverSignature = await sdk.signReceiverAddress({
    linkKey,
    receiverAddress
  })

  const claimParams = {
    apiHost,
    assets,
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
