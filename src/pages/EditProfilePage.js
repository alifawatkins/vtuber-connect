import ProfileForm from "../components/ProfileForm";
import { useState } from "react";

function EditProfilePage({user, selfProfile, setSelfProfile}) {
    const [profile, setProfile] = useState(selfProfile);
    
    return (
        <>
            <h1>Edit Profile</h1>
            <ProfileForm action='edit' profile={profile} setProfile={setProfile} setSelfProfile={setSelfProfile} user={user} />
        </>
    )
}

export default EditProfilePage;