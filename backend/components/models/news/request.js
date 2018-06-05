import mongoose from 'mongoose'

let NewsRequestSchema = new mongoose.Schema({
    date: { type: Number },
    params: {
      label: { type: String },
      args: { 
        source: { type: String },
        country: { type: String },
        category: { type: String }
      }
    },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NewsArticle' }]
  },
  { timestamps: true }
);

export default mongoose.model('NewsRequest', NewsRequestSchema)