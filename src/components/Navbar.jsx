import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import "../styles/styles.css"


export const Navbar = () => {
  const { logout } = useAuthContext();

  return (
    <div>
      <link rel="stylesheet" href="../styles/styles.css" />
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li className="my-blogs">
          <Link to="/my-blogs">My Blogs</Link>
        </li>
        <li className="places">
          <Link to="/login">Places</Link>
        </li>
        <li className="subscriptions">
          <Link to="/blogs">Subs</Link>
        </li>
        <li className="random_post">
          <Link to="/login">Explore</Link>
        </li>

        <li>
          <div className="searchbar" action="/action_page.php">
            <input type="search" className="search-field"/>
            <input type="submit" className="search-icon"/>
          </div>
        </li>

        <li className="profile">
          <Link to="/profile">Profile</Link>
          <div className="profile-content">
            <a href="#" onClick={logout}>
              Log out
            </a>
          </div>
        </li>
      </ul>
      <div style={{ marginTop: "140px" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
