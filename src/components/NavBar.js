import { Link } from "react-router-dom";
import { logOut } from "../utilities/users-service";
import Logo from '../components/Logo';

function NavBar({ user, setUser, navSelected, setNavSelected }) {
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };
  
  return (
    <nav>
      <Logo />
      <Link className={navSelected=="home" ? "selected" : ""} onClick={setNavSelected('home')} to="/home">Home</Link>
      &nbsp; | &nbsp;
      <Link className={navSelected=="favs" ? "selected" : ""} onClick={setNavSelected('favs')} to="/favorites">Favs</Link>
      <Link className={navSelected=="inbox" ? "selected" : ""} onClick={setNavSelected('inbox')} to="/inbox">Inbox</Link>
      <Link to="" onClick={handleLogOut}>
        Sign Out
      </Link>
      <img src="" />
    </nav>
  );
}

export default NavBar;
