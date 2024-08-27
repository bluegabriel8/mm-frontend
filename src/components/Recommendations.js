import React, { useState } from 'react';
import { getRecommendations } from '../api';
import { Card, Button, Row, Col } from 'react-bootstrap';

function Recommendations({ movies }) {
  const [recommendations, setRecommendations] = useState([]);

  const handleGetRecommendations = () => {
    getRecommendations(movies.map((movie) => movie.title)).then((response) => {
      setRecommendations(response.data.recommended_movies);
    });
  };

  return (
    <div>
      <Button variant="success" onClick={handleGetRecommendations} className="mb-4">
        Get Recommendations
      </Button>
      <Row>
        {recommendations.map((movie, index) => (
          <Col key={index} md={4}>
            <Card>
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
