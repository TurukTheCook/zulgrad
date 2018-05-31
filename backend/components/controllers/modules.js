import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import helper from './../helpers';
import User from '../models/user'
import ModulesList from '../models/modulesList'
import Module from '../models/module'

export default {
  /*
  * READ
  */
  read(req, res) {
    User.findOne({_id: res.locals.user._id}).populate({path: 'modulesList', populate: {path: 'modules'}}).exec()
    .then(user => {
      console.log('user: ', JSON.stringify(user.modulesList.modules))
      if (!user.modulesList.modules) return res.status(404).json({success: false, message: 'Problem with retrieving modules..'})
      res.status(200).json({success: true, content: user.modulesList.modules})
    })
  },
  /**
   * ADD
   */
  add(req, res) {
    // let body = req.body
    // if (!body.name || !body.type || !body.args) return res.status(412).json({success: false, message: 'Data is missing, verify that you send the request correctly..'})
    // TODO
    let newModule = new Module(req.body)
    newModule.save().then(() => {
      User.findOne({_id: res.locals.user._id}).populate('modulesList').exec()
      .then(user => {
        user.modulesList.modules.push(newModule)
        user.modulesList.save().then(() => {
          res.status(200).json({success: true, content: newModule, content2: user.modulesList})
        })
      })
    })
  },
  /**
   * DELETE
   */
  delete(req, res) {
    // TODO
  }
}