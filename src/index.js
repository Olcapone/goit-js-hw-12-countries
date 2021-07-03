import './sass/main.scss';
import countryCard from './templates/country_cards.hbs';
import countryTemplate from "./templates/country_list.hbs";
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
    
    // // Automatically set the type.
    // const myNotice = notice({
    // text: "I'm a notice."
    // });

//----------initialisation refs---

const refs = getRefs();

//-----------добавляем слушатель----

refs.formRef.addEventListener('input', debounce(onSearch, 500));
refs.formRef.addEventListener('click', inputClickCleaner)

//-----------основная функция--------

function onSearch(e) {
    e.preventDefault();  //--- не обновляет страницу
   
    let country = e.target.value;  // ---- введенное значение
     
    API.fetchCountries(country)
        .then(renderCountryCard)
        .catch(onFetchError)
        //.finally(() => country.reset())

};

//--- рисуем карточки
    
function renderCountryCard(country) {
    console.log(country.length);

    if (country.length > 10) {
        const myInfo = info({
        text: "Too many matches found. Please enter a more specific query!"
    });
    }

    //--- рисуем список

    else if ((country.length > 2 && country.length < 10)) {
        let markCountryUp = countryTemplate(country);
        refs.countryList.innerHTML = markCountryUp;
    }
        
    else{

    let markup = countryCard(country);
    refs.countryEl.innerHTML = markup;
    const mySuccess = success({
    text: "I'm a success message."
    });

    }
};

//----- упс ошибка

function onFetchError(error) {
    console.log(error);
    const myError = error({
    text: "I'm an error message."
});
}

//------ очистка

function inputClickCleaner() {
    refs.formRef.value = '';
    refs.countryEl.innerHTML = '';
}