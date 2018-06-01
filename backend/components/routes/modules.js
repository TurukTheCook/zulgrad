import express from 'express'
import modules from './../controllers/modules'

let router = express.Router()

router.route('/modules')
  .get(modules.readAll)
  .post(modules.add)

router.route('/modules/:id')
  .get(modules.readOne)
  .delete(modules.del)

export default router