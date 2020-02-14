<h1 align="center">Binance Chain Linkdrop SDK</h1>

## Get started

```js
import sdk from '@linkdrop/binance-sdk'
```

## Generate new link

```js
const CLAIM_HOST = 'https://binance.lindrop.io' // Claim page host url
const VERIFIER_PRIVATE_KEY = '' // Verifier private key to sign links with
const ASSETS = [
  { denom: 'BNB', amount: '1' },
  { denom: 'PHB-2DF', amount: '2' }
]
const API_HOST = 'http://localhost:5000' // Relayer service API host

const { url, linkId, linkKey, verifierSignature } = await sdk.generateLink({
  apiHost: API_HOST,
  privateKey: VERIFIER_PRIVATE_KEY,
  assets: ASSETS,
  amount: AMOUNT,
  claimHost: CLAIM_HOST
})
```

### Example

For usage example, please refer to the sample generate links script in `../scripts/src/generate-links.js`

## Claim link

In order to claim link, just parse all the arguments contained in the link, sign `receiverAddress` with `linkKey` contained in the link and pass all there parameters into the claim function:

```js
const claimParams = {
  apiHost,
  assets,
  linkId,
  verifierSignature,
  receiverAddress,
  receiverSignature
}

const { success, txHash, error } = await sdk.claim(claimParams)
```

### Example

For usage example, please refer to the sample claim script in `../scripts/src/claim-link.js`
