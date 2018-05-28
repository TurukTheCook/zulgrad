import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import helper from './../helpers';
import User from '../models/user'
import Modules from '../models/modules'
import Stats from '../models/stats'
import History from '../models/history'
import Favs from '../models/favs'
import GlobalStats from '../models/globalStats'

export default {
  /*
  *    LOGIN
  */
  login(req, res) {
    if (req.body.email && req.body.password) {
      User.findOne({email: helper.caseInsensitive(req.body.email)}, (err, user) => {
        if (err) res.status(500).json({success: false, message: err.message})
        else if (!user) res.status(404).json({success: false, message: 'User not found..'})
        else if (!user.comparePasswords(req.body.password)) res.status(401).json({success: false, message: 'Wrong password..'})
        else {
          jwt.sign({email: user.email, _id: user._id}, process.env.SECRET_KEY, (err, result) => {
            if (err) res.status(500).json({success: false, message: err.message})
            else res.status(200).json({success: true, message: 'Welcome!', content: { token: process.env.AUTH_BEARER + ' ' + result }})
          })
        }
      })
    } else res.status(412).json({success: false, message: 'Email and/or password are missing..'})
  },
  /*
  *   REGISTER
  */
  signup(req, res) {
    if (req.body.newUser.email && req.body.newUser.password) {
      User.findOne({ email: helper.caseInsensitive(req.body.newUser.email) }, (err, result) => {
        if (!result) {
          let newUser = new User(req.body.newUser)
          let newModules = new Modules
          let newStats = new Stats
          let newHistory = new History
          let newFavs = new Favs
          newUser.password = bcrypt.hashSync(req.body.newUser.password, 12)
          newUser.modules = newModules._id
          newUser.stats = newStats._id
          newUser.history = newHistory._id
          newUser.favs = newFavs._id

          GlobalStats.find({}, (err, global) => {
            if (err) return res.status(500).json({success: false, message: err.message})
            if (!global[0]) return res.status(404).json({success: false, message: 'Problem with retrieving global stats..'})

            global[0].userbaseTotal++

            Promise.all([newModules, newStats, newHistory, newFavs, newUser, global[0]].map(obj => obj.save()))
              .then(results => {
                res.status(200).json({success: true, message: 'New user registered successfully!'})
              })
              .catch(err => {
                res.status(500).json({success: false, message: err.message})
              })
          })

          // newUser.save()
          //   .then(user => {
          //     return res.status(200).json({success: true, message: 'New user registered successfully!'})
          //   })
          //   .catch(err => {
          //     return res.status(500).json({success: false, message: err.message})
          //   })
        } else res.status(412).json({success: false, message: 'Email already used..'})
      })
    } else res.status(412).json({success: false, message: 'Email and/or password are missing..'})
  }
}