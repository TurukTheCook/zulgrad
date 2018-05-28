import mongoose from 'mongoose'

let ModulesSchema = new mongoose.Schema(
  {
    modules: { type: [], default: undefined }
  },
  { timestamps: true }
);

export default mongoose.model('Modules', ModulesSchema)