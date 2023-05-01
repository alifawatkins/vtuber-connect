const Favorite = require('../../models/favorite');

async function create(req, res) {
    try {
        const favorite = await Favorite.create(req.body);
        console.log(favorite);

        res.status(200).json(favorite);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

async function destroy(req, res) {
    try {
        const favorite = await Favorite.findByIdAndDelete(req.body._id);
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