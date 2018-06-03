import mongoose from 'mongoose'

let SourcesListSchema = new mongoose.Schema({
    label: { type: String },
    name: { type: String },
    description: { type: String },
    url: { type: String },
    category: { type: String },
    language: { type: String },
    country: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('SourcesList', SourcesListSchema)