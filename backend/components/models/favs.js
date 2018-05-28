import mongoose from 'mongoose'

let FavsSchema = new mongoose.Schema(
  {
    favs: { type: [], default: undefined }
  },
  { timestamps: true }
);

export default mongoose.model('Favs', FavsSchema)