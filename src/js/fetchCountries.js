const BASE_URL = 'https://restcountries.eu/rest/v2/name'


function fetchCountries(someCountry) {
    return fetch(`${BASE_URL}/${someCountry}`)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('something wrong')
        })
    
   
};

export default { fetchCountries };


