import ProfileForm from "../components/ProfileForm";

function EditProfilePage({user, setUser, selfProfile, setSelfProfile}) {
    return (
        <>
            <h1>Create New Profile</h1>
            <ProfileForm action='edit' selfProfile={selfProfile} setSelfProfile={setSelfProfile} user={user} />
        </>
    )
}

export default EditProfilePage;