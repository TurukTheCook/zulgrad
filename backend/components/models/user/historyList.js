import mongoose from 'mongoose'
import TempArticleSchema from '../../schemas/tempArticle'

let HistoryListSchema = new mongoose.Schema(
  {
    articles: [TempArticleSchema]
  },
  { timestamps: true }
);

export default mongoose.model('HistoryList', HistoryListSchema)