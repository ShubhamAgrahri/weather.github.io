// http://openweathermap.org/img/wn/10d@2x.png

// weather": [
//   {
//       "id": 500,
//       "main": "Rain",
//       "description": "light rain",
//       "icon": "10n"
//   }
// ],

let searchInputElement = document.querySelector("#cityName");
let showButton = document.querySelector("#showBtn");
let leftImg = document.querySelector("#leftImg");
let rightImg = document.querySelector("#rightImg");
let CelsiusElement = document.querySelector("#tempCel");
let FahrenheitElement = document.querySelector("#tempF");
let symbol = document.querySelector("#unit");
let cloudType = document.querySelector(".cloudType");

showButton.addEventListener("click", function (event) {
  // if(event.key === "Enter" ){
  if (searchInputElement.value) {
    const city = searchInputElement.value;
    const unit = "metric";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=0b25f9734119e3a47ba726c25c5b04f1&units=" +
      unit;

    fetch(url, { mode: "cors" })
      .then(function (response) {
        // console.log(response.json())
        return response.json();
      })
      .then(function (response) {
        let celcius = response.main.temp;
        let fahrenheit = convertTofahrenhit(celcius);
        let cloud = response.weather[0].main;
        let cloudIcon = response.weather[0].icon;
        console.log(cloudIcon, celcius, fahrenheit, cloud);
        setWeather(cloudIcon, celcius, fahrenheit, cloud);
      })
      .catch((err) => {
        alert("Invalid city name");
        console.log(err);
      });
  } else {
    alert("Enter City name");
  }
  // }
});


searchInputElement.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();



    // Trigger the button element with a click
    document.getElementById("showBtn").click();
  }
});
function convertTofahrenhit(celsius) {
  return (celsius * (9 / 5) + 32).toFixed(2);
}

function setWeather(cloudIcon, celcius, fahrenheit, cloud) {
  leftImg.src = `http://openweathermap.org/img/wn/${cloudIcon}@4x.png`;
  rightImg.src = `http://openweathermap.org/img/wn/${cloudIcon}@4x.png`;
  cloudType.textContent = cloud;
  CelsiusElement.innerHTML = celcius + "&#8451" + " &nbsp | &nbsp ";
  FahrenheitElement.innerHTML = +fahrenheit + " &#8457";
}
