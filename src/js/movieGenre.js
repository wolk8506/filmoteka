// *****  Запрос жанров фильмоы  *******************************************

const axios = require('axios');
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

function movieGenre() {
  return axios
    .get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      return saveStorageGenres(response.data.genres);
    });
}

function saveStorageGenres(genres) {
  genres.map(({ id, name }) => {
    return localStorage.setItem(`${id}`, `${name}`);
  });
}
movieGenre();
