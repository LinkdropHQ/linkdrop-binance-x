
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
    chain_id: chainId,
    account_number: String(accountNumber),
    sequence,
    source: 0,
    memo: '',
    sendCoins: {
      inputs: [
        {
          address: fromAddress,
          coins: [
            { 
              denom: symbol,
              amount
            }
          ]
        }
      ],
      ouputs: [
        {
          address: toAddress,
          coins: [
            { 
              denom: symbol,
              amount
            }
          ]
        }
      ]
    }
  }
}