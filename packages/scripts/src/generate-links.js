import sdk from '@linkdrop/binance-sdk'
import path from 'path'
import fastcsv from 'fast-csv'
import fs from 'fs'
import config from './config/config.json'
const args = require('yargs').argv

const CLAIM_HOST = args.claimHost || config.CLAIM_HOST
const VERIFIER_PRIVATE_KEY =
  args.verifierPk || args.verifierPK || config.VERIFIER_PRIVATE_KEY
const ASSET = args.asset || config.ASSET
const AMOUNT = args.amount || config.AMOUNT
const LINKS_NUMBER = args.n || config.LINKS_NUMBER

if (CLAIM_HOST == null || CLAIM_HOST === '') {
  throw new Error('Please provide claim host')
}

if (VERIFIER_PRIVATE_KEY == null || VERIFIER_PRIVATE_KEY === '') {
  throw new Error('Please provide verifier private key')
}

if (ASSET == null || ASSET === '') {
  throw new Error('Please provide asset symbol')
}

if (AMOUNT == null || AMOUNT === '') {
  throw new Error('Please provide asset amount in atomic value')
}

if (LINKS_NUMBER == null || LINKS_NUMBER === '') {
  throw new Error('Please provide number of links to generate')
}

const main = async () => {
  try {
    // Generate links
    let links = []
    for (let i = 0; i < LINKS_NUMBER; i++) {
      const { url } = await sdk.generateLink({
        claimHost: CLAIM_HOST,
        privateKey: VERIFIER_PRIVATE_KEY,
        asset: ASSET,
        amount: AMOUNT
      })

      links.push({ url })
    }

    // Save links
    const dir = path.join(__dirname, './output')
    const filename = path.join(dir, 'linkdrop.csv')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    const ws = fs.createWriteStream(filename)
    fastcsv.write(links).pipe(ws)
  } catch (err) {
    throw new Error(err)
  }
}

main()
