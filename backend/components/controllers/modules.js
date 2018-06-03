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
        // FOR REFERENCE
        // let mods = []
        // let data = {
        //   modules: user.modulesList.modules,
        //   groups: user.modulesList.groups
        // }
        // for (let group of data.groups) {
        //   let obj = {group: group, modules: []}
        //   for (let item of data.modules) {
        //     if (item.group == group) obj.modules.push(item)
        //   }
        //   mods.push(obj)
        // }
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message })
      })
  },

  /**
   * --- READ ONE
   */
  readModule(req, res) {
    User.findOne({_id: res.locals.user._id}).populate({path: 'modulesList', populate: {path: 'modules'}}).exec()
      .then(user => {
        let doc = user.modulesList.modules.id(req.params.id)
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
        console.log('-------- USER: ', user)
        console.log('-------- GROUP BEFORE: ', user.modulesList.groups)
        let nogroup = find(user.modulesList.groups, (obj) => { return obj.name == 'No Group'})
        if (req.body.groupId) {
          user.modulesList.groups.id(req.body.groupId).push(req.body.module)
        } else {
          user.modulesList.groups.id(nogroup._id).modules.push(req.body.module)
        }
        console.log('-------- GROUP AFTER: ', user.modulesList.groups)
        user.modulesList.save()
          .then(result => {
            res.status(200).json({ success: true, message: 'Module added with success !' })
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