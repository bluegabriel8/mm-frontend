import axios from 'axios';

const API_BASE_URL = 'https://mm-backend-65bca4ab93dd.herokuapp.com/';

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