//* Routing Logic

const express = require('express');
const router = express.Router();
const gamesGenresCtrl = require('../../controllers/api/gamesGenres');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.get('/', ensureLoggedIn, gamesGenresCtrl.index);
router.post('/', ensureLoggedIn, gamesGenresCtrl.create);
router.delete('/:id', ensureLoggedIn, gamesGenresCtrl.destroy);

module.exports = router;