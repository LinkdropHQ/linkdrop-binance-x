import User from '../models/User'
import { wrapAsync } from '../utils'

/**
 * Function to get meta data for specific user
 */
const getUser = wrapAsync(async (req, res) => {
  const address = req.params.address

  const users = await User.find({
    address
  })

  if (users) {
    return res.json({
      success: true,
      users
    })
  } else return res.json({ success: false })
})

const getUserByApiHost = wrapAsync(async (req, res) => {
  const apiHost = req.params.apiHost

  const user = await User.findOne({
    apiHost
  })

  if (user && user.apiHost) {
    return res.json({
      success: true,
      user
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

export default { getUser, getUserByApiHost, create }
