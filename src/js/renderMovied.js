import { refs } from './refs';

export default function render(markup) {
  refs.movie.innerHTML = markup
    .map(({ title, poster_path, genre_ids, release_date, vote_average, id }) => {
      let imgMovie = `https://image.tmdb.org/t/p/w500${poster_path}`;
      let genre = ``;
      if (genre_ids.length > 3) {
        genre = `${localStorage.getItem(genre_ids[0])}, ${localStorage.getItem(
          genre_ids[1],
        )}, other`;
      } else genre = `${genre_ids.map(genre_ids => localStorage.getItem(genre_ids)).join(', ')}`;
      return `
      <a class="movie-item" data-id="${id}"href="#" onclick="event.preventDefault()">
      <img class="movie-img" src="${
        poster_path !== null
          ? imgMovie
          : 'https://cdn.pixabay.com/photo/2012/04/14/15/43/film-34332_960_720.png'
      }"/>
      <h2 class="movie-title">${title}</h2>
      <ul class="movie-blok-info">
      <li>${genre}</li>
      <li class="movie-year">&nbsp;|&nbsp;${release_date.substr(0, 4)}</li>
      <li class="movie-vote_average">${vote_average.toFixed(1)}</li>
      </ul>
      </a>`;
    })
    .join('');
}
