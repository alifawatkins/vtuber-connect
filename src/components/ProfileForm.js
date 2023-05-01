import { useState } from "react";
import * as profilesApi from '../utilities/profiles-api';
import getGamesGenres from '../utilities/games-genres-api';
import './ProfileForm.css';

function ProfileForm({setSelfProfile, action, user}) {
  // const audienceEnums = await profilesApi.getAudiences();
  const audienceEnums = ["Minor-Friendly", "Adults Only"];
  // const gamesGenresEnums = await getGamesGenres();
  const gamesGenresEnums = ["Horror", "Visual Novels", "Henry Stickmin", "Harvest Moon"];
  
  const [formData, setFormData] = useState({
    bio: "",
    website: "",
    audience: audienceEnums[0],
    gamesAndGenres: [],
    lookingFor: "",
    profilePicture: "",
    averageViewers: "",
    contact: "",
    error: "",
  });

  const disable = Object.keys(formData).some(field => field !== "error" && (formData[field] === null || formData[field] === '' || formData[field] === undefined));

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
      
      // const profile = (action === "create" ? await profilesApi.createProfile(profileData) : await profilesApi.updateProfile(profileData));
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
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="flex-container">
          <div className="profile-form-left">
            <img alt="avatar" className="avatar-thumbnail" src={(formData.profilePicture !== "" ? formData.profilePicture : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010")} />
            <h1>{user.name}</h1>
          </div>
          <div className="profile-form-right form-container">
            <label>Profile Picture URL
              <span className="help-tooltip">
                <button type="button" className="tooltip-button">?</button>
                <span className="tooltiptext">Enter the URL where your desired photo is located. If you don't have a photo URL handy, a quick hack is to upload your desired photo to a Discord channel, right-click the image, and click "Copy Link"</span>
              </span>
            </label>
            <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} required/>
            
            <label>Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} required/>
            
            <label>Website</label>
            <input type="text" name="website" value={formData.website} onChange={handleChange} required/>
            
            <label>Audience</label>
            <select name="audience" value={formData.audience} onChange={handleChange} required>
              {audienceEnums.map((audience, i) => {
                return (<option key={i} value={audience}>{audience}</option>)
              })}
              {/* <option key={1} value="option 1">Option 1</option>
              <option key={2} value="option 2">Option 2</option> */}
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
          </div>
        </div>
      </form>

      <p className="error-message">{formData.error}</p>
    </div>
  );
}

export default ProfileForm;