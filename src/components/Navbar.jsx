import { Link, Outlet } from "react-router-dom"
import { useAuthContext } from '../providers/AuthProvider';


export const Navbar = () => {

  
  const { logout } = useAuthContext();

  return (
    <div>
        <ul>
      <li><Link to="/home">Home</Link></li>
      <li className="bloglist">
      <Link to="/my-blogs">My Blogs</Link>
      </li>
      <li className="places">
      <Link to="/login">Places</Link>
      </li>
      <li className="subscriptions">
      <Link to="/blogs">Subs</Link>
      </li>
      <li className="random_post">
      <Link to="/login">Random Post</Link>
      </li>

      <li>
        <form className="searchbar" action="/action_page.php">
        <input type="search" id="gsearch" name="gsearch" />
        <input type="submit" value="Submit" />
      </form>
    </li>

      <li className="profile">
      <Link to="/profile">Profile</Link>
        <div className="profile-content">
          <a href="#" onClick={logout}>Log out</a>
        </div>
      </li>
    </ul>
    <div style={{marginTop: "100px"}}>
    <Outlet></Outlet>
    </div>
    </div>
  )
}
