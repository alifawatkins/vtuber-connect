//* Request handler Logic
const Profile = require('../../models/profile');
const Favorite = require('../../models/favorite');

async function create(req, res) {
    try {
        //* creating a new profile
        const profile = await Profile.create(req.body);
        console.log(profile);

        res.status(200).json(profile);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

async function update(req, res) {
    try{
      const profile = await Profile.findOneAndUpdate({_id: req.params.id}, req.body);
      res.status(200).json(profile);
    }catch(e){
      res.status(400).json({ msg: e.message });
    }  
}

async function index(req, res) {
    try{
      const profiles = await Profile.find({}).sort('-updatedAt').populate('user', 'name').exec();
      res.status(200).json(profiles);
    }catch(e){
      res.status(400).json({ msg: e.message });
    }
}

async function getSelfProfile(req, res) {
    try {
      // find profile in db
      const profile = await Profile.findOne({ user: req.user._id });
      // check if we found a profile
      if (!profile) throw new Error();
      res.json(profile);
    } catch {
      res.status(400).json('Invalid Profile ID');
    }
}

async function getFavorites(req, res) {
    try {
        const favorites = await Favorite.find({user: req.user._id}).sort('-createdAt').populate({
            path: 'profile',
            populate: {
                path: 'user',
                select: 'name'
            }
        }).exec();
        if (!favorites) throw new Error();
        res.json(favorites);
    } catch {
        res.status(400).json('No Favorites Found!');
    }
}

async function show(req, res) {
    try{
      const profile = await Profile.findById(req.params.id).populate('user', 'name').exec();
      res.status(200).json(profile);
    }catch(e){
      res.status(400).json({ msg: e.message });
    }  
}


module.exports = {
    create,
    getSelfProfile,
    show,
    index,
    update,
    getFavorites
}