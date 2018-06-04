import mongoose from 'mongoose'
import ModuleSchema from './module'

export default new mongoose.Schema({
    name: { type: String, required: true },
    modules: [ModuleSchema]
})