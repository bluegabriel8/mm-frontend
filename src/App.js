import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import MovieList from './components/MovieList';
import Recommendations from './components/Recommendations';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const {isLoading, error} = useAuth0();

  return (
    
   <>
    {isAuthenticated &&  
      <div style={{position:"relative", marginRight:"20px", textAlign:"right", top:"5px"}}>
       
      <p>Welcome, {user.name}!</p>
      <button onClick={() => logout()}>
          Log Out
      </button>
    </div>
    }

       <h1 className="my-4" style={{textAlign: "center"}}>Movie Masters</h1>
      
      {error && <div>Oops... {error.message}</div>}
      {!error && isLoading && <div>Loading...</div>}
      {isAuthenticated && !isLoading ? (
        <Container> 
          
          {selectedMovies.length > 0 && 
          <h4>Select Movies</h4>
          }
          <MovieList onMoviesChange={setSelectedMovies} />
          <Recommendations movies={selectedMovies} />
          
          </Container>           
            
      ) : (
        <>
        {!isLoading &&
        <>
        <p>Movie Masters is dedicated to bringing you fresh recommendations for movies. Simply enter as many movies as you like and select the ones you would like to use to influence the algorithm.
          They can be movies you love, hate, or feel indifferent about. We'll take your list and find the perfect movie for you to watch next. 
          Log in, or register to get started!
        </p>
        <button onClick={loginWithRedirect}>Log in</button>
        </>
      }
        </>
      )}
    </>
  );
  
}

export default App;
