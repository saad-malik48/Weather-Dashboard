// API Configuration
const API_KEY = 'e06f13789cff4cc6b0b141a2242512a6'; // OpenWeatherMap API Key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const weatherContainer = document.getElementById('weatherContainer');
const welcomeMessage = document.getElementById('welcomeMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const forecastContainer = document.getElementById('forecastContainer');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
locationBtn.addEventListener('click', getLocationWeather);

// Welcome examples
document.querySelectorAll('.welcome-examples span').forEach(span => {
    span.addEventListener('click', (e) => {
        searchInput.value = e.target.textContent;
        handleSearch();
    });
});

// Main Functions
async function handleSearch() {
    const city = searchInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    await fetchWeatherData(city);
}

async function getLocationWeather() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading(true);
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
            showLoading(false);
            showError('Unable to access your location. ' + error.message);
        }
    );
}

async function fetchWeatherData(city) {
    showLoading(true);
    try {
        // Fetch current weather
        const weatherResponse = await fetch(
            `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error('City not found. Please try again.');
            } else {
                throw new Error('Failed to fetch weather data');
            }
        }

        const weatherData = await weatherResponse.json();

        // Fetch forecast data
        const forecastResponse = await fetch(
            `${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastResponse.json();

        // Fetch UV Index (using lat/lon from current weather)
        const uvResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/uvi?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`
        );
        const uvData = await uvResponse.json();

        displayWeather(weatherData, uvData);
        displayForecast(forecastData);
        showLoading(false);
        hideError();
    } catch (error) {
        showLoading(false);
        showError(error.message);
    }
}

async function fetchWeatherByCoordinates(lat, lon) {
    try {
        // Fetch current weather
        const weatherResponse = await fetch(
            `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const weatherData = await weatherResponse.json();

        // Fetch forecast data
        const forecastResponse = await fetch(
            `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastResponse.json();

        // Fetch UV Index
        const uvResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const uvData = await uvResponse.json();

        displayWeather(weatherData, uvData);
        displayForecast(forecastData);
        showLoading(false);
        hideError();
    } catch (error) {
        showLoading(false);
        showError('Failed to fetch weather data for your location');
    }
}

// Display Functions
function displayWeather(data, uvData) {
    // Update current weather
    const { main, weather, wind, clouds, visibility, sys } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('description').textContent = weather[0].description;
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(main.feels_like)}°C`;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('precipitation').textContent = data.rain ? `${data.rain['1h'] || 0} mm` : '0 mm';
    document.getElementById('uvIndex').textContent = uvData.value ? uvData.value.toFixed(1) : 'N/A';

    // Show weather container, hide welcome message
    weatherContainer.classList.remove('hidden');
    welcomeMessage.classList.add('hidden');
}

function displayForecast(data) {
    const forecastList = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
    forecastContainer.innerHTML = '';

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        const temp = Math.round(item.main.temp);
        const description = item.weather[0].main;

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="date">${dateString}</div>
            <img src="${iconUrl}" alt="${description}" class="icon">
            <div class="temp">${temp}°C</div>
            <div class="description">${description}</div>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

// Utility Functions
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    weatherContainer.classList.add('hidden');
    welcomeMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.remove('show');
}

// Initialize
window.addEventListener('load', () => {
    welcomeMessage.classList.remove('hidden');
});