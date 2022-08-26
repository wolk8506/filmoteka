import movieUpdadeRender from './addMovied';

const backdrop = document.querySelector('.backdrop');
const body = document.querySelector('body');
backdrop.addEventListener('click', onBackdropClick);

function onCloseModal() {
  window.removeEventListener('keydown', onEscBtnClick);
  backdrop.classList.add('is-hidden');
  body.style.overflow = 'visible';
  movieUpdadeRender();
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    backdrop.classList.add('is-hidden');
    body.style.overflow = 'visible';
    movieUpdadeRender();
  }
}

export default function onEscBtnClick(event) {
  if (event.code === 'Escape') {
    onCloseModal(event);
  }
  movieUpdadeRender();
}

///////////////////////////////////////////////////////////////////////////
// Закрытие модалки по Кнопке
function closeByButton() {
  const modalCloseBtn = document.querySelector('.modal-close-btn.close');
  body.style.overflow = 'visible';
  modalCloseBtn.addEventListener('click', onCloseModal);
}
