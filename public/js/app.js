const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#msg-1");
const messageTwo = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  const weatherURL = "http://localhost:5000/weather?address=" + location;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(weatherURL).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = "Error: " + data.error;
      } else {
        messageOne.textContent = "Location: " + data.location;
        messageTwo.textContent = "Forecast: " + data.forecast;
      }
    });
  });
});
