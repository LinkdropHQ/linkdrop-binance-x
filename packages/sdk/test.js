const url = require('url')

const duplicates = array => {
  return array.reduce(function (acc, el, i, arr) {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el)
    return acc
  }, [])
}

const parseUrl = url => {
  url = new URL(url.replace('#', ''))
  let keys = Array.from(url.searchParams.keys())
  let parsed = {}
  for (let key of keys) {
    if (duplicates(keys).includes(key)) {
      parsed[key.replace(/\[.*?\]/g, '')] = url.searchParams.getAll(key)
    } else {
      parsed[key] = url.searchParams.get(key)
    }
  }
  return parsed
}

const main = async () => {
  const assets = [
    { denom: 'BNB', amount: '100' },
    { denom: 'PHB', amount: '1000' },
    { denom: 'BTC', amount: '1' }
  ]

  let url = `https://claim.linkdrop.io/#/receive?linkKey=${'linkKey'}&verifierSignature=${'verifierSignature'}&apiHost=${'apiHost'}`

  assets.forEach(asset => {
    url = `${url}&denoms[]=${asset.denom}&amounts[]=${asset.amount}`
  })

  const parsed = parseUrl(url)
  console.log('parsed: ', parsed)
}

main()
