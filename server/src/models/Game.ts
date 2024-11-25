const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  league: String,
  homeTeam: String,
  awayTeam: String,
  homeScore: Number,
  awayScore: Number,
  winnner: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  event_time: Date,
});

module.exports = mongoose.model("Game", GameSchema);
