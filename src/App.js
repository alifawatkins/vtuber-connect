import {useState, useEffect} from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import NewProfilePage from './pages/NewProfilePage';
import ProfilePage from './pages/ProfilePage';
import InboxPage from './pages/InboxPage';

import NavBar from './components/NavBar';

import { getUser } from './utilities/users-service';
import * as profilesApi from './utilities/profiles-api';

import './App.css';
import EditProfilePage from './pages/EditProfilePage';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as heartSolid} from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartRegular} from '@fortawesome/free-regular-svg-icons';

library.add(heartSolid, heartRegular);

function App() {
  const [user, setUser] = useState(getUser());
  const [selfProfile, setSelfProfile] = useState(null);
  // const [selfProfile, setSelfProfile] = useState(true);
  const [navSelected, setNavSelected] = useState('home');

  useEffect(function () {
    async function getSelfProfileApi() {
      const selfProfile = await profilesApi.getSelfProfile(user?._id);
      setSelfProfile(selfProfile);
    }
    getSelfProfileApi();
  },[user]);

  return (
    <main className="App">
      { user ? 
        (selfProfile ?
          <>
          <NavBar user={user} setUser={setUser} selfProfile={selfProfile} setSelfProfile={setSelfProfile}navSelected={navSelected} setNavSelected={setNavSelected} />
          <Routes>
            <Route path='/' element={<HomePage user={user} setUser={setUser} selfProfile={selfProfile} setSelfProfile={setSelfProfile} favs={false} />} />
            <Route path='/home' element={<Navigate to="/" />} />
            <Route path='/favorites' element={<HomePage user={user} setUser={setUser} favs={true} selfProfile={selfProfile}/>} />
            <Route path='/inbox' element={<InboxPage user={user} />} />
            <Route path='/profiles/:profileId' element={ <ProfilePage user={user} setUser={setUser} /> }/>
            <Route path='/profile' element={ <ProfilePage  user={user} setUser={setUser} selfProfile={selfProfile} /> }/>
            <Route path='/editProfile' element={ <EditProfilePage user={user} setUser={setUser} selfProfile={selfProfile} setSelfProfile={setSelfProfile}/> }/>
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
          </> 
        :
          <>
            <NavBar user={user} setUser={setUser} selfProfile={selfProfile} setSelfProfile={setSelfProfile}navSelected={"profile"} setNavSelected={setNavSelected} />
            <NewProfilePage user={user} setUser={setUser} setSelfProfile={setSelfProfile} />
          </>)
      : 
        <AuthPage setUser={setUser} setSelfProfile={setSelfProfile}/>
      }
    </main>
  );
}

export default App;