const defaultCities = [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar",
    "Gandhinagar", "Jamnagar", "Junagadh", "Anand", "Nadiad",
    "Palanpur", "Mehsana", "Patan", "Visnagar", "Siddhpur", "Unjha",
    "Bharuch", "Godhra", "Dahod", "Halol", "Karjan",
    "Navsari", "Valsad", "Vyara", "Bardoli", "Ankleshwar",
    "Bhuj", "Porbandar", "Morbi", "Wankaner", "Surendranagar",
    "Gondal", "Botad", "Amreli", "Veraval", "Jetpur", "Dwarka", "Mandvi",
    "Mundra", "Gandhidham", "Anjar", "Rapar", "Dahegam", "Modasa",
    "Chhota Udepur", "Lunawada", "Halvad", "Dhrangadhra", "Viramgam"
];

const apiKey = "256cf5d655564afd9d754314250103"; // Replace with your valid WeatherAPI key
const CACHE_TIME = 10 * 60 * 1000; // 10 minutes cache time

// Function to fetch weather data for a city
async function fetchWeatherData(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Weather data not found for ${city}`);

        const data = await response.json();

        return {
            city: data.location.name,
            temperature: `${data.current.temp_c}°C`,
            windSpeed: `${data.current.wind_kph} km/h`,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return { city, temperature: "N/A", windSpeed: "N/A", condition: "N/A", icon: "" };
    }
}

// Function to cache data in local storage
function saveCache(key, data) {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}

// Function to load data from cache
function loadCache(key) {
    const cached = localStorage.getItem(key);
    if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TIME) {
            return parsed.data;
        }
    }
    return null;
}

// Function to update Gujarat cities' weather
async function updateWeather(forceUpdate = false) {
    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.innerHTML = "<p class='text-center text-white'>Loading...</p>";

    let weatherData = loadCache("gujarat_weather");

    if (!weatherData || forceUpdate) {
        weatherData = await Promise.all(defaultCities.map(city => fetchWeatherData(city)));
        saveCache("gujarat_weather", weatherData);
    }

    weatherContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            ${weatherData.map(data => `
                <div class="bg-gray-900 text-white p-6 rounded-xl shadow-md flex flex-col items-center space-y-4 border border-gray-700">
                    <h3 class="text-2xl font-bold">${data.city}</h3>
                    ${data.icon ? `<img src="https:${data.icon}" alt="${data.condition}" class="w-16 h-16">` : ""}
                    <p class="text-lg">🌡 Temperature: <span class="font-semibold text-yellow-400">${data.temperature}</span></p>
                    <p class="text-lg">💨 Wind: <span class="font-semibold text-blue-400">${data.windSpeed}</span></p>
                    <p class="text-lg">🌤 Condition: <span class="font-semibold text-green-300">${data.condition}</span></p>
                </div>
            `).join("")}
        </div>
    `;
}

// Function to fetch weather for user-input city
async function searchCityWeather() {
    const cityInput = document.getElementById("city-input").value.trim();
    if (!cityInput) return alert("Please enter a valid city name.");

    const searchWeather = await fetchWeatherData(cityInput);
    document.getElementById("search-result").innerHTML = `
        <div class="bg-blue-800 text-white p-6 rounded-xl shadow-md flex flex-col items-center space-y-4 border border-blue-500">
            <h3 class="text-2xl font-bold">${searchWeather.city}</h3>
            ${searchWeather.icon ? `<img src="https:${searchWeather.icon}" alt="${searchWeather.condition}" class="w-16 h-16">` : ""}
            <p class="text-lg">🌡 Temperature: <span class="font-semibold">${searchWeather.temperature}</span></p>
            <p class="text-lg">💨 Wind: <span class="font-semibold">${searchWeather.windSpeed}</span></p>
            <p class="text-lg">🌤 Condition: <span class="font-semibold">${searchWeather.condition}</span></p>
        </div>
    `;
}

// Manual refresh button
const refreshBtn = document.getElementById("refresh-btn");
if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
        updateWeather(true);
    });
}

// Load weather on page load
updateWeather();
