'use strict';

const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className) {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.official}</h3>
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

const renderError = function (err) {
    const html = `${err}</h3>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = async function (name) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (!response.ok) {
            throw new Error("Problem getting country!");
        }
        const data = await response.json();
        renderCountry(data[0]);
        const neighbours = data[0].borders;
        if (!neighbours) {
            throw new Error("You chose an Island!!");
        }
        for (let i = 0; i < neighbours.length; i++) {
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${neighbours[i]}`);
            const dt = await res.json();
            renderCountry(dt[0], "neighbour");
        }
    } catch (err) {
        renderError(`${err}`);
    }
}

const countryName = prompt("Enter the country's name")
getCountryAndNeighbour(countryName);
