export default ({
  accountNumber,
  chainId,
  symbol,
  sequence,
  toAddress,
  fromAddress,
  amount,
  feeSymbol,
  feeAmount
}) => {
  return {
    accountNumber: String(accountNumber),
    chainId,
    fee: {
      amounts: [
        {
          denom: feeSymbol,
          amount: String(feeAmount / 100)
        }
      ],
      gas: "37500"
    },
    sequence: String(sequence),
    sendCoinsMessage: {
      fromAddress,
      toAddress,
      amounts: [
        {
          denom: symbol,
          amount: String(amount)
        }
      ]
    }
  }
}