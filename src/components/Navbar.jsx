import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { AppBar, Autocomplete, Box, Button, CssBaseline, TextField, Toolbar, Typography } from "@mui/material";
import { useConfigContext } from "../providers/ConfigProvider";

export const Navbar = () => {
  const { logout } = useAuthContext();
  const { config, allposts } = useConfigContext();

  let alltitles = allposts?.map(el => el.data?.title || "")
  console.log("All titles", alltitles)
  console.log("ALl posts", allposts)

  return (
    <div>

<Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Welcome To My Blog
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }}>
                Home
              </Button>
              <Button sx={{ color: '#fff' }}>
                My Blogs
              </Button>
              
              <Button sx={{ color: '#fff' }}>
                Subs
              </Button>
              <Button sx={{ color: '#fff' }}>
                Explore
              </Button>
              <Autocomplete
            disablePortal
            id="searchplacesbox"
            options={config?.locations}
            renderInput={(params) => (
              <TextField {...params} label="Places" sx={{color: "white"}} />
            )}
            sx={{ width: 300}}
          />
              <Autocomplete
            id="searchbar"
            options={allposts?.map(el => el.data?.title || "")}
            renderInput={(params) => (
              <TextField {...params} label="Title" sx={{color: "white"}} />
            )}
            sx={{ width: 300}}
          />
              <Button sx={{ color: '#fff' }}>
                Profile
              </Button>

          </Box>
        </Toolbar>
      </AppBar>
      </Box>
      <div style={{ marginTop: "140px" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
