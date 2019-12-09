import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import boom from '@hapi/boom'
import claimController from './api/controllers/claim'

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/linkdrop-binance'

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to database at', MONGODB_URI)

    app.listen(PORT, () => {
      console.log(`Server is up on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

app.get('/', async (req, res) => {
  res.status(200).json({ message: `Server is up and running on port ${PORT}` })
})

app.post('/api/v1/claim', claimController.claim)
app.get('/api/v1/is-claimed/:linkId', claimController.isClaimed)

app.use(async (req, res, next) => {
  next(boom.notFound('Endpoint not found'))
})

// Boom error handling middleware
app.use((err, req, res, next) => {
  if (err.isServer) {
    // Log the error
  }
  console.error(err.output.payload)
  res.status(err.output.statusCode).json(err.output.payload)
})

export default app
