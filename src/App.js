/** @jsxImportSource @emotion/react */
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NavBar } from './components/NavBar';
import Grid from '@mui/material/Grid';
import { Subreddits } from './features/Subreddits/Subreddits';
import Container from '@mui/material/Container'
import { Posts } from './features/Posts/Posts'
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { selectDrawerStatus, closeDrawer } from './features/Subreddits/subredditsSlice';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#ffffff',
      light: '#fafafa',
      dark: '#a9a9a9',
      contrastText: '#1976d2'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.75)'
    }
  },
})

function App() {
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const dispatch = useDispatch()
  const drawerStatus = useSelector(selectDrawerStatus)

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container 
        maxWidth={false}
        sx={{
          width: '100%',
          p: 2,
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} md={8} lg={9}>
            <Posts />
          </Grid>
          { matches ? (
            <Grid item md={4} lg={3}>
              <Subreddits />
            </Grid>
          ) : (
            <Drawer
              anchor='left'
              open={drawerStatus}
              ModalProps={{keepMounted: true}}
              onClose={() => dispatch(closeDrawer())}
            >
              <Subreddits />
            </Drawer>
          )}
        </Grid>
      </Container>
      
    </ThemeProvider>
  );
}

export default App;
