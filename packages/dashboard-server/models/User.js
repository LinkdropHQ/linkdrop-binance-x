import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  address: { type: String, required: true, unique: true },
  apiHost: { type: String, required: true },
  topupAddress: { type: String, required: true }
})

const User = model('User', userSchema)

export default User
