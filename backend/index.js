/**
 * BASIC IMPORTS
 */
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import dotEnv from 'dotenv'

/**
 * Init .env
 */
dotEnv.config()

/**
 * Routes Imports
 */
import freeRoutes from './components/routes/_freeRoutes'
import routes from './components/routes'

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
app.use(morgan('dev'))

app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
  res.header('Access-Control-Max-Age', '86400')
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

/**
 * ROUTER PREFIX, AUTH VERIFICATION, 404 REDIRECT
 */
let router = express.Router()

router.use('/auth', auth)
router.use(verifyToken)

app.use('/api', router)

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
    let port = process.env.PORT || 1407;
    console.log('Connection to the Database etablished...')
    app.listen(port, () => console.log('App listening on port: ' + port))
  }
})