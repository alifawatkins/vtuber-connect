import { useState } from "react";
// import * as profilesService from '../utilities/profiles-service';

function ProfileForm({setProfile, action}) {
  const [formData, setFormData] = useState({
    bio: "",
    website: "",
    audience: "",
    gamesAndGenres: [],
    lookingFor: "",
    profilePicture: "looking good",
    averageViewers: "",
    contact: "",
    error: "",
  });

  const disable = Object.keys(formData).some(field => field !== "error" && (formData[field] === null || formData[field] === '' || formData[field] === undefined));

  // const audienceEnums = await profilesService.getAudiences();
  // const gamesGenresEnums = await profilesService.getGamesAndGenres();
  const gamesGenresEnums = ["Horror", "Visual Novels", "Henry Stickmin", "Harvest Moon"];

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    
    try {
      console.log(formData)
      // data to be send to the backend to create a new user
      const profileData = {
        bio: formData.bio,
        website: formData.website,
        audience: formData.audience,
        gamesAndGenres: formData.gamesAndGenres,
        lookingFor: formData.lookingFor,
        profilePicture: formData.profilePicture,
        averageViewers: formData.averageViewers,
        contact: formData.contact
      }
      // returns a token with the user info
      
      // const profile = (action === "create" ? await createProfile(profileData) : await updateProfile(profileData)); // profile service
      // setSelfProfile(profile);

    } catch (error) {
      setFormData({...formData, error: "Profile Creation Failed - Try Again"})
    }
};

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value, error: ''})
  };

  const toggleGameGenre = (gameGenre) => {
    let currentSelections = formData.gamesAndGenres;
    if (currentSelections.includes(gameGenre)) {
      currentSelections = currentSelections.filter((selection) => selection !== gameGenre);
    } else {
      currentSelections.push(gameGenre);
    }
    setFormData({...formData, gamesAndGenres: currentSelections, error: ''});
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} required/>
            
            <label>Website</label>
            <input type="text" name="website" value={formData.website} onChange={handleChange} required/>
            
            <label>Audience</label>
            <select name="audience" value={formData.audience} onChange={handleChange} required>
              {/* {audienceEnums.map((audience, i) => {
                return (<option key={i} value={audience}>{audience}</option>)
              })} */}
              <option key={1} value="option 1">Option 1</option>
              <option key={2} value="option 2">Option 2</option>
            </select>
            
            <label>Games and Genres</label>
            <div className="games-and-genres">
              {gamesGenresEnums.map((gameGenre, i) => {
                return (<button type="button" key={i}className={formData.gamesAndGenres.includes(gameGenre) ? "selected" : ""} onClick={()=> toggleGameGenre(gameGenre)}>{gameGenre}</button>)
              })}
            </div>

            <label>Looking For...</label>
            <textarea name="lookingFor" value={formData.lookingFor} onChange={handleChange} required/>

            <label>Average Viewers</label>
            <input type="number" step="0.01" name="averageViewers" value={formData.averageViewers} onChange={handleChange} required />

            <label>Best Way to Contact Me</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required/>

            <button type="submit" disabled={disable}>{action === "create" ? "Create New Profile" : "Update"}</button>
        </form>
      </div>

      <p className="error-message">{formData.error}</p>
    </div>
  );
}

export default ProfileForm;