import mongoose from 'mongoose'
import HistorySchema from '../../schemas/history'

let HistoryListSchema = new mongoose.Schema(
  {
    history: [HistorySchema]
  },
  { timestamps: true }
);

export default mongoose.model('HistoryList', HistoryListSchema)