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
  * --- ### GROUPS ###
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

  /*
  * --- READ ONE GROUP
  */
  readGroup(req, res) {
    User.findOne({_id: res.locals.user._id}).populate({path: 'modulesList'}).exec()
    .then(user => {
      let group = user.modulesList.groups.id(req.params.id)
      res.status(200).json({success: true, content: group})
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err.message })
    })
  },

  /**
   * --- ADD ONE GROUP
   */
  addGroup(req, res) {
    if (req.body && req.body.name) {
      if (req.body.name == "No Group") return res.status(412).json({ success: false, message: "You can't add a group named 'No Group' because this is the default group."})
    
      User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
      .then(user => {
        // Limit total groups count to 30
        if (user.modulesList.groups.length > 29) return false

        req.body.name = truncate(req.body.name, {length: '50', 'separator': /,? +/})
        user.modulesList.groups.push(req.body)
        return user.modulesList.save()
      })
      .then(result => {
        if (result == false) return res.status(412).json({ success: false, message: 'You can only have up to 30 groups' })
        res.status(200).json({ success: true, message: 'Group added with success !', content: result })
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message })
      })
    }
  },

    /**
   * --- DELETE ONE GROUP
   */
  delGroup(req, res) {
    User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
    .then(user => {
        user.modulesList.groups.id(req.params.id).remove()
      return user.modulesList.save()
    })
    .then(result => {
      res.status(200).json({ success: true, message: 'Group deleted with success !', content: result })
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err.message })
    })
  },

 
  /**
   * --- ### MODULES ####
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

      // Limit total modules count to 30
      let modulesCount = 0
      for (let group of user.modulesList.groups) {
        modulesCount += group.modules.length
      }
      if (modulesCount > 29) return false

      // Continue
      if (req.body.groupId) {
        user.modulesList.groups.id(req.body.groupId).modules.push(req.body.module)
      } else {
        user.modulesList.groups.id(nogroup._id).modules.push(req.body.module)
      }
      return user.modulesList.save()
    })
    .then(result => {
      if (result == false) return res.status(412).json({ success: false, message: 'You can only have up to 30 modules' })
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
    User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
    .then(user => {
        user.modulesList.groups.id(req.query.groupId).modules.id(req.params.id).remove()
      return user.modulesList.save()
    })
    .then(result => {
      let groupResult = result.groups.id(req.query.groupId)
      res.status(200).json({ success: true, message: 'Module deleted with success !', content: {groups: result, group: groupResult}})
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err.message })
    })
  }
}