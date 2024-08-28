import React, { useState, useEffect } from 'react';
import { getMovies, addMovie, removeMovie } from '../api';
import { ListGroup, Button, FormControl, Form } from 'react-bootstrap';

function MovieList({ onMoviesChange }) {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]); // State for selected movies

  useEffect(() => {
    getMovies().then((response) => {
      setMovies(response.data);
      onMoviesChange(response.data); // Call onMoviesChange with the updated movies
    });
  }, []);


  const handleAddMovie = () => {
    const newMovieObj = { title: newMovie };
    addMovie(newMovieObj).then((response) => {
      const updatedMovies = [...movies, newMovieObj];
      setMovies(updatedMovies);
      onMoviesChange(updatedMovies);
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

  const handleSelectMovie = (id) => {
    setSelectedMovies((prevSelectedMovies) => {
        const updatedSelectedMovies = prevSelectedMovies.includes(id)
          ? prevSelectedMovies.filter((movieId) => movieId !== id)
          : [...prevSelectedMovies, id];
  
        // Update the titles of the selected movies and pass them to onMoviesChange
        const selectedMovieTitles = updatedSelectedMovies.map((id) => {
          const movie = movies.find((movie) => movie.id === id);
          return movie;
        }).filter(Boolean);
  
        onMoviesChange(selectedMovieTitles); // Call with selected movie titles
  
        return updatedSelectedMovies;
    });
  };

  return (
    <div>
      <ListGroup>
        {movies.map(({ id, title }) => (
          <ListGroup.Item key={id}>
            <Form.Check
              type="checkbox"
              checked={selectedMovies.includes(id)}
              onChange={() => handleSelectMovie(id)}
              inline
            />
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

      <div className="mt-3">
        <h5>Selected Movies:</h5>
        <ul>
          {selectedMovies.map((id) => {
            const movie = movies.find((movie) => movie.id === id);
            return <li key={id}>{movie?.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default MovieList;
