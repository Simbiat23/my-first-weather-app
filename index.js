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
  currentDate.innerHTML = ``;

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}" class="current-temp-emoji"/>`;
}

function searchCity(city) {
  let apiKey = `t07aaefccae3394of62526e7dc0c0bad`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeatherInfo);
}

// fuction to change city using user input
function submitForm(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-input");

  searchCity(searchFormInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitForm);

searchCity("Lagos");
