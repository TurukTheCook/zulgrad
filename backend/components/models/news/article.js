import mongoose from 'mongoose'

let NewsArticleSchema = new mongoose.Schema({
    source: { id: { type: String }, name: { type: String } },
    author: { type: String },
    title: { type: String, unique: true },
    description: { type: String },
    url: { type: String },
    urlToImage: { type: String },
    publishedAt: { type: Number }
  },
  { timestamps: true }
)

export default mongoose.model('NewsArticle', NewsArticleSchema)