// Get all necessary elements from the DOM
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

// Default city when the page loads
let cityInput = "Balikpapan";

// Add cities event to each city in the panel
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    // change from default city to the clicked one
    cityInput = e.target.innerHTML;
    // Fuction that fetches and displays all the data from the Weather API
    fetchWeatherData();

    // Fade out the app
    app.style.opacity = "0";
  });
});

// Add Submit event to the form
form.addEventListener("submit", (e) => {
  // If the input field(search bar)
  // is empty, throw an alert
  if (search.value.length == 0) {
    alert("Please type a city name in search box");
  } else {
    // change from default city to the one written in the input field
    cityInput = search.value;
    //   console.log(cityInput);
    // Fuction that fetches and displays all the data from the Weather API
    fetchWeatherData();
    // Remove all text from the input field
    search.value = "";

    // Fade out the app
    app.style.opacity = "0";
  }

  // Prevents the default behaviour of the form
  e.preventDefault();
});

// Fuction that returns a day of the week
// (Monday, Tuesday, Friday...) from a date (12-03-2021)

function dayofTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

function monthOfTheYear(month) {
  const arr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return arr[new Date(`${month}`).getMonth()];
}

// Function that fetches and displays the data from the weather API
function fetchWeatherData() {
  // Fetch the data and dynamically add the city name with the template Literals

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=b0e6b9d7527f4e6d9a9101116230506&q=${cityInput}`
  )
    //Take the data (which is in JSON format) and convert it to a regular JS Object
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      // Get the date and time from the city and extract the day , month , year
      // and time into individual variables
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      // Reformat the data into something more appealing and add it to the page
      dateOutput.innerHTML = `${dayofTheWeek(
        d,
        monthOfTheYear(m),
        y
      )} ${d}/${m}/${y}`;

      timeOutput.innerHTML = time;
      // // Add the name of the city into the page

      nameOutput.innerHTML = data.location.name;

      // Get the corresponding icon url for the weather and extract a part of it
      const icondID = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );

      // Reformat the icon
      icon.src = "./Icons/" + icondID;

      // Add the weather details to the page
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      // set the default time of the day
      let timeOfDay = "day";
      // Get the unique id for each weather condition
      const code = data.current.condition.code;

      // change to night if its night time in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      if (code == 1000) {
        // set the background image to clear if the weather is clear
        app.style.backgroundImage = `url(./Images/${timeOfDay}/clear.jpg)`;

        // change the button bg color depending on if its day or night
        btn.style.background = "#fe7f2d";
        if (timeOfDay == "night") {
          btn.style.background = "#0353a4";
        }
      }

      // same thing for cloudy weather
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./Images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fe7f2d";
        if (timeOfDay == "night") {
          btn.style.background = "#6096ba";
        }
      }

      // Add rainy
      else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1284 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./Images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = `url(./Images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }

      // Fade in the page once all is done
      app.style.opacity = "1";
    })

    // if the user types a city that doesn't exit
    // throw an alert
    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
}

// call the function on page load
fetchWeatherData();
// fade in the page
app.style.opacity = "1";
