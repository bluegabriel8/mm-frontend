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
export const removeMovie = (title, userEmail) => {
  console.log(title);
  console.log(userEmail);
  return axios.delete(`${API_BASE_URL}/movies`, {
    params: {
      title: title,
      email: userEmail,
    },
  });
};



export const getRecommendations = (movies) => axios.post(`${API_BASE_URL}/recommend`, { movies });