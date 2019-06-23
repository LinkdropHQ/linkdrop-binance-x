# Linkdrop SDK for Binance Chain

## Usage

```js
import LinkdropSDK from 'linkdrop-sdk'
```

### Generate new link

 ```js
    const HOST = 'https://binance.lindrop.io'
    const VERIFIER_PRIVATE_KEY = ''
    const ASSET = 'BNB'
    const AMOUNT = 10 ** 8 // This should be in atomic value

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