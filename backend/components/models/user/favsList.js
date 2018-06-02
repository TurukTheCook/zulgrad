import mongoose from 'mongoose'
import TempArticleSchema from '../../schemas/tempArticle'

let FavsListSchema = new mongoose.Schema(
  {
    articles: [TempArticleSchema]
  },
  { timestamps: true }
);

export default mongoose.model('FavsList', FavsListSchema)