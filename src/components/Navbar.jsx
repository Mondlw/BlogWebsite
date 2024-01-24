import { Link, Outlet } from "react-router-dom"
import { logout } from "../providers/AuthProvider";

export const Navbar = () => {
  return (
    <div>
        <ul>
      <li><Link to="/home">Home</Link></li>
      <li className="dropdown">
        {/*plcs
        HOME
        CREATE - DropDown: create blog / post
        Places 
        For you (who you subbed to)
        Random Post

        Search BAR
        */}
        <div className="dropdown-content">
          <Link to="/login">Go to login</Link>
          <Link to="/login">Go to login</Link>
        </div>
      </li>
      <li className="places">
      <Link to="/login">Places</Link>
      </li>
      <li className="subscriptions">
      <Link to="/login">Subs</Link>
      </li>
      <li className="foryou">
      <Link to="/login">FY</Link>
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
          <a href="#"onClick={logout()}>Profile</a>
        </div>
      </li>
    </ul>
    <div style={{marginTop: "100px"}}>
    <Outlet></Outlet>
    </div>
    </div>
  )
}
