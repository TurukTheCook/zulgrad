import mongoose from 'mongoose'

let ModulesListSchema = new mongoose.Schema(
  {
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module'}]
  },
  { timestamps: true }
);

export default mongoose.model('ModulesList', ModulesListSchema)