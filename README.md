<h1 align="center">Linkdrop SDK</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/LinkdropProtocol/linkdrop-sdk#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/LinkdropProtocol/linkdrop-sdk/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/LinkdropProtocol/linkdrop-sdk/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>


## Install

```sh
yarn add @linkdrop/sdk@https://github.com/LinkdropProtocol/linkdrop-sdk
```

## Usage 

## 1. Generate Verification Key Pair and provide Verifier address to deployed server 

Generate Ethereum key pair: VERIFIER_PRIVATE_KEY and corresponding VERIFIER_ADDRESS
Linkdropper running the server should update configs on the server to use the VERIFIER_ADDRESS

## 2. Generate Claim Links

Use SIGNING_PRIVATE_KEY generated at step 1 to create claim links via SDK:
```js
// import library
import LinkdropSDK from '@linkdrop/sdk'

// generate links
const CLAIM_HOST = 'https://phb-2df.linkdrop.io'
const ASSET = 'PHB-2DF'
const AMOUNT = 10**8 // in atomic values
  
const { url, linkId } = await LinkdropSDK.binance.generateLink({
  host: CLAIM_HOST,
  privateKey: VERIFIER_PRIVATE_KEY,
  asset: ASSET,
  amount: AMOUNT
})

console.log({ url, linkId })
``` 


## Contributors

* **Amir Jumaniyazov:** [@amiromayer](https://github.com/amiromayer)

* **Mikhail Dobrokhvalov:** [@dobrokhvalov](https://github.com/dobrokhvalov)


## Contributing

Contributions, issues and feature requests are welcome !<br />Feel free to check [issues page](https://github.com/amiromayer/binance-chain-linkdrop/issues).

## Show your support

Give a ✨ if this project helped you !

## Copyright

Copyright © 2019 [Linkdrop Labs, Inc.](https://github.com/LinkdropProtocol) &lt;hi@linkdrop.io&gt;.<br />
