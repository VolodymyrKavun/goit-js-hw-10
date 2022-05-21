export function fetchCountries(name) {
  const URL = 'https://restcountries.com/v2/name/';

  return fetch(`${URL}${name}?fields=name,capital,population,flags,languages`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
