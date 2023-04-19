const searchButton = document.getElementById('searchbutton');
const searchCity = document.getElementById('search');
let todaysForecast = document.getElementById('todaysForecast');
let fiveDayForecast = document.getElementById('card-deck');

function getTodaysWeather() {
    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=e543b07a6edfe782636b4c5e7cece914'; //api isnt being called
    
    fetch(currentWeather)
        .then(function (response){
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var createWeatherToday = document.createElement('li');
                createWeatherToday.textContent = data[i].main;// can multiple objects be pulled before being appended?
                todaysForecast.appendChild(createWeatherToday);
            }
        })
}

searchButton.addEventListener('click', getTodaysWeather);//both today and five day functions need to be called on button click
console.log(getTodaysWeather);


function getFiveDay() {
    var weeksWeather = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=philadelphia&cnt=5&appid=e543b07a6edfe782636b4c5e7cece914';

    fetch(weeksWeather)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            for (var i = 0; i < data.length; i++) {
                //var createFiveDay = // stopped here, create ids for each row per card?
            }
        })
}

// TO DO: get user search input to append {CREATE NAME} in both urls
// get API call working
// get localstorage working and populating recent searches without reset on page load
