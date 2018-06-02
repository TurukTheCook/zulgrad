import express from 'express'
let prefix = express.Router()
let router = express.Router()

/**
 * ROUTES IMPORT
 */
import modules from './modules'
import newsRequest from './newsRequest'

/**
 * LINK TO ROUTER
 */
prefix.use(modules, newsRequest)

 /**
  * API PREFIX AND EXPORT
  */
router.use('/api', prefix)

export default router