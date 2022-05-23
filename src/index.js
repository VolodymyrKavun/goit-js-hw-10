import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import getRefs from './js/refs';
import listCounries from './templates/country-list.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// Часовий ключ
const DEBOUNCE_DELAY = 300;

// Доступ до елементів
const refs = getRefs();

// Слухач
refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const formValue = e.target.value.trim();

  if (formValue === '') {
    clearCard();
    clearList();
    return;
  }

  fetchCountries(formValue)
    .then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (response.length >= 2 && response.length <= 10) {
        renderListCounries(response);
        clearCard();
      } else if (response.length === 1) {
        renderCountryCard(response);
        clearList();
      }
    })

    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
      clearCard();
      clearList();
    });
}

// Ф-я рендер розмітки картки
function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  refs.infoDivEl.innerHTML = markup;
}

// Ф-я рендер розмітки списку
function renderListCounries(elem) {
  const listMarkup = listCounries(elem);
  refs.listEl.innerHTML = listMarkup;
}

// Ф-я очистки картки
function clearCard() {
  return (refs.infoDivEl.innerHTML = '');
}

// Ф-я очистки списку
function clearList() {
  return (refs.listEl.innerHTML = '');
}
