import React, { useState } from 'react';
import { getRecommendations } from '../api';
import { Card, Button, Row, Col } from 'react-bootstrap';

function Recommendations({ movies }) {
  const [recommendations, setRecommendations] = useState([]);

  const handleGetRecommendations = () => {
    getRecommendations(movies.map((movie) => movie.title)).then((response) => {
        console.log(response.data.recommended_movies)
      setRecommendations(response.data.recommended_movies);
    });
    console.log(movies)
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Recommendations;
