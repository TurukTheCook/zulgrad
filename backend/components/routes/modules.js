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
//   .post(modules.addGroup)

// router.route('/groups/:id')
//   .get(modules.readGroup)
//   .delete(modules.delGroup)

export default router