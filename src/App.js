import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import MovieList from './components/MovieList';
import Recommendations from './components/Recommendations';

function App() {
  const [selectedMovies, setSelectedMovies] = useState([]);

  return (
    <Container>
      <h1 className="my-4">Movie Recommendation App</h1>
      <MovieList onMoviesChange={setSelectedMovies} />
      {console.log(selectedMovies)}
      <Recommendations movies={selectedMovies} />
    </Container>
  );
}

export default App;
