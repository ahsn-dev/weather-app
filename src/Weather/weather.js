// import Routes from "../routes";

const weatherForm = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const logoutBtn = document.querySelector("#logoutBtn");
const apiKey = "66a60ba27d985d7d428029f9c9622763";
let isLoading = false;
let cities = [];

// Load the cities from local storage
const savedCities = localStorage.getItem("cities");
if (savedCities) {
  cities = JSON.parse(savedCities);
  // Display the saved cities on the page
  cities.forEach((city) => {
    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
      <h2 class="city-name" data-name="${city.name},${city.country}">
        <span>${city.name}</span>
        <sup>${city.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(city.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="${city.icon}" alt="${city.description}">
        <figcaption>${city.description}</figcaption>
      </figure>
    `;
    li.innerHTML = markup;
    list.appendChild(li);
  });
}

// Save the cities to local storage
const saveCitiesToLocalStorage = () => {
  localStorage.setItem("cities", JSON.stringify(cities));
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (isLoading) {
    return;
  }
  isLoading = true;
  document.querySelector(".loading").style.display = "block";

  let inputVal = input.value;

  //check if there's already a city
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      }`;
      weatherForm.reset();
      input.focus();
      return;
    }
  }

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);

      // Save the city to local storage
      const cityData = {
        name: name,
        country: sys.country,
        temp: main.temp,
        icon: icon,
        description: weather[0].description,
      };
      cities.push(cityData);
      localStorage.setItem("cities", JSON.stringify(cities));

      document.querySelector(".loading").style.display = "none";
      isLoading = false;
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
      document.querySelector(".loading").style.display = "none";
      isLoading = false;
    });

  msg.textContent = "";
  weatherForm.reset();
  input.focus();
});

// logoutBtn.addEventListener("click", () => {
//   console.log("test");
//   history.pushState(null, null, "/login");
//   Routes();
// });
