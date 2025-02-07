function submitForm(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-input");
  let city = document.querySelector("#city-input");
  city.innerHTML = searchFormInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitForm);
