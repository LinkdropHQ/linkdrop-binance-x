export default ({ symbol, balances, amount, commonBnb }) => {
	const bnbBalance = Number((balances.find(item => item.symbol === 'BNB') || { free: '0' }).free)
	if (symbol === 'BNB') {
		if (bnbBalance >= Number(commonBnb)) {
			return {
				bnbBalance,
				balance: 0,
				approved: true
			}
		}
		return {
			bnbBalance,
			balance: 0,
			approved: false
		}
	}
	const tokenBalance = Number((balances.find(item => item.symbol === symbol) || { free: '0' }).free)
	if (tokenBalance >= Number(amount) && bnbBalance >= Number(commonBnb)) {
		return {
			bnbBalance,
			balance: tokenBalance,
			approved: true
		}
	}
	return {
		bnbBalance,
		balance: tokenBalance,
		approved: false
	}
}