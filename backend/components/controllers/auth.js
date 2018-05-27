import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import helper from './../../helpers';
import User from './../users/model'

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
            else res.status(200).json({success: true, message: 'Welcome!', content: {token: process.env.AUTH_BEARER + ' ' + result}})
          })
        }
      })
    } else res.status(412).json({success: false, message: 'Username and/or password are missing..'})
  },
  /*
  *   REGISTER
  */
  signup(req, res) {
    if (req.body.email && req.body.password) {
      User.findOne({email: helper.caseInsensitive(req.body.email)}, (err, result) => {
        if (!result) {
          let newUser = new User(req.body)
          newUser.hash_password = bcrypt.hashSync(req.body.password, 12)
          newUser.save((err, user) => {
            if (err) return res.status(500).json({success: false, message: err.message})
            res.status(200).json({success: true, message: 'New user registered successfully!'})
          })
        } else res.status(412).json({success: false, message: 'Username already used..'})
      })
    } else res.status(412).json({success: false, message: 'Email and/or password are missing..'})
  }
}