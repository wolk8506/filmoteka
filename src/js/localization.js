import { refs } from './refs';
import { homePage } from './moviePopular';

const langPage = [
  {
    id: 'en-EN',
    home: 'HOME',
    my_library: 'MY LIBRARY',
    vote: 'Vote / Votes',
    popularity: 'Popularity',
    title: 'Original Title',
    genre: 'genre',
    trailer: 'Trailer',
    about: 'ABOUT',
    btn1: 'delete',
    btn2: 'ADD TO WATCHED',
    btn3: 'add to queue',
    btn4: 'WATCHED',
    btn5: 'QUEUE',
    search: 'Search movies...',
    noticeDelW: 'The movie has been removed from the WATCHED library',
    noticeAddW: 'The movie has been added to the WATCHED library',
    noticeInW: 'The film is in the library WATCHED',
    noticeDelQ: 'Movie removed from library QUEUE',
    noticeAddQ: 'Movie added to library QUEUE',
    noticeInQ: 'The film is in the library QUEUE',
  },
  {
    id: 'ru-RU',
    home: 'ГЛАВНАЯ',
    my_library: 'МОЯ БИБЛИОТЕКА',
    vote: 'Оценка / Голоса',
    popularity: 'Популярность',
    title: 'Оригинальное название',
    genre: 'Жанр',
    trailer: 'Трейлер',
    about: 'Описание',
    btn1: 'Удалить',
    btn2: 'В просмотренные',
    btn3: 'В очередь',
    btn4: 'ПРОСМОТРЕННЫЕ',
    btn5: 'ОЧЕРЕДЬ',
    search: 'Искать фильмы...',
    noticeDelW: 'Фильм удален из библиотеки ПРОСМОТРЕННЫЕ',
    noticeAddW: 'Фильм добавлен в библиотеку ПРОСМОТРЕННЫЕ',
    noticeInW: 'Фильм уже в библиотеке ПРОСМОТРЕННЫЕ',
    noticeDelQ: 'Фильм удален из библиотеки ОЧЕРЕДЬ',
    noticeAddQ: 'Фильм добавлен в библиотеку ОЧЕРЕДЬ',
    noticeInQ: 'Фильм уже в библиотеке ОЧЕРЕДЬ',
  },
  {
    id: 'uk-UA',
    home: 'ГОЛОВНА',
    my_library: 'МОЯ БІБЛІОТЕКА',
    vote: 'Оцінка / Голоси',
    popularity: 'Популярність',
    title: 'Оригінальна назва',
    genre: 'Жанр',
    trailer: 'Трейлер',
    about: 'Опис',
    btn1: 'Видалити',
    btn2: 'В ПРОГЛЯДНІ',
    btn3: 'В ЧЕРГУ',
    btn4: 'ПРОГЛЯДНІ',
    btn5: 'ЧЕРГА',
    search: 'Пошук фільмів...',
    noticeDelW: 'Фільм видалено з бібліотеки ПЕРЕГЛЯДНІ',
    noticeAddW: 'Фільм доданий до бібліотеки ПЕРЕГЛЯДНІ',
    noticeInW: 'Фільм вже у бібліотеці ПРОГЛЯДНІ',
    noticeDelQ: 'Фільм видалено з бібліотеки ЧЕРГА',
    noticeAddQ: 'Фільм доданий до бібліотеки ЧЕРГА',
    noticeInQ: 'Фільм вже у бібліотеці ЧЕРГА',
  },
];

export let langPageChoice = {
  id: 'en-EN',
  home: 'HOME',
  my_library: 'MY LIBRARY',
  vote: 'Vote / Votes',
  popularity: 'Popularity',
  title: 'Original Title',
  genre: 'genre',
  trailer: 'Trailer',
  about: 'ABOUT',
  btn1: 'delete',
  btn2: 'ADD TO WATCHED',
  btn3: 'add to queue',
  btn4: 'WATCHED',
  btn5: 'QUEUE',
  search: 'Search movies...',
  noticeDelW: 'The movie has been removed from the WATCHED library',
  noticeAddW: 'The movie has been added to the WATCHED library',
  noticeInW: 'The film is in the library WATCHED',
  noticeDelQ: 'Movie removed from library QUEUE',
  noticeAddQ: 'Movie added to library QUEUE',
  noticeInQ: 'The film is in the library QUEUE',
};

refs.btnLang.addEventListener('change', lang);

function lang() {
  langPageChoice = langPage[this.value];
  localStorage.setItem(`langDefault`, this.value);
  langSet();
}
langSetDefault();
function langSetDefault() {
  langPageChoice = langPage[Number(localStorage.getItem('langDefault'))];

  if (0 === Number(localStorage.getItem('langDefault'))) {
    refs.langEn.selected = 'selected';
  } else if (1 === Number(localStorage.getItem('langDefault'))) {
    refs.langRu.selected = 'selected';
  } else if (2 === Number(localStorage.getItem('langDefault'))) {
    refs.langUk.selected = 'selected';
  }

  refs.searchInput.placeholder = `${langPageChoice.search}`;
  refs.vote.innerHTML = `${langPageChoice.vote}`;
  refs.popularity.innerHTML = `${langPageChoice.popularity}`;
  refs.title.innerHTML = `${langPageChoice.title}`;
  refs.genre.innerHTML = `${langPageChoice.genre}`;
  refs.trailer.innerHTML = `${langPageChoice.trailer}`;
  refs.about.innerHTML = `${langPageChoice.about}`;
  // main
  refs.btnHome.innerHTML = `${langPageChoice.home}`;
  refs.btnLibrary.innerHTML = `${langPageChoice.my_library}`;
  // library
  refs.btnWathed.innerHTML = `${langPageChoice.btn4}`;
  refs.btnQueue.innerHTML = `${langPageChoice.btn5}`;
}

function langSet() {
  refs.searchInput.placeholder = `${langPageChoice.search}`;
  refs.vote.innerHTML = `${langPageChoice.vote}`;
  refs.popularity.innerHTML = `${langPageChoice.popularity}`;
  refs.title.innerHTML = `${langPageChoice.title}`;
  refs.genre.innerHTML = `${langPageChoice.genre}`;
  refs.trailer.innerHTML = `${langPageChoice.trailer}`;
  refs.about.innerHTML = `${langPageChoice.about}`;
  // main
  refs.btnHome.innerHTML = `${langPageChoice.home}`;
  refs.btnLibrary.innerHTML = `${langPageChoice.my_library}`;
  // library
  refs.btnWathed.innerHTML = `${langPageChoice.btn4}`;
  refs.btnQueue.innerHTML = `${langPageChoice.btn5}`;
  homePage();
}
