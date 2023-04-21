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

  function getTodaysWeather(event) {
    if (event) {
        event.preventDefault();
      }
    const searchCity = document.getElementById('search').value;
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=e543b07a6edfe782636b4c5e7cece914&units=imperial`; 
    document.getElementById('search').value = '';

    function renderSearchCity() {
      let storedSearch = localStorage.setItem("storedSearch", JSON.stringify(searchCity));
      storedSearch = JSON.parse(localStorage.getItem('searchCity'));
      if (lastSearch != null) {
        document.getElementById('savedsearches').textContent = lastSearch;
      }
    }

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
            //var weatherIcon = document.createElement('img') 
            var weatherDescription = document.createElement('li');
            weatherDescription.textContent = titleCase(list.weather[0].description);
            todaysForecast.innerHTML = titleCase(`Todays Forecast for ${searchCity}`);
            todaysForecast.appendChild(weatherDescription);
            //addWeatherCondition(list.weather.icon); //add weather icon, breaks line 52
            addWeatherCondition("Real Feel", list.main.feels_like);
            addWeatherCondition("High", list.main.temp_max);
            addWeatherCondition("Low", list.main.temp_min);
            addWeatherCondition("Wind", list.wind.speed);
            addWeatherCondition("Humidity", list.main.humidity)
            getFiveDay(longitude, latitude);
            
            
        
        })
        renderSearchCity();    
}



function addWeatherCondition(weatherCondition, value){
  var condition = document.createElement('li');
  condition.textContent = titleCase(weatherCondition.replace("_", " "))+`: ${Math.round(value)}`;
  todaysForecast.appendChild(condition);

  /* function addWeatherIcon(weatherIcon, value){
    var icon = document.createElement('img');
    icon.innerHTML = ('')
    weatherIcon.appendChild(condition);
} */
}

forecastElements.forEach( function(cardNumber) {
  let cardId = `#card-${cardNumber}`;
  let cardBox = $(cardId);
  let forecastDate = $('.cardtitle', cardBox);
  console.log(cardNumber);
})



searchButton.addEventListener('click', getTodaysWeather);

function getFiveDay(longitude, latitude) {
    var weeksWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e543b07a6edfe782636b4c5e7cece914&units=imperial`;
    console.log(weeksWeather);
    fetch(weeksWeather)
        .then(function(response){
            return response.json();
        })
        .then(function (list){
            console.log(list);
            for (var i = 0; i < list.list.length; i+8) {
                //console.log(list.list);
                let actualTime = (list.list[i].dt_txt); //list.dt isnt pulling yet
                //console.log(actualTime)
                //let dayTemp = list.list[i].
                //var dateObject = new Date(unixTimestamp * 1000);
                //var formattedDate = dateObject.toLocaleDateString();
                //var day = formattedDate.document.createElement('h3');
                //console.log(formattedDate);
                var day = document.createElement('h3');
                day.textContent = actualTime;
                fiveDayForecast.appendChild(day); //displaying under cards in format that needs to change
                //fiveDayForecast.innerHTML = titleCase(`Forecast for: ${formattedDate}`);
                var createDailyForecast = document.createElement('li'); //stopped here
                /* let currentDate = new Date() maybe use this for dates and formatting
                   .getFullYear() 
                   .getMonth()
                   .getDate
                   .now*/
            }
        //addDailyForecast()
        })

function addDailyForecast(dailyWeather, value){
    var dailyForecast = document.createElement('li');
    dailyForecast.textContent = titleCase(dailyWeather.replace("_", " "))+`: ${Math.round(value)}`;
    fiveDayForecast.appendChild(dailyForecast);
}
}

// TO DO:
// get localstorage working and populating recent searches without reset on page load
