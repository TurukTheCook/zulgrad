import mongoose from 'mongoose'

let NewsRequestSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    params: {
      label: { type: String, required: true },
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