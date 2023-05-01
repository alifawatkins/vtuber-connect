const GamesGenre = require('../../models/gamesGenre');

async function create(req, res) {
    try {
        const gamesGenre = await GamesGenre.create(req.body);
        console.log(gamesGenre);

        res.status(200).json(gamesGenre);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

async function destroy(req, res) {
    try {
        const gamesGenre = await GamesGenre.findByIdAndDelete(req.body._id);
        console.log(gamesGenre);

        res.status(200).json(gamesGenre);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

async function index(req, res) {
    try{
      const gamesGenres = await GamesGenre.find({}).sort('name').exec();
      res.status(200).json(gamesGenres);
    }catch(e){
      res.status(400).json({ msg: e.message });
    }
}


module.exports = {
    create,
    index,
    destroy
}