import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RedditIcon from '@mui/icons-material/Reddit';
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

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
              <Box
                width='100%' 
                sx={(theme) => ({
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                borderRadius: '5px',
                transition: theme.transitions.create('background-color', {
                  duration: 250,
                }), 
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.25)
                },
              })}>
                <InputBase 
                  startAdornment={(
                    <InputAdornment position='start'>
                      <SearchIcon 
                        sx={(theme) => ({
                          color: theme.palette.common.white,
                        })}/>
                    </InputAdornment>
                  )}
                  placeholder='Search'
                  sx={(theme) => ({
                  color: theme.palette.common.white,
                  padding: '5px',
                  width: '100%',
                })}/>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}