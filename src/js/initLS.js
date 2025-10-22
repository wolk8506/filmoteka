let movieWatched = JSON.parse(localStorage.getItem('movieWatched'));
if (movieWatched === null) {
  localStorage.setItem('movieWatched', JSON.stringify([]));
}

let movieQueue = JSON.parse(localStorage.getItem('movieQueue'));
if (movieQueue === null) {
  localStorage.setItem('movieQueue', JSON.stringify([]));
}

let count = Number(localStorage.getItem('currentPage'));
if (count === 0) {
  localStorage.setItem(`currentPage`, `1`);
}

let pageResetLoad = Number(localStorage.getItem('pageResetLoad'));
if (pageResetLoad === 0) {
  localStorage.setItem(`pageResetLoad`, `1`);
}
