const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const erro404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'fbdffeb369f9cbab29c07eaf86eaa3f8';
    const city = document.querySelector('.search-box input').value;

    
    if(city === '')
        return;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}').then(response => response.json())
    .then(json =>{


        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            erro404.style.display = 'block';
            erro404.classList.add('fadeIn');
            return;
        }

        erro404.style.display = 'none';
        erro404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.scr = 'images/clear.png';

            case 'Rain':
                image.scr = 'images/rain.png';

             case 'Snow':
                image.scr = 'images/snow.png'

            case 'Clouds':
                image.scr = 'images/clouds.png';

            case 'Haze':
                image.scr = 'images/haze.png';
                break;

            default:
                image.scr = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    });
    
});
