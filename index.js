const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const { initSocket } = require('./socket/index')

const app = express()
require('dotenv').config()

const corsOptions = {
  origin: '*',
  // origin: ['http://connect-client-eight.vercel.app', 'http://connect-client-git-master-crevils.vercel.app', 'http://connect-client-qktgr0x0p-crevils.vercel.app', 'https://connect-client-eight.vercel.app/login'],
  credentials: true
};

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SIGNATURE))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hi there!')
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection Success"))
  .catch((err) => console.log('DB connection Error', err.message))

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening to port ${process.env.PORT}`)
})

// socket.io
initSocket(server, corsOptions)

module.exports = app;