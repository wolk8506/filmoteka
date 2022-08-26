// Movied; Queue;
import { refs } from './refs';
import { langPageChoice } from './localization';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { count } from './moviePopular';
// **** переменные ****
const axios = require('axios');
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';
let movieWatched = JSON.parse(localStorage.getItem('movieWatched'));
let movieQueue = JSON.parse(localStorage.getItem('movieQueue'));
let renderMovied = '';

// ??????????????????
let count = 1;
let array = movieWatched;
const array_size = 3; //количество элементов на странице
let sliced_arrayW = [];
let pageLib = 0;
arr1();

function arr1() {
  sliced_arrayW = [];
  for (let i = 0; i < array.length; i += array_size) {
    sliced_arrayW.push(array.slice(i, i + array_size));
  }
  pageLib = sliced_arrayW.length;
}

let arrayQ = movieQueue;
let sliced_arrayQ = [];
let pageLibQ = 0;
arrQ();

function arrQ() {
  sliced_arrayQ = [];
  for (let i = 0; i < arrayQ.length; i += array_size) {
    sliced_arrayQ.push(arrayQ.slice(i, i + array_size));
  }
  pageLibQ = sliced_arrayQ.length;
}

// ?????????????????

refs.library.addEventListener('click', event => {
  event.preventDefault();
  localStorage.setItem(`pageResetLoad`, `3`);
  activBtnHeader();
  count = 1;
  movieIdF(sliced_arrayW[count - 1]);
  refs.moviePogination.innerHTML = '';
});

refs.btnWathed.addEventListener('click', event => {
  event.preventDefault();
  localStorage.setItem(`pageResetLoad`, `3`);
  activBtnHeader();
  count = 1;
  movieIdF(sliced_arrayW[count - 1]);
});

refs.btnQueue.addEventListener('click', event => {
  event.preventDefault();
  localStorage.setItem(`pageResetLoad`, `4`);
  activBtnHeader();
  count = 1;
  movieIdF(sliced_arrayQ[count - 1]);
});
activBtnHeader();
function activBtnHeader() {
  if (3 === Number(localStorage.getItem('pageResetLoad'))) {
    refs.btnWathed.style.background = '#FF6B01';
    refs.btnWathed.style.border = '#FF6B01';
    refs.btnQueue.style.background = 'inherit';
    refs.btnQueue.style.border = '1px solid #FFFFFF';
  } else {
    refs.btnWathed.style.background = 'inherit';
    refs.btnWathed.style.border = '1px solid #FFFFFF';
    refs.btnQueue.style.background = '#FF6B01';
    refs.btnQueue.style.border = '#FF6B01';
  }
}

// **** ****
// **** Запрос и рендер ****
// Запрос фильмов ID
function movieIdF(movieId) {
  // console.log(movieId.length);
  if (movieId === undefined) {
    refs.movie.innerHTML =
      '<div class="default-img-border"><img class="default-img" src="https://cdn.pixabay.com/photo/2016/02/01/18/59/filmstrip-1174228_960_720.png" width="450"/></div>';

    return;
  }
  renderMovied = '';
  movieId.map(m =>
    axios
      .get(`${BASE_URL}movie/${m}?api_key=${API_KEY}&language=${langPageChoice.id}`)
      .then(response => {
        render(response.data);

        if (4 === Number(localStorage.getItem('pageResetLoad'))) {
          renderPagination(pageLibQ);
        } else if (3 === Number(localStorage.getItem('pageResetLoad'))) {
          renderPagination(pageLib);
        }
      }),
  );
}
// Рендер

function render({ title, poster_path, genres, release_date, vote_average, id }) {
  let imgMovie = `https://image.tmdb.org/t/p/w500${poster_path}`;
  let genre = ``;
  if (genres.length > 3) {
    genre = `${genres[0].name}, ${genres[1].name}, other`;
  } else genre = `${genres.map(genre => genre.name).join(', ')}`;
  renderMovied =
    renderMovied +
    `
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
  refs.movie.innerHTML = renderMovied;
}

// **** ****
// **** Запрос ID у фильма(карточки) ****

refs.movieModal.addEventListener('click', movieId);
refs.btnAddWatched.addEventListener('click', addMovieWatched);
refs.btnAddQueue.addEventListener('click', addMovieQueue);

function movieId(e) {
  if (e.path[1].nodeName !== 'A') {
    return;
  }
  movieIdWatched();
  movieIdQueue();
  // проверяет включает ли массив ID Watched
  function movieIdWatched() {
    if (movieWatched.includes(e.path[1].dataset.id)) {
      btnName1Wanted();
      return;
    } else {
      btnName2Wanted();
    }
  }
  // проверяет включает ли массив ID Queue
  function movieIdQueue() {
    if (movieQueue.includes(e.path[1].dataset.id)) {
      btnName1Queue();
      return;
    } else {
      btnName2Queue();
    }
  }
}
// Название кнопок Watched
function btnName1Wanted() {
  refs.btnAddWatched.innerHTML = `${langPageChoice.btn4}`; //'WATCHED';
  if (3 === Number(localStorage.getItem('pageResetLoad'))) {
    refs.btnAddWatched.innerHTML = `${langPageChoice.btn1}`; //'Delete';
  }
}
function btnName2Wanted() {
  refs.btnAddWatched.innerHTML = `${langPageChoice.btn2}`; //'ADD TO WATCHED';
}
// Название кнопок Queue
function btnName1Queue() {
  refs.btnAddQueue.innerHTML = `${langPageChoice.btn5}`; //'Queue';
  if (4 === Number(localStorage.getItem('pageResetLoad'))) {
    refs.btnAddQueue.innerHTML = `${langPageChoice.btn1}`; //'Delete';
  }
}
function btnName2Queue() {
  refs.btnAddQueue.innerHTML = `${langPageChoice.btn3}`; //'ADD TO Queue';
}

// **** ****

function addMovieWatched(e) {
  console.log('click W');

  // Добавление в библеотеку Watched со страниц 1 и 2
  if (movieWatched.includes(e.path[0].value) && 3 > Number(localStorage.getItem('pageResetLoad'))) {
    Notify.warning(`${langPageChoice.noticeInW}`); //'Фильм уже в библиотеке');
    return;
  } else if (
    !movieWatched.includes(e.path[0].value) &&
    3 > Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieWatched.push(e.path[0].value);
    btnName1Wanted();
    Notify.success(`${langPageChoice.noticeAddW}`);
  }
  // Удаляем-добавляем в библеотеку Watched со страниц 1 и 2
  if (
    movieWatched.includes(e.path[0].value) &&
    3 === Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieWatched.splice(movieWatched.indexOf(e.path[0].value), 1);
    btnName2Wanted();
    Notify.failure(`${langPageChoice.noticeDelW}`); //'Фильм удален из библиотеки');
  } else if (
    !movieWatched.includes(e.path[0].value) &&
    3 <= Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieWatched.push(e.path[0].value);
    btnName1Wanted();
    Notify.success(`${langPageChoice.noticeAddW}`);
  }
  //Уведомление о добавленном фильме
  if (
    movieWatched.includes(e.path[0].value) &&
    3 <= Number(localStorage.getItem('pageResetLoad'))
  ) {
    Notify.warning(`${langPageChoice.noticeInW}`);
  }

  // Запись в хранилище
  localStorage.setItem('movieWatched', JSON.stringify(movieWatched));

  arr1();
}

function addMovieQueue(e) {
  // Добавление в библеотеку Queue со страниц 1 и 2
  if (movieQueue.includes(e.path[0].value) && 3 > Number(localStorage.getItem('pageResetLoad'))) {
    Notify.warning(`${langPageChoice.noticeInQ}`); //'Фильм уже в библиотеке');
    return;
  } else if (
    !movieQueue.includes(e.path[0].value) &&
    3 > Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieQueue.push(e.path[0].value);
    btnName1Queue();
    Notify.success(`${langPageChoice.noticeAddQ}`);
  }
  // Удаляем-добавляем в библеотеку Queue со страниц 1 и 2
  if (movieQueue.includes(e.path[0].value) && 4 === Number(localStorage.getItem('pageResetLoad'))) {
    movieQueue.splice(movieQueue.indexOf(e.path[0].value), 1);
    btnName2Queue();
    Notify.failure(`${langPageChoice.noticeDelQ}`); //'Фильм удален из библиотеки');
  } else if (
    !movieQueue.includes(e.path[0].value) &&
    3 <= Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieQueue.push(e.path[0].value);
    btnName1Queue();
    Notify.success(`${langPageChoice.noticeAddQ}`);
  }
  //Уведомление о добавленном фильме
  if (movieQueue.includes(e.path[0].value) && 3 <= Number(localStorage.getItem('pageResetLoad'))) {
    Notify.warning(`${langPageChoice.noticeInQ}`);
  }
  // Запись в хранилище
  localStorage.setItem('movieQueue', JSON.stringify(movieQueue));
  arrQ();
}
// **** Закрытие модалки ****

refs.closeModalBtn.addEventListener('click', toggleModal);
function toggleModal() {
  if (3 <= Number(localStorage.getItem('pageResetLoad'))) {
    libraryPageActiv();
  }
}
// **** ****
// **** проверка сохраненной страницы ****

export default function libraryPageActiv() {
  if (4 === Number(localStorage.getItem('pageResetLoad'))) {
    movieIdF(sliced_arrayQ[count - 1]);
  } else if (3 === Number(localStorage.getItem('pageResetLoad'))) {
    movieIdF(sliced_arrayW[count - 1]);
  }
}
// **** ****

// ??????????????????????????????????????????????????

let pagesPogination = 0;
function renderPagination(pages) {
  pagesPogination = pages + 1;
  let btn2 = 2;
  let btn3 = 3;
  let btn4 = 4;
  let btn5 = 5;
  let btn6 = '...';
  let btn7 = pages;

  if (pages > count + 10) {
    btn7 = count + 10;
  }

  if (count >= pages - 2) {
    btn2 = '...';
    btn3 = pages - 4;
    btn4 = pages - 3;
    btn5 = pages - 2;
    btn6 = pages - 1;
    btn7 = pages;
  } else if (count > 4) {
    btn2 = '...';
    btn3 = count - 1;
    btn4 = count;
    btn5 = count + 1;
  }
  if (pages <= 7) {
    btn2 = 2;
    btn3 = 3;
    btn4 = 4;
    btn5 = 5;
    btn6 = 6;
    btn7 = 7;
  }

  refs.moviePogination.innerHTML = `
 <button class="prev-click" type="button">&larr;</button>
  <button id="btn01l" class="${count === 1 ? 'activ-btn' : ''}" type="button">1</button>
 <button id="btn02l" class="${count === 2 ? 'activ-btn' : ''}" type="button">${btn2}</button>
 <button id="btn03l" class="${count === 3 ? 'activ-btn' : ''}" type="button">${btn3}</button>
 <button id="btn04l" class="${
   (count === 4 && pages < 8) || (count >= 4 && count < pages - 2) ? 'activ-btn' : ''
 }" type="button">${btn4}</button>
 <button id="btn05l" class="${
   (count === 5 && pages < 8) || (pages > 6 && count === pages - 2) ? 'activ-btn' : ''
 }" type="button">${btn5}</button>
 <button id="btn06l" class="${
   (count === 6 && pages < 8) || (pages > 6 && count === pages - 1) ? 'activ-btn' : ''
 }" type="button">${btn6}</button>
 <button id="btn07l" class="${count === pages ? 'activ-btn' : ''}" type="button">${btn7}</button>
 <button class="next-click" type="button">&rarr;</button>
 `;

  const nextClick = document.querySelector('.next-click');
  const prevClick = document.querySelector('.prev-click');
  prevClick.addEventListener('click', prevClickFu);
  nextClick.addEventListener('click', nextClickFu);

  const btn01l = document.querySelector('#btn01l');
  btn01l.addEventListener('click', function () {
    count = 0;
    nextClickFu();
  });

  const btn02l = document.querySelector('#btn02l');
  btn02l.addEventListener('click', function () {
    if (count > 10) {
      count = count - 11;
      nextClickFu();
    } else {
      count = 1;
      nextClickFu();
    }
  });

  const btn03l = document.querySelector('#btn03l');
  btn03l.addEventListener('click', function () {
    count = btn03l.innerText - 1;
    nextClickFu();
  });

  const btn04l = document.querySelector('#btn04l');

  btn04l.addEventListener('click', function () {
    count = btn04l.innerText - 1;
    nextClickFu();
  });

  const btn05l = document.querySelector('#btn05l');
  btn05l.addEventListener('click', function () {
    console.log(btn05l.innerText);

    count = btn05l.innerText - 1;
    nextClickFu();
    btn5 = 5;
  });

  const btn06l = document.querySelector('#btn06l');
  btn06l.addEventListener('click', function () {
    if (pages > count + 10) {
      btn7 = count + 10;
      count = count + 9;
      nextClickFu();
    } else if (pages > 6) {
      count = pages - 2;
      btn7 = pages - 1;
      nextClickFu();
    } else {
      count = btn06l.innerText - 1;
      nextClickFu();
    }
  });

  const btn07l = document.querySelector('#btn07l');
  btn07l.addEventListener('click', function () {
    if (pages > count + 10) {
      btn7 = count + 10;
      count = count + 9;
      nextClickFu();
    } else {
      count = pages - 1;
      btn7 = pages;
      nextClickFu();
    }
  });

  if (pages <= 1) {
    btn01l.style.display = 'none';
  }
  if (pages < 2) {
    btn02l.style.display = 'none';
  }
  if (pages < 3) {
    btn03l.style.display = 'none';
  }
  if (pages < 4) {
    btn04l.style.display = 'none';
  }
  if (pages < 5) {
    btn05l.style.display = 'none';
  }
  if (pages < 6) {
    btn06l.style.display = 'none';
  }
  if (pages < 7) {
    btn07l.style.display = 'none';
    nextClick.style.display = 'none';
    prevClick.style.display = 'none';
  }
  console.log('pages - ' + pages);
}

function nextClickFu() {
  if (count === pagesPogination) {
    return;
  }
  count++;
  movieQuery();
}

function prevClickFu() {
  if (count <= 1) {
    return;
  } else count--;
  movieQuery();
}

function movieQuery() {
  if (4 === Number(localStorage.getItem('pageResetLoad'))) {
    movieIdF(sliced_arrayQ[count - 1]);
    // renderPagination(pageLibQ);
  } else if (3 === Number(localStorage.getItem('pageResetLoad'))) {
    movieIdF(sliced_arrayW[count - 1]);
    // renderPagination(pageLib);
  }
  console.log('count - ' + count);
  console.log('pageLib - ' + pageLib);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
