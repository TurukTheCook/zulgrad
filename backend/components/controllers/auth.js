/**
 * --- IMPORTS STANDARD
 */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import helper from './../helpers';

/**
 * --- IMPORTS MODELS
 */
import User from '../models/user/user'
import ModulesList from '../models/user/modulesList'
import HistoryList from '../models/user/historyList'
import FavsList from '../models/user/favsList'

/**
 * --- EXPORT
 */
export default {
  /*
  * --- LOGIN
  */
  login(req, res) {
    if (req.body.email && req.body.password) {
      User.findOne({email: helper.caseInsensitive(req.body.email)}, (err, user) => {
        if (err) res.status(500).json({success: false, message: err.message})
        else if (!user) res.status(404).json({success: false, message: 'User not found..'})
        else if (!user.comparePasswords(req.body.password)) res.status(401).json({success: false, message: 'Wrong password..'})
        else {
          jwt.sign({email: user.email, _id: user._id}, process.env.SECRET_KEY, (err, result) => {
            if (err) return res.status(500).json({success: false, message: err.message})
            res.status(200).json({success: true, message: 'Welcome!', content: process.env.AUTH_BEARER + ' ' + result })
          })
        }
      })
    } else res.status(412).json({success: false, message: 'Email and/or password are missing..'})
  },
  /*
  * --- REGISTER
  */
  signup(req, res) {
    if (req.body.email && req.body.password) {
      User.findOne({ email: helper.caseInsensitive(req.body.email) }, (err, result) => {
        if (!result) {
          let newUser = new User(req.body)
          let newModulesList = new ModulesList
          let newHistoryList = new HistoryList
          let newFavsList = new FavsList

          newModulesList.groups.push({name: "No Group"})

          newUser.password = bcrypt.hashSync(req.body.password, 12)
          newUser.modulesList = newModulesList._id
          newUser.historyList = newHistoryList._id
          newUser.favsList = newFavsList._id

          let savesArray = [newModulesList, newHistoryList, newFavsList, newUser]

          Promise.all(savesArray.map(obj => obj.save()))
          .then(results => {
            res.status(200).json({success: true, message: 'New user registered successfully!'})
          })
          .catch(err => {
            res.status(500).json({success: false, message: err.message})
          })
        } else res.status(412).json({success: false, message: 'Email already used..'})
      })
    } else res.status(412).json({success: false, message: 'Email and/or password are missing..'})
  }
}