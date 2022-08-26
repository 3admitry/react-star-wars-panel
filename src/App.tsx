import React from 'react';
import './App.css';
import {Container, createTheme, ThemeProvider} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import CharacterInfo from "./features/characters/character/CharacterInfo";
import CharactersList from './features/characters/CharactersList';
import logo from './logo.png'

function App() {
    let theme = createTheme({
        palette: {
            mode: 'dark',
            primary:{
                main: '#f5ff00',
            },
        },
    });

  return (
      <ThemeProvider theme={theme}>
      <Container maxWidth="md">
          <img style={{width:200, display: 'block', margin: 'auto'}} src={logo} alt=""/>
          <Routes>
              <Route path="/" element={<CharactersList />} />
              <Route path='/person/:userId' element={<CharacterInfo/>}/>
          </Routes>
      </Container>
      </ThemeProvider>
  );
}

export default App;
