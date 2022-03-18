/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RedditIcon from '@mui/icons-material/Reddit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            
            <RedditIcon sx={{
              mx: 1,
            }}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Reddit Client
            </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
