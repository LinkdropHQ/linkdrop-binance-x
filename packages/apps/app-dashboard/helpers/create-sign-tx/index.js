export default ({
  accountNumber,
  chainId,
  symbol,
  sequence,
  toAddress,
  fromAddress,
  amount
}) => {
  return {
    accountNumber: String(accountNumber),
    chainId,
    fee: {
      amounts: [
        {
          denom: symbol,
          amount: String(amount / 100)
        }
      ],
      gas: "200000"
    },
    sequence: String(sequence),
    send_coins_message: {
      fromAddress,
      toAddress,
      amounts: [
        {
          denom: symbol,
          amount: String(amount)
        }
      ]
    },
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