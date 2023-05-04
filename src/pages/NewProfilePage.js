import ProfileForm from "../components/ProfileForm";

function NewProfilePage({user, setSelfProfile}) {
    return (
        <>
            <h1>Create New Profile</h1>
            <ProfileForm action='create' setSelfProfile={setSelfProfile} user={user} />
        </>
    )
}

export default NewProfilePage;