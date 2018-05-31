import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import User from './../models/user/user'

let verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === process.env.AUTH_BEARER) {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, (err, decode) => {
      if (err) return res.status(500).json({ success: false, message: err.message })
      res.locals.decode = decode
      if (mongoose.Types.ObjectId.isValid(decode._id)) {
        User.findOne({ _id: decode._id }).exec()
          .then(user => {
            if (!user) return res.status(404).json({ success: false, message: 'User not recognized..' })
            res.locals.user = user
            next()
          })
          .catch(err => {
            res.status(500).json({ success: false, message: err.message })
          })
      } else res.status(400).json({ success: false, message: 'Invalid ID..' })
    })
  } else res.status(401).json({ success: false, message: 'Not Authorized..' })
}

export default verifyToken