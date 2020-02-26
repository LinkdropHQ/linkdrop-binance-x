export default (state, { payload: { balance, bnbBalance, approved } }) => ({ ...state, balance, bnbBalance, approved })
