function getSavedCities() {
  return JSON.parse(localStorage.getItem("savedCities"));
}

// Create a funtion to get the input city
function searchWeather() {
  var cityName = document.getElementById("cityInput").value;

  // get the saved cities out of localStorage
  var savedCities = getSavedCities();

  // if this is an array and city doesn't exist,
  // push the city into it
  var citiesIsArray = Array.isArray(savedCities);
  if (citiesIsArray && !savedCities.includes(cityName)) {
    savedCities.push(cityName);
  }
  // if it's not an array, make it one
  else if (!citiesIsArray) {
    savedCities = [cityName];
  }
  // save array into local storage
  localStorage.setItem("savedCities", JSON.stringify(savedCities));

  console.log("saved cities", savedCities);
  // get weather data for city
  getApi(cityName);
}

// Create a var to save cities to array
// CityInput();

// get previously saved cities
var savedCities = getSavedCities();

// NOT FINISHED

// loop over cities (if not null/empty)

// for each city, add a button

// set an event listener that will call getApi with cityname for buttons (event deligation)

// localStorage.setItem('getCityName', JSON.stringify("getCityName"));

// const savedCites = JSON.parse(localStorage.getItem('getCityName'));


// Create a fetch function
function getApi(city) {
  // fetch request gets a list of all the info from 5 day weather
  var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9af1117052965dda46ed1b8e5904d4a8&units=imperial`;

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //returns a response then needs to be converted to JSON
      console.log(data);

      // weather day one container with date, image icon, tempature, humidity and windspeed
      var day1HTML = ` <span class="cityname" id="cityName">City: ${city}</span>
    <span class="px-3" id="currentdate">${moment
      .unix(data.list[0].dt)
      .format("MM/DD/YY")}</span>
    <img class="imgClass"  src="https://openweathermap.org/img/wn/${
      data.list[0].weather[0].icon
    }@2x.png"></img>
    <p class="container1">Temperature:
      <span id="tempDay1">${data.list[0].main.temp}</span>
    </p>
    <p class="container1">Humidity:
      <span id="humidityDay1">${data.list[0].main.humidity}</span>
    </p>
    <p class="container1">Wind Speed:
      <span id="windSpeedDay1">${data.list[0].wind.speed}</span>
    </p>
    <br>`;
      document.getElementById("day1").innerHTML = day1HTML;

      // weather day 2-5 containers with date, image icon, tempature, humidity and windspeed
      let fourday = "";
      //loop over 4 containers
      for (let i = 8; i < 40; i = i + 8) {
        fourday += ` <div class=" weather col-2" >
      <span class="px-3" id="currentdate">${moment
        .unix(data.list[i].dt)
        .format("MM/DD/YY")}</span>
      <img class="imgClass" id="weatherIcon2" src="https://openweathermap.org/img/wn/${
        data.list[i].weather[0].icon
      }@2x.png"></img>
      <p class="container2">Temperature:
          <span id="tempDay2">${data.list[i].main.temp}</span>
        </p>
        <p class="container2">Humidity:
          <span id="humidityDay2">${data.list[i].main.humidity}</span>
        </p>
        <p class="container2">Wind Speed:
          <span id="windSpeedDay2">${data.list[i].wind.speed}</span>
        </p>
  </div>`;
      }
      document.getElementById("four-day").innerHTML = fourday;
    });
}

// var cityInput = document.getElementById('savedCites');
// savedCities.innerHTML ="getCityname";

document.getElementById("search-btn").addEventListener("click", searchWeather);
