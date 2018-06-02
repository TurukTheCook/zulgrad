/**
 * --- IMPORT STANDARDS
 */
import mongoose from 'mongoose'
import moment from 'moment'
import axios from 'axios'
import { uniqBy, sortBy, concat } from 'lodash'
import helper from './../helpers'

/**
 * --- IMPORT MODELS
 */
import User from '../models/user/user'
import NewsRequest from '../models/news/request'
import NewsArticle from '../models/news/article'

/**
 * --- EXPORT
 */
export default {
  /*
  * --- FIND
  */
  find(req, res) {
    // TODO
    let params = req.body.params
    let args = params.args
    let oneHourOld = moment().subtract(1, 'hours').format('x')
    let threeDaysOld = moment().subtract(3, 'days').format('x')
    NewsArticle.deleteMany({ 'publishedAt': { '$lte': threeDaysOld } }).exec()
      .then(() => {
        NewsRequest.find({ 'params.label': params.label, 'params.args': args }).populate('articles').exec()
          .then(results => {
            let getOut = (requestAge, optionalArticles) => {
              console.log('optional: ', optionalArticles)
              if (requestAge == 'old') {
                let finalArticles = uniqBy(optionalArticles, 'title')
                console.log('final old: ', finalArticles)
                return res.status(200).json({ success: true, content: finalArticles })
              }

              let finalGetOut = (newArticles) => {
                let finalArticles = []
                if (!optionalArticles) {
                  finalArticles = concat(finalArticles, optionalArticles)
                }
                console.log('news: ', newArticles)
                finalArticles = concat(finalArticles, newArticles)
                finalArticles = uniqBy(finalArticles, 'title')
                finalArticles = sortBy(finalArticles, 'date').reverse()
                res.status(200).json({ success: true, content: finalArticles })
              }

              if (params.label == 'headlines-source') {
                axios.get('https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=' + process.env.NEWSAPI_KEY + '&sources=' + args.source)
                  .then(res => {
                    console.log('axios source: ', res.data)
                    let articles = res.data.articles
                    finalGetOut(articles)
                  })
              } else {
                axios.get('https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=' + process.env.NEWSAPI_KEY + '&country=' + args.country + '&category=' + args.category)
                  .then(res => {
                    console.log('axios country category: ', res.data)
                    let articles = res.data.articles
                    finalGetOut(articles)
                  })
              }
              
            }

            if (results[0]) {
              let sortedResults = sortBy(results, 'date').reverse()
              let finalArticlesArray = []
              for (let request of sortedResults) {
                for (let article of request.articles) {
                  finalArticlesArray.push(article)
                }
              }
              if (sortedResults[0].date > oneHourOld) {
                getOut('old', finalArticlesArray)
              } else getOut('new', finalArticlesArray)
            } else getOut('new')
            // --- FOR REFERENCE
            // let tm = moment(threeDaysOld).format('x')
            // let reqtm = moment(results[0].date).format('x')
            // console.log('---- param: ', results[0].params.args)
            // console.log('---- RESULTS: ', results)
            // console.log('---- 3 days old: ', tm)
            // console.log('---- req date: ', reqtm)
            // if (tm < reqtm) {
            //   console.log('ok')
            // }
          })
          .catch(err => {
            res.status(500).json({ success: false, message: err.message })
          })
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message })
      })

  },

  /**
   * --- ADD
   */
  add(req, res) {
    let newReq = new NewsRequest(req.body)
    console.log('new request: ', req.body)
    newReq.save()
      .then(result => {
        res.status(200).json({ success: true, content: result })
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message })
      })
  }
}