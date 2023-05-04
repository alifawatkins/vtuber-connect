import { useState, useEffect } from "react";
import * as profilesApi from '../utilities/profiles-api'
import * as favoritesApi from '../utilities/favorites-api'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.css';

function HomePage({user, setUser, favs}) {
    const [profiles, setProfiles] = useState([]);
    const [favorites, setFavorites] = useState([]);
    
    useEffect(function () {
        async function getFavoritesAndProfiles() {
            const favorites = await profilesApi.getFavorites(user._id);
            setFavorites(favorites);
            const profiles = (favs ? favorites.map(f => f.profile) : await profilesApi.getAll());
            setProfiles(profiles);
        }
        getFavoritesAndProfiles();
        },[user, favs]
    );

    async function toggleFavorite(profile) {
        const clickedFavorite = favorites?.filter(favorite => favorite?.profile?._id === profile?._id)[0];
        const favorite = clickedFavorite ?
            await favoritesApi.removeFavorite(clickedFavorite._id) :
            await favoritesApi.addFavorite({user: user, profile: profile});
        setFavorites(clickedFavorite ?
            favorites.filter(f => f.profile._id !== profile._id) :
            [...favorites, favorite]);
        if (favs) {
            setProfiles(favorites.filter(f => f.profile._id !== profile._id).map(f => f.profile));
        }
        return favorite;
    }

    return (
        <>
            <aside><button type="button">Filters</button></aside>
            <main>
                { favs ? 
                    <>
                        <h1>My Favorites List</h1>
                    </>
                :
                    <>
                        <h1>VTuber Profiles</h1>
                    </>
                }
                {profiles.map(profile => {
                    const isFavorite = favorites?.some(favorite => favorite?.profile?._id === profile?._id);
                    return(
                        <div className={"profile-card"}>
                            <Link to={`profiles/${profile?._id}`}><img alt="avatar" className="feed-avatar-thumbnail" src={profile?.profilePicture} /></Link><FontAwesomeIcon icon={isFavorite ? ['fas', 'heart'] : ["far", "heart"]} size="3x" style={isFavorite ? {color: "#ff5252",} : {}} onClick={() => toggleFavorite(profile)} />
                            <span>
                                <h2>{profile?.user?.name}</h2>
                                <p>{profile?.bio}</p>
                                {profile?.gameAndGenres?.map(gameGenre => {
                                    return <button type="button">{gameGenre.name}</button>
                                })}
                            </span>
                        </div>
                    )
                })}
            </main>
        </>
    )
}

export default HomePage;