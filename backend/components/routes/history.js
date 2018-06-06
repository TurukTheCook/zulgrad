import express from 'express'
import history from './../controllers/history'

let router = express.Router()

router.route('/history')
  .get(history.getAll)
  .post(history.addOne)

export default router