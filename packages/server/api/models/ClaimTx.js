import { Schema, model } from 'mongoose'

const claimTxSchema = new Schema({
  assets: { type: Array, required: true },
  linkId: { type: String, required: true },
  senderAddress: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  verifierAddress: { type: String, required: true },
  txHash: { type: String, reqiured: true }
})

const ClaimTx = model('ClaimTx', claimTxSchema)

export default ClaimTx
