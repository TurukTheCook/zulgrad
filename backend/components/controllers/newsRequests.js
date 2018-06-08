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
    // TODO: MORE REFACTORING..
    let label = req.body.label
    let args = req.body.args
    let oneHourOld = moment().subtract(30, 'minutes').format('x')
    let sevenDaysOld = moment().subtract(7, 'days').format('x')
    
    // TODO: add this to a CRON every 7 days
    // NewsArticle.deleteMany({ 'publishedAt': { '$lte': threeDaysOld } }).exec()


    NewsRequest.find({ 'params.label': label, 'params.args': args }).populate('articles').exec()
    .then(results => {
      let getOut = 'new'
      let sortedResults = sortBy(results, ['date']).reverse()
      let finalArticlesArray = []
      let newsResults = []

        if (results[0]) {
          for (let request of sortedResults) {
            for (let article of request.articles) {
              finalArticlesArray.push(article)
            }
          }
          if (sortedResults[0].date > oneHourOld) {
            getOut = 'old'
          }
        }

        /**
         * --- END OF ROUTE IF OLD REQUEST (<1h)
         */
        if (getOut == 'old') {
          console.log('----- old request')
          let oldArticles = uniqBy(finalArticlesArray, 'title')
          oldArticles = sortBy(oldArticles, ['publishedAt']).reverse()
          res.status(200).json({ success: true, message: 'List of old articles', content: oldArticles })
        } else {
          /**
           * --- OR CONTINUE TO NEW REQUEST
           */
  
          let newsArticles = []
          let getNews = async () => {
            if (label == 'source') {
              newsArticles = await axios.get('https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=' + process.env.NEWSAPI_KEY + '&sources=' + args.source)
            } else {
              newsArticles = await axios.get('https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=' + process.env.NEWSAPI_KEY + '&country=' + args.country + '&category=' + args.category)
            }
            return newsArticles
          }
  
          getNews()
          .then(newsArticles => {
            newsResults = newsArticles.data.articles
            let bulkOps = []
            for (let article of newsResults) {
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
            return NewsArticle.collection.bulkWrite(bulkOps)
          })
          .then(savedArticles => {
            // console.log(savedArticles)
    
            if (finalArticlesArray[0]) {
              newsResults = concat(newsResults, finalArticlesArray)
              console.log('----- new articles + old articles')
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
            return freshRequest.save()
          })
          .then(() => {
            console.log('------ new request')
            newsResults = uniqBy(newsResults, 'title')
            newsResults = sortBy(newsResults, ['publishedAt']).reverse()
            res.status(200).json({ success: true, messages: 'List of old + new articles', content: newsResults })
          })
          .catch(err => {
            res.status(500).json({ success: false, message: err.message })
          })
        }
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message })
      })

  },

  /**
   * --- ADD
   */
  // add(req, res) {
  //   let newReq = new NewsRequest(req.body)
  //   console.log('new request: ', req.body)
  //   newReq.save()
  //     .then(result => {
  //       res.status(200).json({ success: true, content: result })
  //     })
  //     .catch(err => {
  //       res.status(500).json({ success: false, message: err.message })
  //     })
  // },

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
      res.status(200).json({success: true, content: results})
    })
    .catch(err => res.status(500).json({ success: false, message: err.message }))
  }
}