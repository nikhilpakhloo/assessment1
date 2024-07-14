import { formatToLocalTime } from "../Utils/Helpers";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

// Function to fetch weather data from API
const getWeatherData = (infoType, searchParams) => {
  // Constructing URL for the API endpoint based on infoType (weather or forecast)
  const url = new URL(BASE_URL + infoType);
  // Appending search parameters including API key to the URL
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  // Fetching data from the constructed URL and converting the response to JSON
  return fetch(url).then((res) => res.json());
};

// Function to generate URL for weather icon based on icon code
const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

// Function to format current weather data
const formatCurrentData = (data) => {
  // Destructuring necessary data from the API response
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  // Destructuring weather details like main weather description and icon code
  const { main: details, icon } = weather[0];

  // Formatting local time using a utility function
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  // Returning formatted current weather data
  return {
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrl(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

// Function to format forecasted weather data
const formatForecastWeather = (secs, offset, data) => {
  // Filtering and mapping hourly forecast data
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrl(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5); // Selecting first 5 hourly forecasts

  // Filtering and mapping daily forecast data
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrl(f.weather[0].icon),
      date: f.dt_txt,
    }));

  // Returning formatted hourly and daily forecast data
  return { hourly, daily };
};


// Async function to fetch and format weather data for display
const getFormattedData = async (searchParams) => {
  // Fetching current weather data and formatting it
  const formattedWeatherData = await getWeatherData("weather", searchParams).then(formatCurrentData);

  // Extracting necessary data for forecast request from formatted current weather data
  const { dt, lat, lon, timezone } = formattedWeatherData;

  // Fetching forecasted weather data and formatting it
  const formattedForecastedWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((data) => formatForecastWeather(dt, timezone, data.list));

  // Combining current and forecasted weather data into a single object
  return { ...formattedWeatherData, ...formattedForecastedWeather };
};

// Exporting the function to retrieve formatted weather data
export { getFormattedData };
