<h1 align="center">Binance Chain Linkdrop Scripts</h1>

## Generate links

There is two options on how to generate links via scripts:

### Option 1

Rename the `config.json.sample` file to `config.json` and fill it in and then just run:

```sh
yarn generate-links
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
