import mongoose from 'mongoose'

let CountriesListSchema = new mongoose.Schema({
    code: { type: String },
    name: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('CountriesList', CountriesListSchema)