import React, { useState, useEffect } from 'react';
import { getMovies, addMovie, removeMovie } from '../api';
import { ListGroup, Button, FormControl } from 'react-bootstrap';

function MovieList({ onMoviesChange }) {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');

  useEffect(() => {
    getMovies().then((response) => setMovies(response.data));
    console.log(movies)
  }, []);

  const handleAddMovie = () => {
    const newMovieObj = {title: newMovie }; // Create a new movie object
    addMovie(newMovieObj).then((response) => {
      setMovies([...movies, newMovieObj]);
      onMoviesChange([...movies, newMovieObj]);
      setNewMovie('');
    });
  };

  const handleRemoveMovie = (id) => {
    removeMovie(id).then(() => {
      const updatedMovies = movies.filter((movie) => movie.id !== id);
      setMovies(updatedMovies);
      onMoviesChange(updatedMovies);
    });
  };

  return (
    <div>
      <ListGroup>
        {movies.map(({ id, title }) => (
          <ListGroup.Item key={id}>
            {title}
            <Button 
              variant="danger" 
              size="sm" 
              className="float-right" 
              onClick={() => handleRemoveMovie(id)}
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <FormControl
        type="text"
        placeholder="Add a movie"
        value={newMovie}
        onChange={(e) => setNewMovie(e.target.value)}
      />
      <Button variant="primary" onClick={handleAddMovie} className="mt-2">
        Add Movie
      </Button>
    </div>
  );
}

export default MovieList;
