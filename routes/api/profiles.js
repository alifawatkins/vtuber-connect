//* Routing Logic

const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/:profileId', ensureLoggedIn, profilesCtrl.show);
router.get('/getSelfProfile', ensureLoggedIn, profilesCtrl.getSelfProfile);
router.get('/', ensureLoggedIn, profilesCtrl.index);
router.get('/favorites', ensureLoggedIn, profilesCtrl.getFavorites);
router.post('/', ensureLoggedIn, profilesCtrl.create);
router.put('/update', ensureLoggedIn, profilesCtrl.update);


module.exports = router;