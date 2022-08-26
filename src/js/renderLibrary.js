// import { refs } from './refs';
// let renderMovied = '';

// export default function render({
//   original_title,
//   poster_path,
//   genres,
//   release_date,
//   vote_average,
//   id,
// }) {
//   let imgMovie = `https://image.tmdb.org/t/p/w500${poster_path}`;
//   let genre = ``;
//   if (genres.length > 3) {
//     genre = `${genres[0].name}, ${genres[1].name}, other`;
//   } else genre = `${genres.map(genre => genre.name).join(', ')}`;
//   renderMovied =
//     renderMovied +
//     `
//       <a class="movie-item" data-id="${id}"href="#" onclick="event.preventDefault()">
//       <img class="movie-img" src="${
//         poster_path !== null
//           ? imgMovie
//           : 'https://cdn.pixabay.com/photo/2012/04/14/15/43/film-34332_960_720.png'
//       }"/>
//       <h2 class="movie-title">${original_title}</h2>
//       <ul class="movie-blok-info">
//       <li>${genre}</li>
//       <li class="movie-year">&nbsp;|&nbsp;${release_date.substr(0, 4)}</li>
//       <li class="movie-vote_average">${vote_average.toFixed(1)}</li>
//       </ul>
//       </a>`;

//   refs.movie.innerHTML = renderMovied;
// }
