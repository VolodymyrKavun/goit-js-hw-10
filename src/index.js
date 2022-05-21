import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import getRefs from './js/refs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const formValue = e.target.value.trim();

  fetchCountries(formValue)
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  refs.infoDivEl.innerHTML = markup;
}
