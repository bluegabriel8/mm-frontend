import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getMovies = (userEmail) => {
    return axios.get(`${API_BASE_URL}/movies`, {
      params: {
        email: userEmail,
      },
    });
  };
export const addMovie = (movie) => axios.post(`${API_BASE_URL}/movies`, movie);
export const removeMovie = (id) => axios.delete(`${API_BASE_URL}/movies/${id}`);
export const getRecommendations = (movies) => axios.post(`${API_BASE_URL}/recommend`, { movies });