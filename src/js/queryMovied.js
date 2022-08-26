import axios from 'axios';
import { Spinner } from 'spin.js';
import opts from './spinner';
import { renderPagination } from './moviePopular';
import render from './renderMovied';
import { currentPage } from './moviePopular';
import { count } from './moviePopular';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var target = document.querySelector('body');
var spinner = new Spinner(opts);

export default function queryMovied(url) {
  spinner.spin(target);
  return axios.get(url).then(response => {
    renderPagination(response.data.total_pages);
    render(response.data.results);
    currentPage(count);
    spinner.stop();
    notification(response.data.results.length);
  });
}

function notification(data) {
  if (data === 0) {
    Notify.failure('Search result not successful. Enter the correct movie name');
  }
}
