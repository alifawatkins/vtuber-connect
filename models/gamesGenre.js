const mongoose = require('mongoose');

const gamesGenreSchema = require('./gamesGenreSchema');

module.exports = mongoose.model('GamesGenre', gamesGenreSchema);