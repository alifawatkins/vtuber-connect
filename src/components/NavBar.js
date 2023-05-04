import { Link } from "react-router-dom";
import { logOut } from "../utilities/users-service";
import Logo from '../components/Logo';
import './NavBar.css';

function NavBar({ user, setUser, selfProfile, setSelfProfile, navSelected, setNavSelected }) {
  const handleLogOut = () => {
    logOut();
    setSelfProfile(null);
    setUser(null);
  };
  
  return (
    <nav>
      <Logo navbar={true}/>
      <div className="nav-links">
        <Link to="/home"><button hidden={!selfProfile} className={"nav-button " + (navSelected==="home" ? "selected" : "")} onClick={() => setNavSelected('home')}>Home</button></Link>
        
        <Link to="/favorites"><button hidden={!selfProfile} className={"nav-button " + (navSelected==="favs" ? "selected" : "")} onClick={() => setNavSelected('favs')}>Favs</button></Link>
        
        <Link to="/inbox"><button hidden={!selfProfile} className={"nav-button " + (navSelected==="inbox" ? "selected" : "")} onClick={() => setNavSelected('inbox')}>Inbox</button></Link>
        
        <Link to="" onClick={handleLogOut}><button className="nav-button">Sign Out</button></Link>
        
        <Link to="/profile"><img hidden={!selfProfile} alt="avatar" className="nav-avatar-thumbnail" src={(selfProfile?.profilePicture !== "" ? selfProfile?.profilePicture : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010")} onClick={() => setNavSelected('profile')} /></Link>
      </div>
    </nav>
  );
}

export default NavBar;