const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Score', ScoreSchema);
