import mongoose from 'mongoose'

let CountrySchema = new mongoose.Schema({
    code: { type: String },
    name: { type: String },
    counter: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export default mongoose.model('Country', CountrySchema)