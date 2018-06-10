import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    modulesList: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ModulesList' },
    historyList: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'HistoryList' },
    favsList: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'FavsList' },
    // stats: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Stats' }
  },
  { timestamps: true }
);

UserSchema.methods.comparePasswords = function(attempt) {
  return bcrypt.compareSync(attempt, this.password)
}

export default mongoose.model('User', UserSchema)