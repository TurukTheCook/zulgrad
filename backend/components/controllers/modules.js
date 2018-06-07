/**
 * --- IMPORT STANDARDS
 */
import mongoose from 'mongoose'
import { uniq, find, truncate } from 'lodash'
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
  * --- READ ALL GROUPS
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
   * --- ADD ONE GROUP
   */
  addGroup(req, res) {
    User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
    .then(user => {
      req.body.name = truncate(req.body.name, {length: '50', 'separator': /,? +/})
      user.modulesList.groups.push(req.body)
      return user.modulesList.save()
    })
    .then(result => {
      res.status(200).json({ success: true, message: 'Group added with success !', content: result })
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err.message })
    })
  },


  /**
   * --- READ ONE MODULE
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
   * --- ADD ONE MODULE
   */
  addModule(req, res) {
    User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
    .then(user => {
      req.body.module.name = truncate(req.body.module.name, {length: '50', 'separator': /,? +/})
      let nogroup = find(user.modulesList.groups, (obj) => { return obj.name == 'No Group'})

      if (req.body.groupId) {
        user.modulesList.groups.id(req.body.groupId).modules.push(req.body.module)
      } else {
        user.modulesList.groups.id(nogroup._id).modules.push(req.body.module)
      }
      return user.modulesList.save()
    })
    .then(result => {
      res.status(200).json({ success: true, message: 'Module added with success !', content: result })
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err.message })
    })
  },

  /**
   * --- DELETE ONE MODULE
   */
  delModule(req, res) {
    // TODO
  }
}