const duplicates = array => {
  return array.reduce(function (acc, el, i, arr) {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el)
    return acc
  }, [])
}

export default ({ url }) => {
  url = new URL(url.replace('#', ''))
  let keys = Array.from(url.searchParams.keys())
  let parsed = {}
  for (let key of keys) {
     if (
      duplicates(keys).includes(key) ||
      key === 'denoms[]' ||
      key === 'amounts[]'
    ) {
      parsed[key.replace(/\[.*?\]/g, '')] = url.searchParams.getAll(key)
    } else {
      parsed[key] = url.searchParams.get(key)
    }
  }
  return parsed
}