const welcomeScreen = document.getElementById('welcome-screen');
const weatherScreen = document.getElementById('weather-screen');
const getStartBtn = document.getElementById('get-start-btn');
const getWeatherBtn = document.getElementById('get-weather-btn');
const cityInput = document.getElementById('city-input');
const loadingMsg = document.getElementById('loading');
const errorMsg = document.getElementById('error');
const weatherInfo = document.getElementById('weather-info');

getStartBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    weatherScreen.classList.remove('hidden');
});

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        displayWeather(city, data);
    } catch (err) {
        showError("Failed to fetch weather data.");
    }
}

function showLoading() {
    loadingMsg.classList.remove('hidden');
    errorMsg.classList.add('hidden');
    weatherInfo.classList.add('hidden');
}

function showError(msg) {
    loadingMsg.classList.add('hidden');
    errorMsg.innerText = msg;
    errorMsg.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}

function displayWeather(city, data) {
    loadingMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    document.getElementById('city-name').innerText = `Weather in ${city}`;
    document.getElementById('temp').innerText = `${data.current_condition[0].temp_C} °C`;
    document.getElementById('feels-like').innerText = `${data.current_condition[0].FeelsLikeC} °C`;
    document.getElementById('condition').innerText = data.current_condition[0].weatherDesc[0].value;
    document.getElementById('humidity').innerText = `${data.current_condition[0].humidity}% Humidity`;
    document.getElementById('wind').innerText = `${data.current_condition[0].windspeedKmph} km/h Wind`;

    weatherInfo.classList.remove('hidden');
}

getWeatherBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});
