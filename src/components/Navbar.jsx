import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider';
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useConfigContext } from '../providers/ConfigProvider';

import { useNavigate } from "react-router-dom"

export const Navbar = () => {
  const { logout } = useAuthContext();
  const { config, allposts } = useConfigContext();

  const navigate = useNavigate();

  let alltitles = allposts?.map((el, index) => ({
    key: `titles-${index}`,
    postId: el.id,
    data: el.data,
  }));


  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <AppBar component='nav' sx={{ backgroundColor: '#5e4c25' }}>
          <Toolbar>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#fff' }}
            >
              VibrantBlogVoyage
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }} onClick={() => navigate("/home")}>Home</Button>
              <Button sx={{ color: '#fff' }} onClick={() => navigate("/my-blogs")}>My Blogs</Button>
              <Button sx={{ color: '#fff' }} onClick={() => navigate("/blogs")}>Subs</Button>
              <Button sx={{ color: '#fff' }} onClick={() => navigate("/explore")}>Explore</Button>
            </Box>

            <Autocomplete
              onChange={(event, value) => console.log(value)}
              id='searchbox'
              options={config?.locations || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Places'
                  sx={{
                    color: 'white', // Text color
                    '& .MuiInputLabel-root': {
                      color: 'white', // Label color
                      '&.Mui-focused': {
                        color: 'white', // Label color when focused
                      },
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white', // Underline color when not focused
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: 'white', // Underline color when focused
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                      borderBottomColor: 'white', // Underline color on hover
                    },
                    '& .MuiAutocomplete-inputRoot': {
                      color: 'white', // Text color in the input
                    },
                  }}
                  variant='standard'
                />
              )}
              sx={{ width: 240, ml: 2 }}
            />
            <Autocomplete
              id='searchbox'
              options={alltitles || []}
              onChange={(event, value) => navigate(`/my-blogs/${value.data.blogId}/posts/${value.postId}`, { state: { post: value.data } })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Title'
                  sx={{
                    color: 'white', // Text color
                    '& .MuiInputLabel-root': {
                      color: 'white', // Label color
                      '&.Mui-focused': {
                        color: 'white', // Label color when focused
                      },
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white', // Underline color when not focused
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: 'white', // Underline color when focused
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                      borderBottomColor: 'white', // Underline color on hover
                    },
                    '& .MuiAutocomplete-inputRoot': {
                      color: 'white', // Text color in the input
                    },
                  }}
                  variant='standard'
                />
              )}
              getOptionLabel={(option) => option.data.title}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.key}>
                    {option.data.title}
                  </li>
                );
              }}
              sx={{ width: 240, ml: 2 }}
            />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }} onClick={() => navigate("/profile")}>Profile</Button>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }} onClick={logout}>Log out</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ marginTop: '140px' }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
