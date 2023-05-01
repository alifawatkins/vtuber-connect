const Schema = require('mongoose').Schema;
require("./gamesGenre");

const gamesGenreSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, enum: ['GAME', 'GENRE']}
  }, {
    timestamps: true
});

module.exports = gamesGenreSchema;