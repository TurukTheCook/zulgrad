import mongoose from 'mongoose'

let GlobalStatsSchema = new mongoose.Schema(
  {
    geoLoc: {
      countries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
      continents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Continent' }],
    },
    userbaseTotal: { type: Number, default: 0 },
    connectedTotal: { type: Number, default: 0 },
    connectedPerDay: [{
      date: { type: Date },
      counter: { type: Number, default: 0 }
    }]
  },
  { timestamps: true }
);

export default mongoose.model('GlobalStats', GlobalStatsSchema)