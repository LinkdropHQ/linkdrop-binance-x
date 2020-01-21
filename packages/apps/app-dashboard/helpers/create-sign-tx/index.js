export default ({
  accountNumber,
  chainId,
  denom, sequence, toAddress, fromAddress, toAddress }) => {
  return {
    accountNumber,
    chainId,
    fee: {
      amounts: [
        {
          denom: "uatom",
          amount: "5000"
        }
      ],
      gas: "200000"
    },
    sequence,
    sendCoinsMessage: {
      fromAddress,
      toAddress,
      amounts: [
        {
          denom: "uatom",
          amount: "100000"
        }
      ]
    }
  }
}