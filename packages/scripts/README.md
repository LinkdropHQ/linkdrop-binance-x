<h1 align="center">Binance Chain Linkdrop Scripts</h1>

## Generate links

There is two options on how to generate links via scripts:

### Option 1

Rename the `config.json.sample` file to `config.json` and fill it in and then just run:

```sh
yarn generate-links
```

This will generate the provided number of links and save them to `./output/linkdrop.csv`

### Option 2

Alternatively it's also possible to override the `config.json` parameters by passing command line arguments:

Arguments:

- `claimHost` Claim page host
- `verifierPk` Verifier private key
- `asset` Asset name
- `amount` Amount of asset to be claimed per link (in atomic value)
- `n` Number of links to be generated
- `apiHost` API host to claim tokens

#### Example

Generating 20 links worth 0.0045 PHB-2DF each would be as simple as:

```bash
yarn generate-links --claimHost="claim.linkdrop.io" --verifierPk="VERIFIER_PK" --asset="PHB-2DF" --amount="450000" --n=20 --apiHost="http://localhost:5000"
```

This will generate the provided number of links and save them to `./output/linkdrop.csv`

## Claim links

Run server from the root

```bash
yarn server
```

❗️Don't forget to fill in the `../server/config/config.json`

With the server up and running you can claim generated links from another terminal by running

```
yarn claim-link
```

This will claim link and return the transaction hash
