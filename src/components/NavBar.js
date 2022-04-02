import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RedditIcon from '@mui/icons-material/Reddit';
import Grid from '@mui/material/Grid';
import { SearchBar } from './SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { openDrawer } from '../features/Subreddits/subredditsSlice';

export const NavBar = () => {
  const dispatch = useDispatch()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item xs={3} sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <IconButton 
                onClick={() => dispatch(openDrawer())}
                color='secondary'
                sx={{
                  display: {xs: 'flex', md: 'none'}
                }}>
                <MenuIcon />
              </IconButton>
              <RedditIcon 
                fontSize='large'
                sx={(theme) => ({
                  mx: 1,
                })}/>
              <Typography 
                variant="h6" 
                component="div" 
                sx={theme => ({
                  display: {xs: 'none', md: 'block'},
                })}
              >
                Reddit Client
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <SearchBar />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}