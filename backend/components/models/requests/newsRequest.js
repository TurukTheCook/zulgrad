import mongoose from 'mongoose'
import ArticleSchema from '../../schemas/article'

let NewsRequestSchema = new mongoose.Schema({
    date: { type: Date },
    params: {
      type: { type: String },
      args: { type: Object }
    },
    articles: [ArticleSchema]
  },
  { timestamps: true }
);

export default mongoose.model('NewsRequest', NewsRequestSchema)