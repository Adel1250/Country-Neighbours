'use strict';

const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className) {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${data.population}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
                <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
            </div>
        </article>
        `
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = function (name) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${name}`);
    request.send();
    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountry(data);
        const neighbours = data.borders;
        for (let i = 0; i < neighbours.length; i++) {
            if (!neighbours[i])
                return;
            const req = new XMLHttpRequest();
            req.open('GET', `https://restcountries.com/v3.1/alpha/${neighbours[i]}`);
            req.send();
            req.addEventListener('load', function () {
                const [data] = JSON.parse(req.responseText);
                console.log(data);
                renderCountry(data, "neighbour");
            });
        }
    });
}

const countryName = prompt("Enter the country's name")
getCountryAndNeighbour(countryName);
