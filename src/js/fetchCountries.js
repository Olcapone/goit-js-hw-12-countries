const BASE_URL = 'https://restcountries.eu/rest/v2/name'


function fetchCountries(someCountry) {
    return fetch(`${BASE_URL}/${someCountry}`)
        .then(response => {

            return response.json();
        })
   
};

export default { fetchCountries };


