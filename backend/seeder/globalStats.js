import mongoose from 'mongoose'
import GlobalStats from '../components/models/stats/globalStats'
import dotEnv from 'dotenv'
dotEnv.config()

mongoose.connect(process.env.MONGO_URL, {}, (err) => {
    if (err) { throw err; }
    else console.log("Connected to database..")
})

let newGlobalStats = new GlobalStats
newGlobalStats.save()
  .then(() => exit())
  .catch(err => console.log(err))

let exit = () => {
  console.log('Seeder done.')
    mongoose.disconnect()
}