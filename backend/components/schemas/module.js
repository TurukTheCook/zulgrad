import mongoose from 'mongoose'

export default new mongoose.Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    args: { type: Object, required: true }
})