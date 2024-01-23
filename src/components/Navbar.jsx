import { Link, Outlet } from "react-router-dom"

export const Navbar = () => {
  return (
    <div>
        <ul>
      <li><a className="active" href="./home.html">Home</a></li>
      <li className="dropdown">
        {/*plcs*/}
        <div className="dropdown-content">
            <Link to="/login">Go to login</Link>
          <a href="./(New Post) index.html">New Post</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </li>
      <li className="places">
        {/*plcs*/}
        <div className="places-content">
            <a href="./places.html">Search places</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </li>
      <li className="subscriptions">
        {/*subsc*/}
        <div className="subscriptions-content">
            <a href="./(Subscriptions) index.html">Authors</a>
          <a href="#">Link 5</a>
          <a href="#">Link 6</a>
        </div>
      </li>
      <li className="news">
      <a href="javascript:void(0)" className="nws">nws</a>
        <div className="news-content">
          <Link to="/login">Go to login</Link>
          <Link to="/login">Go to login</Link>
          <Link to="/login">Go to login</Link>
        </div>
      </li>
      <li className="foryou">
        <a href="javascript:void(0)" className="fryu">For you</a>
        <div className="foryou-content">
          <Link to="/login">Go to login</Link>
          <Link to="/blogs">Go to blogs</Link>
          <Link to="/login">Go to login</Link>
        </div>
      </li>

      <li>
        <form className="searchbar" action="/action_page.php">
        <input type="search" id="gsearch" name="gsearch" />
        <input type="submit" value="Submit" />
      </form>
    </li>

      <li className="profile">
        <a href="javascript:void(0)" className="prfl">Profile</a>
        <div className="profile-content">
            <a href="./profile.html">Profile</a>
          <a href="#">Log out</a>
          <a href="#">Settings</a>
        </div>
      </li>
    </ul>
    <div style={{marginTop: "100px"}}>
    <Outlet></Outlet>
    </div>
    </div>
  )
}
