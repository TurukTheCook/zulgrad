import express from 'express'
import modules from './../controllers/modules'

let router = express.Router()

router.route('/modules')
  .post(modules.addModule)

router.route('/modules/:id')
  .get(modules.readModule)
  .delete(modules.delModule)

router.route('/groups')
  .get(modules.readAllGroups)

export default router