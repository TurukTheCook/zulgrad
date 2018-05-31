import mongoose from 'mongoose'

let FavsSchema = new mongoose.Schema(
  {
    favs: []
  },
  { timestamps: true }
);

export default mongoose.model('Favs', FavsSchema)