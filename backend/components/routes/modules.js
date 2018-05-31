import express from 'express'
import modules from './../controllers/modules'

let router = express.Router()

router.route('/modules')
  .get(modules.read)
  .post(modules.add)

router.route('/modules/:id')
  .delete(modules.del)

export default router