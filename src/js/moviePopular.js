import { refs } from './refs';
import queryMovied from './queryMovied';
import { langPageChoice } from './localization';

let pageResetLoad;
let typeRequest = '';
let count = Number(localStorage.getItem('currentPage'));

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';
let QUERY = localStorage.getItem('QUERY');

// ****** переход по кнопкам домой и лого ******

function homePage() {
  count = 1;
  localStorage.setItem(`pageResetLoad`, `1`);
  moviePopular(count);
}
// !!!!!!!!!!!!
function currentPage(page) {
  return localStorage.setItem(`currentPage`, `${page}`);
}

// !!!!!!!! start  !!!!!!!!!!!!!!!

export default function startHP() {
  if (1 === Number(localStorage.getItem('pageResetLoad'))) {
    moviePopular(count);
  } else if (2 === Number(localStorage.getItem('pageResetLoad'))) {
    movieSearch(count);
  }
}

// !!!!!!!!!!!!!  end !!!!!!!!!!!!!!!!

// *****  Запрос популярных фильмов ****************************************
function moviePopular(numberPage) {
  queryMovied(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&language=${langPageChoice.id}&page=${numberPage}`,
  );
  typeRequest = true;
}

// *****  Поиск по названию фильма  *****

refs.input.addEventListener('input', inputSearch);
refs.input.addEventListener('submit', btpSearch);

function btpSearch(e) {
  e.preventDefault();
  count = 1;
  movieSearch(count);
}
function inputSearch() {
  localStorage.setItem(`QUERY`, refs.input.searchQuery.value);
  pageResetLoad = localStorage.setItem(`pageResetLoad`, `2`);
}

function movieSearch(page) {
  queryMovied(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=${
      langPageChoice.id
    }&query=${localStorage.getItem('QUERY')}&page=1&include_adult=false&page=${page}`,
  );
  typeRequest = false;
}

// *****  Рендер пагинации  *************

let pagesPogination = 0;
function renderPagination(pages) {
  pagesPogination = pages;
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
  <button id="btn01" class="${count === 1 ? 'activ-btn' : ''}" type="button">1</button>
 <button id="btn02" class="${count === 2 ? 'activ-btn' : ''}" type="button">${btn2}</button>
 <button id="btn03" class="${count === 3 ? 'activ-btn' : ''}" type="button">${btn3}</button>
 <button id="btn04" class="${
   (count === 4 && pages < 8) || (count >= 4 && count < pages - 2) ? 'activ-btn' : ''
 }" type="button">${btn4}</button>
 <button id="btn05" class="${
   (count === 5 && pages < 8) || (pages > 6 && count === pages - 2) ? 'activ-btn' : ''
 }" type="button">${btn5}</button>
 <button id="btn06" class="${
   (count === 6 && pages < 8) || (pages > 6 && count === pages - 1) ? 'activ-btn' : ''
 }" type="button">${btn6}</button>
 <button id="btn07" class="${count === pages ? 'activ-btn' : ''}" type="button">${btn7}</button>
 <button class="next-click" type="button">&rarr;</button>
 `;

  const nextClick = document.querySelector('.next-click');
  const prevClick = document.querySelector('.prev-click');
  prevClick.addEventListener('click', prevClickFu);
  nextClick.addEventListener('click', nextClickFu);

  const btn01 = document.querySelector('#btn01');
  btn01.addEventListener('click', function () {
    count = 0;
    nextClickFu();
  });

  const btn02 = document.querySelector('#btn02');
  btn02.addEventListener('click', function () {
    if (count > 10) {
      count = count - 11;
      nextClickFu();
    } else {
      count = 1;
      nextClickFu();
    }
  });

  const btn03 = document.querySelector('#btn03');
  btn03.addEventListener('click', function () {
    if (count < 4) {
      count = 3;
      nextClickFu();
    }
    prevClickFu();
  });
  const btn04 = document.querySelector('#btn04');
  if (count < 4) {
    btn04.addEventListener('click', function () {
      count = 3;
      nextClickFu();
    });
  } else if (count > pages - 6) {
    btn04.addEventListener('click', function () {
      count = pages - 4;
      btn7 = pages - 2;
      nextClickFu();
    });
  }

  const btn05 = document.querySelector('#btn05');
  btn05.addEventListener('click', function () {
    if (count < 5) {
      count = 4;
      nextClickFu();
      btn5 = 5;
      return;
    }
    if (count > 4 && count < pages - 3) {
      nextClickFu();
    } else {
      count = pages - 3;
      btn7 = pages - 2;
      nextClickFu();
    }
  });

  const btn06 = document.querySelector('#btn06');
  btn06.addEventListener('click', function () {
    if (pages > count + 10) {
      btn7 = count + 10;
      count = count + 9;
      nextClickFu();
    } else {
      count = pages - 2;
      btn7 = pages - 1;
      nextClickFu();
    }
  });

  const btn07 = document.querySelector('#btn07');
  btn07.addEventListener('click', function () {
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
    btn01.style.display = 'none';
  }
  if (pages < 2) {
    btn02.style.display = 'none';
  }
  if (pages < 3) {
    btn03.style.display = 'none';
  }
  if (pages < 4) {
    btn04.style.display = 'none';
  }
  if (pages < 5) {
    btn05.style.display = 'none';
  }
  if (pages < 6) {
    btn06.style.display = 'none';
  }
  if (pages < 7) {
    btn07.style.display = 'none';
    nextClick.style.display = 'none';
    prevClick.style.display = 'none';
  }
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
  if (typeRequest) {
    moviePopular(count);
  } else {
    movieSearch(count);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ***********************************
export { renderPagination, currentPage, count, homePage };
