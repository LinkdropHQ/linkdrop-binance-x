import LinkdropSDK from '@linkdrop/binance-sdk/src/index'
export default ({ claimHost, linkdropMasterAddress, chainId, jsonRpcUrl, apiHost, factoryAddress }) => {
  return new LinkdropSDK({
    linkdropMasterAddress,
    chain: chainId,
    claimHost,
    jsonRpcUrl,
    apiHost,
    factoryAddress
  })
}
