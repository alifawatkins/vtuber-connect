// import getProfileCards from '../utilities/profiles-api';

function HomePage({user, favs}) {
    return (
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
        </main>
    )
}

export default HomePage;