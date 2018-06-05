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
import SourcesList from '../models/news/sources'
import CountriesList from '../models/news/countries'

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
    let label = req.body.label
    let args = req.body.args
    let oneHourOld = moment().subtract(1, 'hours').format('x')
    let threeDaysOld = moment().subtract(3, 'days').format('x')

    NewsArticle.deleteMany({ 'publishedAt': { '$lte': threeDaysOld } }).exec()
      .then(() => {
        NewsRequest.find({ 'params.label': label, 'params.args': args }).populate('articles').exec()
          .then(results => {
            let getOut = (requestAge, optionalArticles) => {
              /**
               * --- END OF ROUTE IF OLD REQUEST (<1h)
               */
              if (requestAge == 'old') {
                console.log('----- old request')
                let oldArticles = uniqBy(optionalArticles, 'title')
                oldArticles = sortBy(oldArticles, ['publishedAt']).reverse()
                // for (let i = 0; i < finalArticles.length; i++) {
                //   finalArticles[i].publishedAt = moment(finalArticles[i].publishedAt, 'x').format("MMMM Do YYYY [at] HH:mm")
                // }
                return res.status(200).json({ success: true, message: 'List of old articles', content: oldArticles })
              }
              console.log('----- test')
              /**
               * --- OR CONTINUE TO NEW REQUEST
               */
              let finalGetOut = (finalArticles) => {
                let bulkOps = []
                for (let article of finalArticles) {
                  article.publishedAt = Number(moment(article.publishedAt).format('x'))
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
                      console.log('----- new request + optional articles')
                    }

                    let freshRequest = new NewsRequest({
                      'params.label': label,
                      'params.args': args,
                      'date': moment().format('x')
                    })
                    // freshRequest.date = moment().format('x')

                    for (let key of Object.keys(savedArticles.upsertedIds)) {
                      // console.log(key, savedArticles.upsertedIds[key])
                      freshRequest.articles[key] = savedArticles.upsertedIds[key]
                    }
                    
                    /**
                     * --- END OF ROUTE IF NEW REQUEST TO API
                     */
                    freshRequest.save()
                      .then(() => {
                        console.log('------ new request')
                        finalArticles = uniqBy(finalArticles, 'title')
                        finalArticles = sortBy(finalArticles, ['publishedAt']).reverse()
                        res.status(200).json({ success: true, messages: 'List of old + new articles', content: finalArticles })
                      })
                      .catch(err => {
                        res.status(500).json({ success: false, message: err.message })
                      })
                  })
                  .catch(err => {
                    res.status(500).json({ success: false, message: err.message })
                  })
              } // end of finalGetOut

              if (label == 'source') {
                axios.get('https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=' + process.env.NEWSAPI_KEY + '&sources=' + args.source)
                  .then(res => {
                    console.log('----- api source')
                    let articles = res.data.articles
                    finalGetOut(articles)
                  })
                  .catch(err => {
                    res.status(500).json({ success: false, message: err.message })
                  })
              } else {
                axios.get('https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=' + process.env.NEWSAPI_KEY + '&country=' + args.country + '&category=' + args.category)
                  .then(res => {
                    console.log('----- api countcat')
                    let articles = res.data.articles
                    finalGetOut(articles)
                  })
                  .catch(err => {
                    res.status(500).json({ success: false, message: err.message })
                  })
              }
              
            } // end of getOut()

            if (results[0]) {
              let sortedResults = sortBy(results, ['date']).reverse()
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
  },

  /**
   * --- SOURCES LIST
   */
  sources(req, res) {
    SourcesList.find({}).exec()
      .then(results => {
        res.status(200).json({success: true, content: results})
      })
      .catch(err => res.status(500).json({ success: false, message: err.message }))
  },

  /**
   * --- COUNTRIES LIST
   */
  countries(req, res) {
    CountriesList.find({}).exec()
      .then(results => {
        console.log(results)
        res.status(200).json({success: true, content: results})
      })
      .catch(err => res.status(500).json({ success: false, message: err.message }))
  }
}