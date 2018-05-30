import mongoose from 'mongoose'

let ModulesSchema = new mongoose.Schema(
  {
    modules: { type: [
      {
        name: { type: String },
        type: { type: String },
        args: { type: Object }
      }
    ], default: undefined }
  },
  { timestamps: true }
);

export default mongoose.model('Modules', ModulesSchema)