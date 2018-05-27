import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let StatsSchema = new mongoose.Schema(
  {
    lastConnected: { type: Date },
    totalConnected: { type: Number },
    monthConnected: [{
      dateConnected: { type: Date }
    }]
  },
  { timestamps: true }
);

export default mongoose.model('Stats', StatsSchema)