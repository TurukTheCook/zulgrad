/**
 * --- IMPORT STANDARDS
 */
import mongoose from 'mongoose'
import { uniq } from 'lodash'
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
  readAll(req, res) {
    User.findOne({_id: res.locals.user._id}).populate({path: 'modulesList', populate: {path: 'modules'}}).exec()
      .then(user => {
        // console.log(user.modulesList.modules)
        // if (!user.modulesList.modules) return res.status(404).json({ success: false, message: 'Problem with retrieving modules..' })
        
        let mods = []
        let data = {
          modules: user.modulesList.modules,
          groups: user.modulesList.groups
        }
        for (let group of data.groups) {
          let obj = {group: group, modules: []}
          for (let item of data.modules) {
            if (item.group == group) obj.modules.push(item)
          }
          mods.push(obj)
        }
        res.status(200).json({success: true, content: mods})
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message })
      })
  },

  /**
   * --- READ ONE
   */
  readOne(req, res) {
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
  add(req, res) {
    // let body = req.body
    // if (!body.name || !body.type || !body.args) return res.status(412).json({success: false, message: 'Data is missing, verify that you send the request correctly..'})
    // TODO
    User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
      .then(user => {
        user.modulesList.modules.push(req.body)
        if (req.body.group) {
          user.modulesList.groups.push(req.body.group)
        } else {
          let group = 'Uncategorized'
          user.modulesList.groups.push(group)
        }
        user.modulesList.groups = uniq(user.modulesList.groups)
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