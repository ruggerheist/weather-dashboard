const searchButton = document.getElementById('searchbutton');
let todaysForecast = document.getElementById('todaysforecast');
let fiveDayForecast = document.getElementById('card-deck');
const forecastElements = [];



function titleCase(str) {
    var arrayOfWords = str.toLowerCase().split(' ');
    for (var i = 0; i < arrayOfWords.length; i++) {
      arrayOfWords[i] = arrayOfWords[i].charAt(0).toUpperCase() + arrayOfWords[i].slice(1); 
    }
    return arrayOfWords.join(' ');
  }

function addWeatherCondition(weatherCondition, value){
  var condition = document.createElement('li');
  condition.textContent = titleCase(weatherCondition.replace("_", " "))+`: ${Math.round(value)}`;
  todaysForecast.appendChild(condition);  
}

function addDailyForecast(dailyWeather,value){
  var dailyForecast = document.createElement('li');
  dailyForecast.textContent = titleCase(dailyWeather.replace("_", " "))+`: ${Math.round(value)}`;
  fiveDayForecast.appendChild(dailyForecast);
}

function getDate(offset){
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate()+ offset);
  let currentMonth = currentDate.getMonth() + 1;
  let dayOfMonth = currentDate.getDate();
  return `${currentMonth}/${dayOfMonth}`;
}
function createCard(icon, date, temp, wind, humidity) {
  // Create the card elements.
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const dateElement = document.createElement('h5');
  const imgElement = document.createElement('img');
  const listGroup = document.createElement('ul');
  const tempItem = document.createElement('li');
  const windItem = document.createElement('li');
  const humidityItem = document.createElement('li');

  card.className = 'card col-sm-12 col-md-6 col-lg-2 mx-2';
  cardBody.className = 'card-body';
  dateElement.className = 'card-title';
  dateElement.textContent = date;
  listGroup.className = 'list-group list-group-flush';
  tempItem.className = 'list-group-item';
  tempItem.textContent = `Temp: ${temp}`;
  windItem.className = 'list-group-item';
  windItem.textContent = `Wind: ${wind}`;
  humidityItem.className = 'list-group-item';
  humidityItem.textContent = `Humidity: ${humidity}`;

  imgElement.src = `https://openweathermap.org/img/w/${icon}.png`; // Set the src attribute to the URL of the weather icon
  imgElement.alt = 'Weather Icon'; // Set the alt attribute for accessibility


  listGroup.appendChild(tempItem);
  listGroup.appendChild(windItem);
  listGroup.appendChild(humidityItem);
  cardBody.appendChild(dateElement);
  cardBody.appendChild(imgElement);
  cardBody.appendChild(listGroup);
  card.appendChild(cardBody);
  console.log(card);
  return card;
}
function getFiveDay(longitude, latitude) {
  var weeksWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e543b07a6edfe782636b4c5e7cece914&units=imperial`;
  console.log(weeksWeather);
  fetch(weeksWeather)
      .then(function(response){
          return response.json();
      })
      .then(function (list){
          console.log(list.list.length);
          var counter = 1;             
          for (var i = 0; i < list.list.length; i+=8) {              
              var date = getDate(counter - 1);
              var temp = Math.round(list.list[i].main.temp);
              var humidity = Math.round(list.list[i].main.humidity);
              var wind = Math.round(list.list[i].wind.speed); 
              var icon = list.list[i].weather[0].icon;
              var cardDeck = document.getElementById('card-deck');
              var card = createCard(icon, date, temp, wind, humidity);                          
              cardDeck.appendChild(card);              
              counter++;            
          }

      //addDailyForecast()
      forecastElements.forEach( function(cardNumber) {
        let cardId = `#card${cardNumber}`;
        let cardBox = $(cardId);
        let forecastDate = $('.cardtitle', cardBox);
        console.log(cardNumber);
      })
      })
}

function renderSearchCity(searchCity) {
  var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
  fiveDayForecast.innerHTML = '';
  if (!savedCities.includes(titleCase(searchCity))){
    savedCities.push(titleCase(searchCity));
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
  }
  const savedSearchesSection = document.querySelector('#savedSearches');
  savedSearchesSection.innerHTML = '';
  savedCities.forEach(city => {
    const cityElement = document.createElement('button');
    cityElement.textContent = city;
    cityElement.classList.add('saved-search-btn');
    cityElement.dataset.city = city;
    savedSearchesSection.appendChild(cityElement);
    cityElement.addEventListener('click', (event) =>{
      const cityName = event.target.dataset.city;
      document.getElementById('search').value = cityName;
      getTodaysWeather(event);
    });
  });
}

function getTodaysWeather(event) {
  if (event) {
      event.preventDefault();
    }
  const searchCity = document.getElementById('search').value;
  var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=e543b07a6edfe782636b4c5e7cece914&units=imperial`; 
  console.log(currentWeather);
  document.getElementById('search').value = '';
  fetch(currentWeather)
  .then(function (response){
      if (!response.ok) {
          alert('City not found. Please try again.');
          document.getElementById('search').focus();
          throw new Error('City not found');
        }
      return response.json();
  })
  .then(function (list) {
      console.log(list);
      var longitude  = list.coord.lon;
      var latitude = list.coord.lat;
      //var iconElement = document.createElement('img');
      var header = document.querySelector('.cards-header');
      header.innerHTML = titleCase(`5 Day Forecast for ${searchCity}`);
      var iconElement = list.weather[0].icon;
      iconElement.src = `https://openweathermap.org/img/w/${iconElement}.png`; // Set the src attribute to the URL of the weather icon
      iconElement.alt = 'Weather Icon'; // Set the alt attribute for accessibility
      iconElement = document.createElement('img');
      todaysForecast.appendChild(iconElement);
      var weatherDescription = document.createElement('li');
      weatherDescription.textContent = titleCase(list.weather[0].description);
      todaysForecast.innerHTML = titleCase(`Todays Forecast for ${searchCity}`);
      todaysForecast.appendChild(weatherDescription);
      //addWeatherCondition(list.weather.icon); //add weather icon, breaks line 52
      addWeatherCondition(list.weather[0].icon);
      addWeatherCondition("Real Feel", list.main.feels_like);
      addWeatherCondition("High", list.main.temp_max);
      addWeatherCondition("Low", list.main.temp_min);
      addWeatherCondition("Wind", list.wind.speed);
      addWeatherCondition("Humidity", list.main.humidity);      
      getFiveDay(longitude, latitude);
      renderSearchCity(searchCity);  
  })      
}

searchButton.addEventListener('click', getTodaysWeather);

window.addEventListener('DOMContentLoaded', () => {
  const savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
  document.getElementById('search').value = 'Philadelphia';
  getTodaysWeather();
  savedCities.forEach(city => {
    renderSearchCity(city);
  });
});
