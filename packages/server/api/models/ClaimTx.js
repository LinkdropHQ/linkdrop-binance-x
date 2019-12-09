import { Schema, model } from 'mongoose'

const claimTxSchema = new Schema({
  asset: { type: String, required: true },
  amount: { type: String, required: true },
  linkId: { type: String, required: true },
  senderAddress: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  verifierAddress: { type: String, required: true },
  txHash: { type: String, reqiured: true }
})

const ClaimTx = model('ClaimTx', claimTxSchema)

export default ClaimTx
