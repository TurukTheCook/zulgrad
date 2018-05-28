import mongoose from 'mongoose'

let HistorySchema = new mongoose.Schema(
  {
    history: { type: [], default: undefined }
  },
  { timestamps: true }
);

export default mongoose.model('History', HistorySchema)