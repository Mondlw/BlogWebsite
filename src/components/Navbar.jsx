import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import "../styles/styles.css";
import { Autocomplete, TextField } from "@mui/material";
import { useConfigContext } from "../providers/ConfigProvider";

export const Navbar = () => {
  const { logout } = useAuthContext();
  const { config, allposts } = useConfigContext();

  let alltitles = allposts?.map(el => el.data?.title || "")
  console.log("All titles", alltitles)
  console.log("ALl posts", allposts)

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
        <li>
          <Autocomplete
            disablePortal
            id="searchplacesbox"
            options={config?.locations}
            renderInput={(params) => (
              <TextField {...params} label="Places" sx={{color: "white"}} />
            )}
            sx={{ width: 300}}
          />
        </li>
        <li className="subscriptions">
          <Link to="/blogs">Subs</Link>
        </li>
        <li className="random_post">
          <Link to="/explore">Explore</Link>
        </li>

        <li>
          <Autocomplete
            id="searchbar"
            options={allposts?.map(el => el.data?.title || "")}
            renderInput={(params) => (
              <TextField {...params} label="Title" sx={{color: "white"}} />
            )}
            sx={{ width: 300}}
          />
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
