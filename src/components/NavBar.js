import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RedditIcon from '@mui/icons-material/Reddit';
import Grid from '@mui/material/Grid';
import { SearchBar } from './SearchBar';

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item xs={3} sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <RedditIcon sx={(theme) => ({
                mx: 1,
              })}/>
              <Typography variant="h6" component="div">
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