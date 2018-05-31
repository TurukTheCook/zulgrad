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
import Continent from '../models/continent'
import Country from '../models/country'

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
            else {
              GlobalStats.find({}, (err, global) => {
                if (err) return res.status(500).json({success: false, message: err.message})
                if (!global[0]) return res.status(404).json({success: false, message: 'Problem with retrieving global stats..'})
    
                global[0].connectedTotal++
                global[0].save()
                  .then(() => {
                    res.status(200).json({success: true, message: 'Welcome!', content: process.env.AUTH_BEARER + ' ' + result })
                  })
                  .catch(err => {
                    res.status(500).json({success: false, message: err.message})
                  })
              })
            }
          })
        }
      })
    } else res.status(412).json({success: false, message: 'Email and/or password are missing..'})
  },
  /*
  *   REGISTER
  */
  signup(req, res) {
    let bodyUser = req.body.newUser
    let bodyContinent = undefined
    let bodyCountry = undefined
    bodyContinent = {code: 'NA', name: 'MURICA'}
    bodyCountry = {code: 'CA', name: 'NOTMURICA'}

    if (bodyUser && bodyUser.email && bodyUser.password) {
      User.findOne({ email: helper.caseInsensitive(bodyUser.email) }, (err, result) => {
        if (!result) {
          let newUser = new User(bodyUser)
          let newModules = new Modules
          let newStats = new Stats
          let newHistory = new History
          let newFavs = new Favs
          newUser.password = bcrypt.hashSync(bodyUser.password, 12)
          newUser.modules = newModules._id
          newUser.stats = newStats._id
          newUser.history = newHistory._id
          newUser.favs = newFavs._id

          GlobalStats.find({}, (err, global) => {
            if (err) return res.status(500).json({success: false, message: err.message})
            if (!global[0]) return res.status(404).json({success: false, message: 'Problem with retrieving global stats..'})

            global[0].userbaseTotal++
            
            let continentPromise = () => {
              return new Promise (resolve => {
                if (!bodyContinent) resolve('nobody');
                else {
                  Continent.findOne({code: bodyContinent.code}, (err, result) => {
                    resolve(result);
                  })
                }
              })
            }
            let countryPromise = () => {
              return new Promise (resolve => {
                if (!bodyCountry) resolve('nobody')
                else {
                  Country.findOne({code: bodyCountry.code}, (err, result) => {
                    resolve(result)
                  })
                }
              })
            }

            let ccCheck = async () => {
              let results = {
                continent: await continentPromise(),
                country: await countryPromise()
              }
              return results
            }

            ccCheck().then(results => {
              let savesArray = [newModules, newStats, newHistory, newFavs, newUser, global[0]]

              if (results.continent != 'nobody') {
                if (results.continent) results.continent.counter++
                else {
                  results.continent = new Continent(bodyContinent)
                  global[0].geoLoc.continents.push(results.continent._id)
                }
                savesArray.push(results.continent)
              }
              if (results.country != 'nobody') {
                if (results.country) results.country.counter++
                else {
                  results.country = new Country(bodyCountry)
                  global[0].geoLoc.countries.push(results.country._id)
                }
                savesArray.push(results.country)
              }

              Promise.all(savesArray.map(obj => obj.save()))
                .then(results => {
                  res.status(200).json({success: true, message: 'New user registered successfully!'})
                })
                .catch(err => {
                  res.status(500).json({success: false, message: err.message})
                })
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