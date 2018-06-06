import express from 'express'
let prefix = express.Router()
let router = express.Router()

/**
 * ROUTES IMPORT
 */
import modules from './modules'
import newsRequest from './newsRequest'
import history from './history'

/**
 * LINK TO ROUTER
 */
prefix.use(
  modules,
  newsRequest,
  history
)

 /**
  * API PREFIX AND EXPORT
  */
router.use('/api', prefix)

export default router