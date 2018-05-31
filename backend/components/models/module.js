import mongoose from 'mongoose'

let ModuleSchema = new mongoose.Schema({
    name: { type: String, required: true},
    type: { type: String, required: true },
    args: { type: Object, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Module', ModuleSchema)