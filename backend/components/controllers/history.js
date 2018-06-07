/**
 * --- IMPORT STANDARDS
 */
import mongoose from 'mongoose'
import helper from './../helpers'
import { uniqBy } from 'lodash'

/**
 * --- IMPORT MODELS
 */
import User from '../models/user/user'
import HistoryList from '../models/user/historyList'

/**
 * --- EXPORT
 */
export default {
  /*
  * --- GET ALL
  */
  getAll(req, res) {
    User.findOne({_id: res.locals.user._id}).populate('historyList').exec()
    .then(user => {
      let history = user.historyList.articles.reverse()
      res.status(200).json({success: true, content: history})
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err.message })
    })
  },
  /**
  * --- ADD
  */
  addOne(req, res) {
    User.findOne({_id: res.locals.user._id}).populate('historyList').exec()
    .then(user => {
      delete req.body._id
      if (user.historyList.articles.length > 49) {
        user.historyList.articles.shift()
      }
      user.historyList.articles.push(req.body)
      user.historyList.articles = uniqBy(user.historyList.articles, 'title')
      return user.historyList.save()
    })
    .then(result => {
      res.status(200).json({ success: true, message: 'History added with success !' })
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err.message })
    })
  },
  /**
   * --- END OF HISTORY
   */
}