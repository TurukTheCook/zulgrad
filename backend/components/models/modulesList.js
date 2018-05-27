import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let ModulesSchema = new mongoose.Schema(
  {
    modules: [{}]
  },
  { timestamps: true }
);

export default mongoose.model('Modules', ModulesSchema)