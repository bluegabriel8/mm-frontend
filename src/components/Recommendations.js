import React, { useState, useEffect} from 'react';
import { getRecommendations } from '../api';
import { Card, Button, Row, Col } from 'react-bootstrap';

function Recommendations({ movies }) {
  const [recommendations, setRecommendations] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [moviePosters, setMoviePosters] = useState({});

  useEffect(() => {
    if (recommendations.length > 0) {
      fetchMovieDetails();
    }
  }, [recommendations]); // Run this effect when the 'recommendations' state changes

  // Function for fetching movie details
  const fetchMovieDetails = async () => {
    const updatedDetails = {};
    const updatedPosters = {};

    for (const movie of recommendations) {
      if (!movieDetails[movie]) { // Only fetch if not already in state
        try {
          const response = await fetch(`http://www.omdbapi.com/?apikey=d7c19372&t=${encodeURIComponent(movie)}`);
          const data = await response.json();
          if (data.Response === 'True') {
            updatedDetails[movie] = data.Plot; // Store the movie description
            updatedPosters[movie] = data.Poster;
            console.log(data.Poster)
          }
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    }

    setMovieDetails(prevDetails => ({ ...prevDetails, ...updatedDetails }));
    setMoviePosters(prevPosters => ({ ...prevPosters, ...updatedPosters }));
  };



  const handleGetRecommendations = () => {
    getRecommendations(movies.map((movie) => movie.title)).then((response) => {
        console.log(response.data.recommended_movies)
      setRecommendations(response.data.recommended_movies);
    });
    console.log(movies)
    fetchMovieDetails();
  };

  return (
    <div>
      {/* <div style={{ backgroundColor: "#f1f1f1", paddingTop: "20px", width: "80%", margin:"auto", borderRadius: "2%", textAlign: "center"}}> */}
      <div style={{textAlign: "center"}}>
        <p>Based on your selected movies:</p>
        <Button variant="secondary" onClick={handleGetRecommendations} className="mb-4">
        Get Recommendations
      </Button>
      </div>
      
      <Row>
        {console.log(recommendations)}
        {recommendations.map((movie, index) => (
          <Col key={index} md={4}>
            <Card style={{marginBottom: "30px"}}>
              <Card.Body>
                <Card.Title>{movie}</Card.Title>
                <Card.Text>{movieDetails[movie]}</Card.Text>
                <Card.Img
                    variant="bottom"
                    src={moviePosters[movie]}
                    style={{ width: '100px', height: '150px', objectFit: 'cover' }} // Adjust width and height as needed
                  />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Recommendations;
