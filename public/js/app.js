console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationMessage = document.querySelector(".location");
const forecastMessage = document.querySelector(".summary");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  
  // using relative url to allow it to use local host or heroku url depending on environment
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            locationMessage.textContent = data.error;
            locationMessage.style.color = "red";
            forecastMessage.textContent = "";
        } else {
            locationMessage.style.color = "black";  
            locationMessage.textContent = data.location;
            forecastMessage.textContent = data.forecast.summary;
        }
    });
  });
});
