import mongoose from 'mongoose'

let ModulesSchema = new mongoose.Schema(
  {
    modules: [{
      name: { type: String },
      type: { type: String },
      args: { type: Object }
    }]
  },
  { timestamps: true }
);

export default mongoose.model('Modules', ModulesSchema)