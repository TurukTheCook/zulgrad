/**
 * --- IMPORT STANDARDS
 */
import mongoose from 'mongoose'
import { uniq, find } from 'lodash'
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
  * --- READ ALL
  */
  readAllGroups(req, res) {
    User.findOne({_id: res.locals.user._id}).populate({path: 'modulesList'}).exec()
      .then(user => {
        res.status(200).json({success: true, content: user.modulesList.groups})
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message })
      })
  },

  /**
   * --- READ ONE
   */
  readModule(req, res) {
    User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
      .then(user => {
        let doc = null
        for (let group of user.modulesList.groups) {
          for (let mod of group.modules) {
            if (mod._id == req.params.id) doc = mod
          }
        }
        res.status(200).json({success: true, content: doc})
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message })
      })
  },

  /**
   * --- ADD
   */
  addModule(req, res) {
    // let body = req.body
    // if (!body.name || !body.type || !body.args) return res.status(412).json({success: false, message: 'Data is missing, verify that you send the request correctly..'})
    // TODO
    User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
      .then(user => {
        let nogroup = find(user.modulesList.groups, (obj) => { return obj.name == 'No Group'})
        if (req.body.groupId) {
          user.modulesList.groups.id(req.body.groupId).push(req.body.module)
        } else {
          user.modulesList.groups.id(nogroup._id).modules.push(req.body.module)
        }
        user.modulesList.save()
          .then(result => {
            res.status(200).json({ success: true, message: 'Module added with success !', content: result })
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
   * --- DELETE
   */
  delModule(req, res) {
    // TODO
  }
}