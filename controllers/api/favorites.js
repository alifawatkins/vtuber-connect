const Favorite = require('../../models/favorite');

async function create(req, res) {
    try {
        const favorite = await Favorite.create(req.body);
        console.log(favorite);

        const populatedFavorite = await Favorite.findById(favorite._id).populate({path: 'profile', populate: {path: 'user', select: 'name'}}).exec();

        res.status(200).json(populatedFavorite);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

async function destroy(req, res) {
    try {
        const favorite = await Favorite.findOneAndDelete({_id: req.params.favoriteId});
        console.log(favorite);

        res.status(200).json(favorite);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

module.exports = {
    create,
    destroy
}