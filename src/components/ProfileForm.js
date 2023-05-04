import { useState, useEffect } from "react";
import getGamesGenres from '../utilities/games-genres-api';
import * as profilesApi from '../utilities/profiles-api';
import './ProfileForm.css';
import { Link } from "react-router-dom";

function ProfileForm({profile, setProfile, setSelfProfile, action, user}) {
  const audienceEnums = ["Minor-Friendly", "Adults Only"];
  const gamesGenresEnums = [{id: 1, name: 'Action', category: 'GENRE'}, {id: 2, name: 'Adventure', category: 'GENRE'}, {id: 3, name: 'Warframe', category: 'GAME'}, {id: 4, name: 'Dead by Daylight', category: 'GAME'}];
  // const [gamesGenresEnums, setGamesGenresEnums] = useState([]);
  
  const [formData, setFormData] = useState({
    bio: "",
    website: "",
    audience: audienceEnums[0],
    gamesAndGenres: [],
    lookingFor: "",
    profilePicture: "",
    averageViewers: 0,
    contact: "",
    error: "",
    message: ""
  });

  const disableForm = (action !== "create" && action !== "edit");
  const disableSubmit = Object.keys(formData).filter(f => f !== "message" && f !== "error").some(field => formData[field] === null || formData[field] === '' || formData[field] === undefined);

  // useEffect(function () {
  //   async function getGamesGenresList() {
  //     const gamesGenres = await getGamesGenres();
  //     setGamesGenresEnums(gamesGenres);
  //   }
  //   getGamesGenresList();
  // }, []);

  useEffect(function () {
    function populateFormData() {
      if (profile) {
        setFormData({
          bio: profile.bio,
          website: profile.website,
          audience: profile.audience,
          gamesAndGenres: (profile.gamesAndGenres ? profile.gamesAndGenres : []),
          lookingFor: profile.lookingFor,
          profilePicture: profile.profilePicture,
          averageViewers: profile.averageViewers,
          contact: profile.contact,
          error: formData.error,
          message: formData.message
        });
      }
    }
    populateFormData();
  }, [profile]);
  

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    
    if (!disableForm) {
      try {
        console.log(formData)
        // data to be send to the backend to create a new user
        const profileData = {
          user: user,
          bio: formData.bio,
          website: formData.website,
          audience: formData.audience,
          gamesAndGenres: formData.gamesAndGenres,
          lookingFor: formData.lookingFor,
          profilePicture: formData.profilePicture,
          averageViewers: formData.averageViewers,
          contact: formData.contact
        }
        
        const returnedProfile = (action === "create" ? 
          await profilesApi.createProfile(profileData) : 
          (action === "edit" ? 
            await profilesApi.updateProfile(profile._id, profileData) : 
            null
          )
        );
        
        if (returnedProfile === null) {
          throw new Error("Invalid action. (How did you manage that?)");
        } else if (action === "create") {
          setFormData({...formData, message: "Profile created! Redirecting..."});
          setTimeout(() => {
            setSelfProfile(returnedProfile);
          }, 3000);
        } else if (action === "edit") {
          setProfile(returnedProfile);
          setSelfProfile(returnedProfile);
          setFormData({...formData, message: "Profile Updated!"});
        } else {
          throw new Error("Invalid Action. (How did you manage that?)");
        }

      } catch (error) {
        setFormData({...formData, error: error})
      }
    }
  };

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value, error: ''})
  };

  const toggleGameGenre = (gameGenre) => {
    if (!disableForm) {
      let currentSelections = formData.gamesAndGenres;
      if (currentSelections.some(gg => gg.id === gameGenre.id)) {
        currentSelections = currentSelections.filter((selection) => selection.id !== gameGenre.id);
      } else {
        currentSelections.push(gameGenre);
      }
      setFormData({...formData, gamesAndGenres: currentSelections, error: ''});
    }
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="flex-container">
          <div className="profile-form-left">
            <img alt="avatar" className="avatar" src={(formData.profilePicture !== "" ? formData.profilePicture : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010")} />
            <h1>{profile?.user?.name}</h1>
          </div>
          <div className="profile-form-right form-container">
            {!disableForm && <label>Profile Picture URL
              <span className="help-tooltip">
                <button type="button" className="tooltip-button">?</button>
                <span className="tooltiptext">Enter the URL where your desired photo is located. If you don't have a photo URL handy, a quick hack is to upload your desired photo to a Discord channel, right-click the image, and click "Copy Link"</span>
              </span>
            </label>}
            {!disableForm && <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} required/>}
            
            <label>Bio</label>
            <textarea name="bio" disabled={disableForm} value={formData.bio} onChange={handleChange} required/>
            
            <label>Website</label>
            <input type="text" name="website" disabled={disableForm} value={formData.website} onChange={handleChange} required/>
            
            <label>Audience</label>
            <select disabled={disableForm} name="audience" value={formData.audience} onChange={handleChange} required>
              {audienceEnums.map((audience, i) => {
                return (<option key={i} value={audience}>{audience}</option>)
              })}
              {/* <option key={1} value="option 1">Option 1</option>
              <option key={2} value="option 2">Option 2</option> */}
            </select>
            
            <label>Games and Genres</label>
            <div className="games-and-genres">
              {gamesGenresEnums.map((gameGenre, i) => {
                return (<button type="button" key={i}className={formData.gamesAndGenres.some(gg => gg.id === gameGenre.id) ? "selected" : ""} onClick={()=> toggleGameGenre(gameGenre)}>{gameGenre.name}</button>)
              })}
            </div>

            <label>Looking For...</label>
            <textarea name="lookingFor" disabled={disableForm} value={formData.lookingFor} onChange={handleChange} required/>

            <label>Average Viewers</label>
            <input type="number" step="0.01" name="averageViewers" disabled={disableForm} value={formData.averageViewers} onChange={handleChange} required />

            <label>Best Way to Contact Me</label>
            <input type="text" name="contact" disabled={disableForm} value={formData.contact} onChange={handleChange} required/>

            {!disableForm && <button type="submit" disabled={disableSubmit}>{action === "create" ? "Create New Profile" : "Update"}</button>}

            {action === "self" && <Link to="/editProfile"><button type="button">Edit Profile</button></Link>}
          </div>
        </div>
      </form>

      <p className="error-message">{formData.error}</p>
      <p className="alert-message">{formData.message}</p>
      <span>
        <button type="button" hidden={formData.message === ""} onClick={()=>setFormData({...formData, message: ""})}>Dismiss</button>
      </span>
    </div>
  );
}

export default ProfileForm;