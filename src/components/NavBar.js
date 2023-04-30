import { Link } from "react-router-dom";
import { logOut } from "../utilities/users-service";
import Logo from '../components/Logo';
import './NavBar.css';

function NavBar({ user, setUser, navSelected, setNavSelected }) {
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };
  
  return (
    <nav>
      <Logo navbar={true}/>
      <div className="nav-links">
        <Link to="/home"><button className={"nav-button " + (navSelected==="home" ? "selected" : "")} onClick={() => setNavSelected('home')}>Home</button></Link>
        <Link to="/favorites"><button className={"nav-button " + (navSelected==="favs" ? "selected" : "")} onClick={() => setNavSelected('favs')}>Favs</button></Link>
        <Link to="/inbox"><button className={"nav-button " + (navSelected==="inbox" ? "selected" : "")} onClick={() => setNavSelected('inbox')}>Inbox</button></Link>
        <Link to="" onClick={handleLogOut}><button className="nav-button">Sign Out</button></Link>
        <img alt="avatar" className="avatar-thumbnail" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010" />
      </div>
    </nav>
  );
}

export default NavBar;