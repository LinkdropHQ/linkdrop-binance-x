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

#### Example

Generating 20 links worth 0.0045 PHB-2DF each would be as simple as:

```bash
yarn generate-links --claimHost="claim.linkdrop.io" --verifierPk="VERIFIER_PK" --asset="PHB-2DF" --amount="450000" --n=20
```