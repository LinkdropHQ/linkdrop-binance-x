# Linkdrop SDK for Binance Chain

## Usage

```js
import LinkdropSDK from '@linkdrop/sdk'
```

### Generate new link

 ```js
    const HOST = 'https://binance.lindrop.io' // Relayer service host
    const VERIFIER_PRIVATE_KEY = '' // Verifier private key to sign links with
    const ASSET = 'BNB' // Asset symbol
    const AMOUNT = 10 ** 8 // Asset amount in atomic value

    const {
      url,
      linkId,
      linkKey,
      verifierSignature
    } = await LinkdropSDK.binance.generateLink({
      host: HOST,
      privateKey: VERIFIER_PRIVATE_KEY,
      asset: ASSET,
      amount: AMOUNT
    })
```