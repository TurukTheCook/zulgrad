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
import GlobalStats from '../models/stats/globalStats'
import Continent from '../models/stats/continent'
import Country from '../models/stats/country'

import User from '../models/user/user'
import Stats from '../models/user/stats'
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
  * --- REGISTER
  */
  signup(req, res) {
    let bodyUser = req.body.newUser
    let bodyContinent = undefined
    let bodyCountry = undefined
    bodyContinent = req.body.continent
    bodyCountry = req.body.country

    if (bodyUser && bodyUser.email && bodyUser.password) {
      User.findOne({ email: helper.caseInsensitive(bodyUser.email) }, (err, result) => {
        if (!result) {
          let newUser = new User(bodyUser)
          let newStats = new Stats
          let newModulesList = new ModulesList
          let newHistoryList = new HistoryList
          let newFavsList = new FavsList

          newModulesList.groups.push({name: "No Group"})

          newUser.password = bcrypt.hashSync(bodyUser.password, 12)
          newUser.stats = newStats._id
          newUser.modulesList = newModulesList._id
          newUser.historyList = newHistoryList._id
          newUser.favsList = newFavsList._id

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

            let geoCheck = async () => {
              let results = {
                continent: await continentPromise(),
                country: await countryPromise()
              }
              return results
            }

            geoCheck().then(results => {
              let savesArray = [newModulesList, newStats, newHistoryList, newFavsList, newUser, global[0]]

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