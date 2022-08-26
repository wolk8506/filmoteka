// import onEscBtnClick from './modalClose';
const axios = require('axios');
import { refs } from './refs';
import { Spinner } from 'spin.js';
import opts from './spinner';
import { langPageChoice } from './localization';

var target = document.querySelector('body');
var spinner = new Spinner(opts);
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

// refs.movieModal.addEventListener('click', movieId);
refs.movieTrailer.addEventListener('click', modalOpen);

function modalOpen(e) {
  console.log('modal open');
  refs.backdrop2.classList.toggle('is-hidden');
  // movieTrailer(movieId);
  spinner.spin(target);
  movieTrailer(e.path[1].value);
}

refs.closeModalBtn2.addEventListener('click', toggleModal);
function toggleModal() {
  refs.backdrop2.classList.toggle('is-hidden');
  refs.player.innerHTML = ``;
}

// *****  Trailer  *****
// let movieTrailerId = '';

function movieTrailer(movieId) {
  return axios
    .get(`${BASE_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=${langPageChoice.id}`)
    .then(response => {
      console.log(response.data.results.length);

      if (response.data.results.length === 0) {
        refs.player.innerHTML = `<img src='https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635448_960_720.png' width="360"/>`;
      }
      refs.player.innerHTML = `<iframe width="640" height="360" src="https://www.youtube.com/embed/${response.data.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      console.log(response.data.results);
      btnTrailer(response.data.results);
      spinner.stop();
    });
}

const blockBtnTrailer = document.querySelector('.block-btn-trailer');
blockBtnTrailer.addEventListener('click', fu5);

function fu5(e) {
  if (e.path[0].nodeName !== 'BUTTON') {
    return;
  }
  refs.player.innerHTML = `<iframe width="640" height="360" src="https://www.youtube.com/embed/${e.path[0].dataset.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  console.log(e.path[0].dataset.id);
  console.log(e);
}

function btnTrailer(data) {
  let num = 0;
  blockBtnTrailer.innerHTML = data
    .map(d => {
      num++;
      console.log(d.key);
      return `
      <div>
<button class="btn-trailer" data-id="${d.key}">
</button>
<p>Trailer ${num}</p>
</div>
`;
    })
    .join('');
}
