import { refs } from './refs';
import { homePage } from './moviePopular';

refs.btnHome.addEventListener('click', btnActivHeaderHome);
refs.btnLibrary.addEventListener('click', btnActivHeaderLibrsry);
refs.btnLogo.addEventListener('click', btnActivHeaderHome);

function btnActivHeaderHome() {
  if (refs.btnLibrary.classList.contains('nav__list-text--activ')) {
    refs.btnHome.classList.toggle('nav__list-text--activ');
    refs.btnLibrary.classList.toggle('nav__list-text--activ');
  }
  refs.refHeader.classList.add('header');
  refs.refHeader.classList.remove('header-library');
  refs.refSearchForm.style.display = 'flex';
  refs.refBtnGroup.style.display = 'none';
  refs.btnLang.style.display = 'block';
  homePage();
}

function btnActivHeaderLibrsry() {
  if (refs.btnHome.classList.contains('nav__list-text--activ')) {
    refs.btnHome.classList.toggle('nav__list-text--activ');
    refs.btnLibrary.classList.toggle('nav__list-text--activ');
  }
  refs.refHeader.classList.remove('header');
  refs.refHeader.classList.add('header-library');
  refs.refSearchForm.style.display = 'none';
  refs.refBtnGroup.style.display = 'flex';
  refs.btnLang.style.display = 'none';
}

// * проверка загружаемой страницы *
let pageResetLoad = Number(localStorage.getItem('pageResetLoad'));
if (pageResetLoad === null) {
  pageResetLoad.setItem('pageResetLoad', 1);
}

import startHP from './moviePopular';
import libraryPageActiv from './addMovied';

if (pageResetLoad === 1) {
  startHP();
} else if (pageResetLoad === 2) {
  startHP();
} else if (pageResetLoad === 3) {
  libraryPageActiv();
  btnActivHeaderLibrsry();
} else if (pageResetLoad === 4) {
  libraryPageActiv();
  btnActivHeaderLibrsry();
}
