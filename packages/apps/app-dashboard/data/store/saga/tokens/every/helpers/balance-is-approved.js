export default ({ symbol, balances, amount, fee }) => {
	const bnbBalance = Number((balances.find(item => item.symbol === 'BNB') || { free: '0' }).free)
	if (symbol === 'BNB') {
		if (bnbBalance >= Number(amount) + Number(fee)) {
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
	if (tokenBalance >= Number(amount) && bnbBalance >= Number(fee)) {
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