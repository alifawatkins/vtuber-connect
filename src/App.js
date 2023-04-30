import {useState} from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import NewProfilePage from './pages/NewProfilePage';
import ProfilePage from './pages/ProfilePage';
import InboxPage from './pages/InboxPage';

import NavBar from './components/NavBar';

import { getUser } from './utilities/users-service';
// import { getSelfProfile } from './utlities/profiles-service';

import './App.css';

function App() {
  const [user, setUser] = useState(getUser());
  // const [selfProfile, setSelfProfile] = useState(getSelfProfile());
  const [selfProfile, setSelfProfile] = useState(false);
  const [navSelected, setNavSelected] = useState('home');

  return (
    <main className="App">
      { user ? 
        (selfProfile ?
          <>
          <NavBar user={user} setUser={setUser} navSelected={navSelected} setNavSelected={setNavSelected} />
          <Routes>
            <Route path='/' element={<HomePage user={user} setUser={setUser} favs={false} />} />
            <Route path='/home' element={<Navigate to="/" />} />
            <Route path='/favorites' element={<HomePage user={user} favs={true}/>} />
            <Route path='/inbox' element={<InboxPage user={user} />} />
            <Route path='/profiles/:profileId' element={ <ProfilePage user={user}/> }/>
            <Route path='/profile' element={ <ProfilePage  user={user} selfProfile={selfProfile} /> }/>
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
          </> 
        :
          <NewProfilePage user={user} setUser={setUser} setSelfProfile={setSelfProfile} />)
      : 
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;