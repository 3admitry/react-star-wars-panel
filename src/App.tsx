import React from 'react';
import './App.css';
import {Container} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import CharacterInfo from "./features/characters/character/CharacterInfo";
import CharactersList from './features/characters/CharactersList';


function App() {
  return (
      <Container maxWidth="md">
          <Routes>
              <Route path="/" element={<CharactersList />} />
              <Route path='/person/:userId' element={<CharacterInfo/>}/>
          </Routes>
      </Container>
  );
}

export default App;
