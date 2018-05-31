import mongoose from 'mongoose'
import FavSchema from '../../schemas/fav'

let FavsListSchema = new mongoose.Schema(
  {
    favs: [FavSchema]
  },
  { timestamps: true }
);

export default mongoose.model('FavsList', FavsListSchema)