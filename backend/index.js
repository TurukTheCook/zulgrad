/**
 * BASIC IMPORTS
 */
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
// import morgan from 'morgan'
import dotEnv from 'dotenv'

/**
 * Init .env
 */
dotEnv.config()

/**
 * Routes Imports
 */
import auth from './components/routes/auth'
import api from './components/routes/api'

/**
 * Middleware Imports
 */
import verifyToken from './components/middlewares/verifyToken'

/**
 * APP INIT
 */
let app = express();

/**
 * EXTERNAL MIDDLEWARES
 */
// app.use(morgan('dev'))

app.use( (req, res, next) => {
  let allowedOrigins = ['https://zulgrad.com', 'https://www.zulgrad.com'];
  let origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Authorization, Content-Type, Accept')
  res.header('Access-Control-Max-Age', '86400')
  if ('OPTIONS' == req.method) res.sendStatus(200)
  else next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

/**
 * API PREFIX, AUTH VERIFICATION, 404 REDIRECT
 */
app.use('/', (req, res, next) => {
  res.status(200).send('Zulgrad API')
})
app.use('/api', auth)
app.use(verifyToken)
app.use(api)
app.use('/*', (req, res) => {
  res.status(404).json({ success: false, message: 'This route does not exists.'})
})

/**
 * MONGOOSE MONGODB CONNECT
 */
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL, {}, (err) => {
  if (err) { throw err; }
  else {
    let port = process.env.PORT || 5000;
    console.log('Connection to the Database etablished...')
    app.listen(port, () => console.log('App listening on port: ' + port))
  }
})