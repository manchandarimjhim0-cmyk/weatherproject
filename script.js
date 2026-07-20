const cityInput = document.getElementById("city");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const mapFrame = document.getElementById("mapFrame");
const weatherIcon = document.getElementById("weatherIcon");
const rainChance = document.getElementById("rainChance");

const feel = document.getElementById("feel");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const uv = document.getElementById("uv");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");


const forecastBox = document.getElementById("forecastBox");
const weekForecastContent = document.getElementById("weekForecastContent");

const API_KEY = "dd14fa5cbf6e436bba893612261707";

async function getWeather(city) {

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City Not Found");
        }

        const data = await response.json();

        console.log(data);

        /* Current Weather */

        cityName.innerText =
`${data.location.name}, ${data.location.region}`;
        mapFrame.src =
`https://www.google.com/maps?q=${data.location.name}&output=embed`;

        temperature.innerText =
            Math.round(data.current.temp_c) + "°C";

        rainChance.innerText =
            "Chance of rain: " +
            data.forecast.forecastday[0].day.daily_chance_of_rain + "%";

        feel.innerText =
            Math.round(data.current.feelslike_c) + "°C";

        wind.innerText =
            data.current.wind_kph + " km/h";

        humidity.innerText =
            data.current.humidity + "%";

        uv.innerText =
            data.current.uv;
        
        pressure.innerText =
data.current.pressure_mb + " mb";

visibility.innerText =
data.current.vis_km + " km";

sunrise.innerText =
data.forecast.forecastday[0].astro.sunrise;

sunset.innerText =
data.forecast.forecastday[0].astro.sunset;

        weatherIcon.innerHTML =
            `<img src="https:${data.current.condition.icon}"
             width="120">`;

        /* Today's Forecast */

        forecastBox.innerHTML = "";

        const hours = data.forecast.forecastday[0].hour;

        for (let i = 0; i < 6; i++) {

            let hour = hours[i];

            forecastBox.innerHTML += `
                <div class="hour-card">
                    <p>${hour.time.slice(-5)}</p>

                    <img src="https:${hour.condition.icon}" width="50">

                    <p>${Math.round(hour.temp_c)}°</p>
                </div>
            `;
        }

        /* 7 Day Forecast */

        weekForecastContent.innerHTML = "";

        data.forecast.forecastday.forEach(day => {

            const date = new Date(day.date);

            const weekday = date.toLocaleDateString(
                "en-US",
                { weekday: "short" }
            );

            weekForecastContent.innerHTML += `
                <div class="day-card">

                    <span>${weekday}</span>

                    <span>
                        <img src="https:${day.day.condition.icon}"
                             width="30">
                        ${day.day.condition.text}
                    </span>

                    <span>
                        ${Math.round(day.day.maxtemp_c)}°
                        /
                        ${Math.round(day.day.mintemp_c)}°
                    </span>

                </div>
            `;
        });

    }

    catch (error) {

        console.log(error);

        cityName.innerText = "City Not Found";
        temperature.innerText = "--°C";
        weatherIcon.innerHTML = "❌";

        rainChance.innerText = "No Data";

        feel.innerText = "--";
        wind.innerText = "--";
        humidity.innerText = "--";
        uv.innerText = "--";

        forecastBox.innerHTML = "";
        weekForecastContent.innerHTML = "";
    }
}

/* Search on Enter */

cityInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        const city = cityInput.value.trim();

        if (city !== "") {
            getWeather(city);
        }
    }
});

/* Default City */

getWeather("Delhi");