import mongoose from 'mongoose'

export default new mongoose.Schema({
  source: { id: { type: String }, name: { type: String } },
  author: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  urlToImage: { type: String },
  publishedAt: { type: Number }
})