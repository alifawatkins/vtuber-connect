const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Favorite', favoriteSchema);