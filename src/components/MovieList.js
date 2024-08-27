import React, { useState, useEffect } from 'react';
import { getMovies, addMovie, removeMovie } from '../api';
import { ListGroup, Button, FormControl } from 'react-bootstrap';

function MovieList({ onMoviesChange }) {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');

  useEffect(() => {
    getMovies().then((response) => setMovies(response.data));
    console.log(movies);
  }, []);

  const handleAddMovie = () => {
    addMovie({ title: newMovie }).then((response) => {
      setMovies([...movies, response.data]);
      setNewMovie('');
      onMoviesChange([...movies, response.data]);
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
        {movies.map((movie) => (
          <ListGroup.Item key={movie[0]}>
            {movie[1]}
            <Button variant="danger" size="sm" className="float-right" onClick={() => handleRemoveMovie(movie[1])}>
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
