import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import MovieList from './components/MovieList';
import Recommendations from './components/Recommendations';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    
   <>
      {isAuthenticated ? (
        <Container>
          <h1 className="my-4">Movie Masters</h1>
          <MovieList onMoviesChange={setSelectedMovies} />
          <Recommendations movies={selectedMovies} />
          <button onClick={() => logout()}>
                Log Out
            </button>
          </Container>
        
           
            
      ) : (
        <button onClick={loginWithRedirect}>Log in</button>
      )}
    </>
  );
  
}

export default App;
