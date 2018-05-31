import express from 'express'
let prefix = express.Router()
let router = express.Router()

/**
 * ROUTES IMPORT
 */
import modules from './modules'

/**
 * LINK TO ROUTER
 */
prefix.use(modules)

 /**
  * API PREFIX AND EXPORT
  */
router.use('/api', prefix)

export default router