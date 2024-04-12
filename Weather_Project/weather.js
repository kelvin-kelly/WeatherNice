// The Weather Functionality

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "76d2f7700063a103c006e6c7026bd624";

weatherForm.addEventListener("submit",async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayInformation(weatherData);
        }
        catch (error) {
            console.error("error");
            displayError("error");
        }
    }
    else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    // fetch data
    
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    // to check if status ok = 200 it is working else if the status is 404 there is an error
    // console.log(response);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    else {
        // object in a json file
        return await response.json();
    }
}

function displayInformation(data) {
    // object destructuring
   const {name: city,
    // destructuring main
          main: {temp, humidity},
    // array of object with array destructuring followed by object destructuring
          weather: [{description, id}]} = data; 

    card.textContent = "";
    card.style.display = "flex" ;

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

// changing  text content  

    cityDisplay.textContent = city;
    // temp in degree celsius and rounding it to a 1 decimal place
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°c`; 
    humidityDisplay.textContent = `Humidity : ${humidity}%`;
    descriptionDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

// accessing their styling in css with ClassList

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descriptionDisplay.classList.add("descriptionDisplay");
    tempDisplay.classList.add("tempDisplay");
    weatherEmoji.classList.add("weatherEmoji");

// appending the child 

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(weatherEmoji);

}


function getWeatherEmoji(weatherId) {
    switch(true){

        case (weatherId >= 200 && weatherId < 300):
           return "⛈️";

        case (weatherId >= 300 && weatherId < 400):
            return "☔";
        
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";

        case (weatherId >= 700 && weatherId < 800):
            return "☁️";

        case (weatherId === 800):
            return "🌤️";

        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
// for an unknown weather phenomenon
        default :
             return "😕❓"; 
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");


    card.textContent = "";
    card.style.display = "flex";
    card.appendChild("errorDisplay");
}