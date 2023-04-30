import ProfileForm from "../components/ProfileForm";

function NewProfilePage({user, setUser, setSelfProfile}) {
    return (
        <>
            <h1>Create New Profile</h1>
            <ProfileForm action='create' />
        </>
    )
}

export default NewProfilePage;