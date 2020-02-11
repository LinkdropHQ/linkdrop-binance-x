import { multiply, bignumber, add } from 'mathjs'

export default ({ symbol, amount, extraBnb }) => {
	if (symbol === 'BNB') {
		return [{
			denom: 'BNB',
	    amount: String(multiply(bignumber(amount), bignumber(100000000)))
		}]
	}
	if (extraBnb && Number(extraBnb) > 0 ) {
		return [
			{
				denom: symbol,
				amount: String(multiply(bignumber(amount), bignumber(100000000)))
			}, {
				denom: 'BNB',
				amount: String(multiply(bignumber(extraBnb), bignumber(100000000)))
			}
		]
	}
	return [{
		denom: symbol,
		amount: String(multiply(bignumber(amount), bignumber(100000000)))
	}]
}