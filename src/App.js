/** @jsxImportSource @emotion/react */
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NavBar } from './components/NavBar';
import Grid from '@mui/material/Grid';
import { Subreddits } from './features/Subreddits/Subreddits';

import Container from '@mui/material/Container'
import { Posts } from './features/Posts/Posts'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#ffffff',
      light: '#f5f5f5',
      dark: '#a9a9a9',
      contrastText: '#1976d2'
    }
  }
})

function App() {
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
          <Grid item xs={9}>
            <Posts />
          </Grid>
          <Grid item xs={3}>
            <Subreddits />
          </Grid>
        </Grid>
      </Container>
      
    </ThemeProvider>
  );
}

export default App;
