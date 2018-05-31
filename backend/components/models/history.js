import mongoose from 'mongoose'

let HistorySchema = new mongoose.Schema(
  {
    history: []
  },
  { timestamps: true }
);

export default mongoose.model('History', HistorySchema)