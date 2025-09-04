import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../state/auth/thunks";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <nav className="navbar-professional">
      <div className="navbar-left">Dsa Websheet</div>
      <div className="navbar-right">
        <Link
          to="/sheet"
          className={`navbar-tab${
            location.pathname === "/sheet" ? " active" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className={`navbar-tab${
            location.pathname === "/profile" ? " active" : ""
          }`}
        >
          Profile
        </Link>
        <button className="navbar-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
