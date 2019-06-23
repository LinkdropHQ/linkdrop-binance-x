# Linkdrop SDK for Binance Chain

## Usage

```js
import LinkdropSDK from 'linkdrop-sdk'
```

### Generate new link

 ```js
    const HOST = 'https://binance.lindrop.io' // Server host
    const VERIFIER_PRIVATE_KEY = '' // Ethereum private key
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