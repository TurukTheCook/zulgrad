import express from 'express'
import newsRequests from './../controllers/newsRequests'

let router = express.Router()

router.route('/requests')
  .post(newsRequests.find)

router.route('/sources')
  .get(newsRequests.sources)

router.route('/countries')
  .get(newsRequests.countries)

// router.route('/requests/:id')
//   .get(newsRequests.readOne)
//   .delete(newsRequests.del)

export default router