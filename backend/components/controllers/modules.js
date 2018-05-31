/**
 * --- IMPORT STANDARDS
 */
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import helper from './../helpers'

/**
 * --- IMPORT MODELS
 */
import User from '../models/user/user'
import ModulesList from '../models/user/modulesList'

/**
 * --- EXPORT
 */
export default {
  /*
  * --- READ
  */
  read(req, res) {
    User.findOne({_id: res.locals.user._id}).populate({path: 'modulesList', populate: {path: 'modules'}}).exec()
    .then(user => {
      if (!user.modulesList.modules) return res.status(404).json({ success: false, message: 'Problem with retrieving modules..' })
      res.status(200).json({success: true, content: user.modulesList.modules})
    })
  },
  /**
   * --- ADD
   */
  add(req, res) {
    // let body = req.body
    // if (!body.name || !body.type || !body.args) return res.status(412).json({success: false, message: 'Data is missing, verify that you send the request correctly..'})
    // TODO
    User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
      .then(user => {
        user.modulesList.modules.push(req.body)
        user.modulesList.save()
        .then(result => {
          res.status(200).json({ success: true, message: 'Module added with success !' })
        })
        .catch(err => {
          res.status(500).json({ success: false, message: err.message })
        })
      })
  },
  /**
   * --- DELETE
   */
  del(req, res) {
    // TODO
  }
}