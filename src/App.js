/** @jsxImportSource @emotion/react */
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NavBar } from './components/NavBar';
import Grid from '@mui/material/Grid';

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
      <Grid container>
        <Grid item xs={9}>

        </Grid>
        <Grid item xs={3}>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
