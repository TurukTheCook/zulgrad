import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import helper from './../helpers';
import User from '../models/user'
import Modules from '../models/modules'

export default {
  /*
  *    GET ALL
  */
  getMine(req, res) {
    Modules.findOne({ _id: res.locals.user.modules }).exec()
      .then(modules => {
        if (!modules) return res.status(404).json({success: false, message: 'Problem with retrieving modules..'})
        res.status(200).json({success: true, content: modules})
      })
      .catch(err => {
        res.status(500).json({success: false, message: err.message})
      })
  }
}