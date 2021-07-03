import './sass/main.scss';
import countryCard from './templates/country_cards.hbs';
//import countryTemplate from "./templates/country_list.hbs";
import getRefs from './js/get_refs';

import API from './js/fetchCountries';

const debounce = require('lodash.debounce');
 import { defaultModules } from '@pnotify/core';
 import { alert,  notice, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
 import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
     // defaultModules.set(PNotifyMobile, {});
     
    const myAlert = alert({
        text: 'Notice me, friend!'
      });
    
    // Automatically set the type.
    const myNotice = notice({
    text: "I'm a notice."
    });

    const myInfo = info({
    text: "I'm an info message."
    });

   
    

//----------initialisation refs---

const refs = getRefs();

//-----------добавляем слушатель----

refs.formRef.addEventListener('input', debounce(onSearch, 700));
refs.formRef.addEventListener('click', inputClickCleaner)

//-----------основная функция--------

function onSearch(e) {
    e.preventDefault();  //--- не обновляет страницу
   
    let country = e.target.value;  // ---- 
    console.log(country);
     
    API.fetchCountries(country)
        .then(renderCountryCard)
        .catch(onFetchError)
        //.finally(() => country.reset())

};
    
function renderCountryCard(country) { 
    let markup = countryCard(country);
    refs.countryEl.innerHTML = markup;
    const mySuccess = success({
    text: "I'm a success message."
    });

    
};

function onFetchError(error) {
    console.log(error);
    const myError = error({
    text: "I'm an error message."
});
}

function inputClickCleaner() {
    refs.formRef.value = '';
    refs.countryEl.innerHTML = '';
}