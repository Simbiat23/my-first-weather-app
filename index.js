function changeWeatherInfo(response) {
  let temperatureElement = document.querySelector("#current-temp-value");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city-input");
  cityElement.innerHTML = response.data.city;

  let tempDescription = document.querySelector("#weather-description");
  tempDescription.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let wind = document.querySelector("#wind-value");
  wind.innerHTML = `${response.data.wind.speed}km/h`;

  let currentDate = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  currentDate.innerHTML = formatDate(date);

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}" class="current-temp-emoji"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "t07aaefccae3394of62526e7dc0c0bad";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeatherInfo);
}

// function to change city using user input
function submitForm(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-input");

  searchCity(searchFormInput.value);
}
// creating Api key to get forecast
function getForecast(city) {
  let apiKey = "t07aaefccae3394of62526e7dc0c0bad";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

// creating a funtion to format the day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return day[date.getDay()];
}
// function to show forecast
function showForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (days, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-day">
            <div class="forecast-date">${formatDay(days.time)}</div>
            <div class="forecast-emoji"> <img src="${
              days.condition.icon_url
            }" class="forecast-emoji"/>
           </div>
            <div class="forecast-temperatures">
              <div class="forecast-temperature"><strong>${Math.round(
                days.temperature.maximum
              )}°</strong></div>
              <div class="forecast-temperature">${Math.round(
                days.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitForm);

searchCity("Lagos");
