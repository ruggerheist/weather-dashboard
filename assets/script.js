const searchButton = document.getElementById('searchbutton');
let todaysForecast = document.getElementById('todaysforecast');
let fiveDayForecast = document.getElementById('card-deck');


function getTodaysWeather(event) {
    event.preventDefault();
    const searchCity = document.getElementById('search').value;
    console.log(searchCity);
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=e543b07a6edfe782636b4c5e7cece914&units=imperial`; 
    
   fetch(currentWeather)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var longitude  = data.coord.lon;
            var latitude = data.coord.lat;
            console.log(longitude, latitude);
            for (var i = 0; i < data.weather.length; i++) { //delete for loop
                var weatherDescription = document.createElement('li');
                weatherDescription.textContent = data.weather[i].description;
                // create multiple li elements
                todaysForecast.innerHTML = "Todays Forecast";
                todaysForecast.appendChild(weatherDescription);
                var tempHigh = document.createElement('li');
                tempHigh.textContent = list.main[i].temp_min; //causing uncaught (in promise) error
                todaysForecast.appendChild(tempHigh);
            }
            getFiveDay(longitude, latitude);
        })
        
}

searchButton.addEventListener('click', getTodaysWeather);

function getFiveDay(longitude, latitude) {
    var weeksWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e543b07a6edfe782636b4c5e7cece914&units=imperial`;
    fetch(weeksWeather)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            //for (var i = 0; i < data.length; i++) {
                //var createFiveDay = // stopped here, create ids for each row per card?
            //}
        })
}

// TO DO:
// get localstorage working and populating recent searches without reset on page load
