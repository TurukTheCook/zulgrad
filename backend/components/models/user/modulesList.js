import mongoose from 'mongoose'
import GroupSchema from '../../schemas/group'

let ModulesListSchema = new mongoose.Schema(
  {
    groups: [GroupSchema]
  },
  { timestamps: true }
);

export default mongoose.model('ModulesList', ModulesListSchema)