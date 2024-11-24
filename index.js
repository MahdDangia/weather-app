const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '7f0962586e5abd81239b7d2fb1df7b91';



weatherForm.addEventListener('submit',async event =>{
event.preventDefault();

const city = cityInput.value;

if(city){
try{
const weatherData = await getWeatherdata(city);
displayWeatherInfo(weatherData);
}
catch(error){
    console.error(error);
    displayError(error);
}
}
else{
    displayError('Please enter a city');
}
});

async function getWeatherdata(city,){
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const response = await fetch(apiUrl);
 if(!response.ok){
    throw new Error('Could not fetch weather data');
 }

 return await response.json();
console.log(response)
}

function displayWeatherInfo(data){
    const {name: city, 
           main:{temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = '';
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1')
    const tempDisplay = document.createElement('p')
    const humidityDisplay = document.createElement('p')
    const descDisplay = document.createElement('p')
    const weatherEmoji = document.createElement('p')

    cityDisplay.textContent = city;
    cityDisplay.classList.add('cityDisplay')
    card.appendChild(cityDisplay);

    tempDisplay.classList.add('tempdDisplay')
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}ºC` ;
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity : ${humidity}%`;
    humidityDisplay.classList.add('humidityDisplay');
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add('descDisplay');
    card.appendChild(descDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add('weatherEmoji')
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(id){

    switch(true){
        case(id >= 200 && id < 300):
        return '⚡⚡';

        case(id >= 300 && id < 400):
        return '🌧';

        case(id >= 500 && id < 600):
        return '🌧';

        case(id >= 600 && id < 700):
        return '❄🌨';

        case(id >= 700 && id < 800):
        return '🌫🌫';

        case(id === 800):
        return '☀☀';

        case(id >= 801 && id < 810):
        return '☁☁';

        default:
            return '??'
    }
}

function getId(id){

}

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}
