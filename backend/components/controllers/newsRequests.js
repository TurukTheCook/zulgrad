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
    // REFACTORING
    let params = req.body.params
    let args = params.args
    let oneHourOld = moment().subtract(1, 'hours').format('x')
    let threeDaysOld = moment().subtract(3, 'days').format('x')

    NewsArticle.deleteMany({ 'publishedAt': { '$lte': threeDaysOld } }).exec()
      .then(() => {
        NewsRequest.find({ 'params.label': params.label, 'params.args': args }).populate('articles').exec()
          .then(results => {
            let getOut = (requestAge, optionalArticles) => {
              // console.log('optional: ', optionalArticles)
              if (requestAge == 'old') {
                let finalArticles = uniqBy(optionalArticles, 'title')
                return res.status(200).json({ success: true, message: 'List of old articles', content: finalArticles })
              }

              let finalGetOut = (finalArticles) => {
                let bulkOps = []
                for (let article of finalArticles) {
                  article.publishedAt = moment(article.publishedAt).format('x')
                  let upsertDoc = {
                    'updateOne': {
                      'filter': { 'title': article.title },
                      'update': article,
                      'upsert': true
                    }
                  };
                  bulkOps.push(upsertDoc);
                }
                NewsArticle.collection.bulkWrite(bulkOps)
                  .then(savedArticles => {
                    // console.log(savedArticles)

                    if (optionalArticles) {
                      finalArticles = concat(finalArticles, optionalArticles)
                    }
                    finalArticles = uniqBy(finalArticles, 'title')
                    finalArticles = sortBy(finalArticles, 'date').reverse()

                    let freshRequest = new NewsRequest(req.body)
                    freshRequest.date = moment().format('x')

                    for (let key of Object.keys(savedArticles.upsertedIds)) {
                      // console.log(key, savedArticles.upsertedIds[key])
                      freshRequest.articles[key] = savedArticles.upsertedIds[key]
                    }

                    freshRequest.save()
                      .then(() => {
                        res.status(200).json({ success: true, messages: 'List of old + new articles', content: finalArticles, length: finalArticles.length })
                      })
                  })
              } // end of finalGetOut

              if (params.label == 'headlines-source') {
                axios.get('https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=' + process.env.NEWSAPI_KEY + '&sources=' + args.source)
                  .then(res => {
                    let articles = res.data.articles
                    finalGetOut(articles)
                  })
              } else {
                axios.get('https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=' + process.env.NEWSAPI_KEY + '&country=' + args.country + '&category=' + args.category)
                  .then(res => {
                    let articles = res.data.articles
                    finalGetOut(articles)
                  })
              }
              
            } // end of getOut()

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