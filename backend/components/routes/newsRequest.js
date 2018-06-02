import express from 'express'
import newsRequests from './../controllers/newsRequests'

let router = express.Router()

router.route('/requests')
  .post(newsRequests.find)

// router.route('/requests/:id')
//   .get(newsRequests.readOne)
//   .delete(newsRequests.del)

export default router