function changeWeatherInfo(response) {
  let temperatureElement = document.querySelector("#current-temp-value");
  let cityElement = document.querySelector("#city-input");

  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
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
cityElement = response.data.city;
