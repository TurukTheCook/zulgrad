import mongoose from 'mongoose'

let GlobalStatsSchema = new mongoose.Schema(
  {
    countries: { type: [{
      countryCode: { type: String },
      countryName: { type: String }
    }], default: undefined },
    continents: { type: [{
      continentCode: { type: String },
      cotinentName: { type: String }
    }], default: undefined },
    userbaseTotal: { type: Number, default: 0 },
    connectedPerDay: [{
      date: { type: Date },
      counter: { type: Number, default: 0 }
    }],
    connectedTotal: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('GlobalStats', GlobalStatsSchema)