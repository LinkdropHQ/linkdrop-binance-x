import User from '../models/User'
import { wrapAsync } from '../utils'

/**
 * Function to get meta data for specific user
 */
const getUserData = wrapAsync(async (req, res) => {
  const address = req.params.address

  const user = await User.findOne({
    address
  })

  if (user && user.apiHost && user.topupAddress) {
    return res.json({
      success: true,
      address,
      apiHost: user.apiHost,
      topupAddress: user.topupAddress
    })
  } else return res.json({ success: false })
})

const create = wrapAsync(async (req, res) => {
  try {
    const { address, apiHost, topupAddress } = req.body

    const user = new User({ address, apiHost, topupAddress })

    await user.save()

    res.json({
      success: true,
      address: user.address,
      apiHost: user.apiHost,
      topupAddress: user.topupAddress
    })
  } catch (err) {
    console.error(err)
    return res.json({
      success: false,
      error: err.message || err
    })
  }
})

export default { getUserData, create }
