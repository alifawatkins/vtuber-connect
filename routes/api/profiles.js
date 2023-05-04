//* Routing Logic

const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/:id', ensureLoggedIn, profilesCtrl.show);
router.get('/getSelfProfile/:id', ensureLoggedIn, profilesCtrl.getSelfProfile);
router.get('/', ensureLoggedIn, profilesCtrl.index);
router.get('/favorites/:id', ensureLoggedIn, profilesCtrl.getFavorites);
router.post('/', ensureLoggedIn, profilesCtrl.create);
router.put('/:id', ensureLoggedIn, profilesCtrl.update);


module.exports = router;