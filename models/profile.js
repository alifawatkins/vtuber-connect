const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gamesGenreSchema = require('./gamesGenreSchema');

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  bio: {type: String, required: true},
  website: {type: String, required: true},
  audience: {type: String, enum: ["Minor-Friendly", "Adults Only"], required: true},
  gamesGenres: [gamesGenreSchema],
  lookingFor: {type: String, required: true},
  profilePicture: {type: String, required: true},
  averageViewers: {type: Number, required: true},
  contact: {type: String, required: true}
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);