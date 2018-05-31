import express from 'express'
import modulesController from './../controllers/modules'

let router = express.Router()

router.route('/modules')
  .get(modulesController.getMine)

export default router