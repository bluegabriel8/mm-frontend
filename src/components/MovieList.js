import React, { useState, useEffect } from 'react';
import { getMovies, addMovie, removeMovie } from '../api';
import { ListGroup, Button, FormControl, Form } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import "../index.css"

function MovieList({ onMoviesChange }) {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]); // State for selected movies
  const { user, isAuthenticated } = useAuth0();
  

  useEffect(() => {
    const userEmail = user.email;
    getMovies(userEmail).then((response) => {
      setMovies(response.data);
      onMoviesChange(response.data); // Call onMoviesChange with the updated movies
    });
  }, [isAuthenticated]);


  const isSelected = (title) => selectedMovies.includes(title);

  const toggleSelectMovie = (title) => {
    setSelectedMovies((prevSelectedMovies) => {
        const updatedSelectedMovies = prevSelectedMovies.includes(title)
          ? prevSelectedMovies.filter((movieId) => movieId !== title)
          : [...prevSelectedMovies, title];
  
        // Update the titles of the selected movies and pass them to onMoviesChange
        const selectedMovieTitles = updatedSelectedMovies.map((title) => {
          const movie = movies.find((movie) => movie.title === title);
          return movie;
        }).filter(Boolean);
  
        onMoviesChange(selectedMovieTitles); // Call with selected movie titles
  
        return updatedSelectedMovies;
    });
  };


  const handleAddMovie = () => {
    const newMovieObj = { title: newMovie };
    const postObject = {title: newMovie, email: user.email}
    addMovie(postObject).then((response) => {
      const updatedMovies = [...movies, newMovieObj];
      setMovies(updatedMovies);
      onMoviesChange(updatedMovies);
      setNewMovie('');
    });
  };

  const handleRemoveMovie = (title) => {
    removeMovie(title, user.email).then(() => {
      const updatedMovies = movies.filter((movie) => movie.title !== title);
      setMovies(updatedMovies);
      onMoviesChange(updatedMovies);
    });
  };

  // const handleSelectMovie = (id) => {
  //   setSelectedMovies((prevSelectedMovies) => {
  //       const updatedSelectedMovies = prevSelectedMovies.includes(id)
  //         ? prevSelectedMovies.filter((movieId) => movieId !== id)
  //         : [...prevSelectedMovies, id];
  
  //       // Update the titles of the selected movies and pass them to onMoviesChange
  //       const selectedMovieTitles = updatedSelectedMovies.map((id) => {
  //         const movie = movies.find((movie) => movie.id === id);
  //         return movie;
  //       }).filter(Boolean);
  
  //       onMoviesChange(selectedMovieTitles); // Call with selected movie titles
  
  //       return updatedSelectedMovies;
  //   });
  // };

  return (
      <div>
        <div style={{gap: "10px"}} className="d-flex flex-wrap" >
          {movies.map(({ id, title }) => (
          <div 
            key={id} 
            className={`d-flex align-items-center movie-item ${isSelected(title) ? 'selected' : ''}`} 
            onClick={() => toggleSelectMovie(title)}
            style={{ borderRadius: "10%", padding: '5px 10px', border: '1px solid #dee2e6', borderRadius: '4px' 
            }}
          >
          {title}
          <Button 
            variant="secondary" 
            size="sm" 
            style={{ marginLeft: 'auto', backgroundColor: 'transparent', border: 'none', color: 'gray' }} 
            onClick={(e) => {
              e.stopPropagation();  // Prevent triggering the item selection
              handleRemoveMovie(title);
            }}
          >
            X
          </Button>
        </div>
        ))}
      </div>
      <div style={{marginTop: "20px", marginRight: "auto", marginLeft: "auto" ,width: "80%", backgroundColor: "#eeeeee", borderRadius: "2%", paddingTop: "20px"}}>
      <FormControl
        type="text"
        placeholder="What have you seen recently?"
        value={newMovie}
        style={{width: "80%", margin: "auto"}}
        onChange={(e) => setNewMovie(e.target.value)}
      />
      <div style={{textAlign: "center"}}>
      <Button variant="secondary"  style={{margin: "auto", border:"none", backgroundColor: "#aeaeae"}} onClick={handleAddMovie} className="mt-2">
        Add Movie
      </Button>
      </div>
      
      </div>
      

      <div className="mt-3">
        {/* <h5>Selected Movies:</h5> */}
  
          {selectedMovies.map((id) => {
            const movie = movies.find((movie) => movie.id === id);
            // return <li key={id}>{movie?.title}</li>;
          })}
        
      </div>
    </div>
  );
}

export default MovieList;
