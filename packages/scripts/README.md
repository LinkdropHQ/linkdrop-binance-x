<h1 align="center">Binance Chain Linkdrop Scripts</h1>


## Generate links

You can either fill in the config file or pass command line arguments to generate links

```sh
yarn generate-links
```

Arguments:
- claimHost - Claim page host
- verifierPk - Verifier private key
- asset - Asset name
- amount - Amount of asset to be claimed per link (in atomic value)
- n - Number of links to be generated

#### Example

Generating 20 links worth 0.0045 PHB-2DF would be as simple as:

```bash
yarn generate-links --claimHost="claim.linkdrop.io" --verifierPk="VERIFIER_PK" --asset="PHB-2DF" --amount="450000" --n=20 
```