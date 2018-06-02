import mongoose from 'mongoose'
import ModuleSchema from '../../schemas/module'

let ModulesListSchema = new mongoose.Schema(
  {
    modules: [ModuleSchema],
    groups: [String]
  },
  { timestamps: true }
);

export default mongoose.model('ModulesList', ModulesListSchema)