import mongoose from 'mongoose'

export default new mongoose.Schema({
    name: { type: String, required: true},
    type: { type: String, required: true },
    args: { type: Object, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
)