//* Routing Logic

const express = require('express');
const router = express.Router();
const favoritesCtrl = require('../../controllers/api/favorites');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, favoritesCtrl.create);
router.delete('/:favoriteId', ensureLoggedIn, favoritesCtrl.destroy);

module.exports = router;