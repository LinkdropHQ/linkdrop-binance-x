<h1 align="center">Binance Chain Linkdrop SDK</h1>

## Get started

```js
import sdk from '@linkdrop/binance-sdk'
```

## Generate new link

 ```js
    const API_HOST = 'https://binance.lindrop.io' // Relayer service API host
    const VERIFIER_PRIVATE_KEY = '' // Verifier private key to sign links with
    const ASSET = 'BNB' // Asset symbol
    const AMOUNT = 10 ** 8 // Asset amount in atomic value

    const {
      url,
      linkId,
      linkKey,
      verifierSignature
    } = await sdk.generateLink({
      apiHost: API_HOST,
      privateKey: VERIFIER_PRIVATE_KEY,
      asset: ASSET,
      amount: AMOUNT
    })
```

### Example

For usage example, please refer to the sample generate links script in `../scripts/src/generate-links.js`

## Claim link

In order to claim link, just parse all the arguments contained in the link, sign `receiverAddress` with `linkKey` contained in the link and pass all there parameters into the claim function:

 ```js
 const claimParams = {
    apiHost,
    asset,
    amount,
    linkId,
    verifierSignature,
    receiverAddress,
    receiverSignature
  }
   
  const { success, txHash, error } = await sdk.claim(claimParams)
```

### Example

For usage example, please refer to the sample claim script in `../scripts/src/claim-link.js`