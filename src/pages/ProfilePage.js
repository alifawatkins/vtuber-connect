import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import getProfile from '../utilities/profiles-api';

function ProfilePage({user, setUser, selfProfile}) {
    const [profile, setProfile] = useState(null);
    const {profileId} = useParams();
    
    useEffect(function () {
      async function getDisplayProfile() {
        const profile = (profileId ? await getProfile(profileId) : selfProfile);
        setProfile(profile);
      }
      getDisplayProfile();
    }, [profileId, selfProfile]);
    
    return <ProfileForm action={profile === selfProfile ? "self" : "view"} user={user} profile={profile} />
}

export default ProfilePage;