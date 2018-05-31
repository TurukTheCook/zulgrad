import mongoose from 'mongoose'
import ModuleSchema from '../../schemas/module'

let ModulesListSchema = new mongoose.Schema(
  {
    modules: [ModuleSchema]
  },
  { timestamps: true }
);

export default mongoose.model('ModulesList', ModulesListSchema)