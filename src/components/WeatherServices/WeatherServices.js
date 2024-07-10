// Importing DateTime from Luxon for date/time manipulation
import { DateTime } from "luxon";

// Retrieving environment variables for API key and base URL
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

// Function to fetch weather data from the API
const getWeatherData = (infoType, searchParams) => {
  // Constructing the URL for the API request
  const url = new URL(BASE_URL + infoType);
  // Setting query parameters including API key
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  // Fetching data from the constructed URL and parsing the response as JSON
  return fetch(url).then((res) => res.json());
};

// Function to construct icon URL based on icon code from weather data
const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

// Function to format Unix timestamp with offset to local time using Luxon
const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

// Function to format current weather data into a desired structure
const formatCurrentData = (data) => {
  // Destructuring necessary properties from weather data object
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

  // Destructuring weather details from the first entry in the 'weather' array
  const { main: details, icon } = weather[0];

  // Formatting local time using Luxon based on provided timestamp and timezone offset
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  // Returning formatted weather data object
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

// Function to format forecasted weather data into hourly and daily forecasts
const formatForecastWeather = (secs, offset, data) => {
  // Filtering data for hourly forecasts after current time
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrl(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5); // Taking the first 5 entries for hourly forecast

  // Filtering data for daily forecasts based on midnight timestamps
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrl(f.weather[0].icon),
      date: f.dt_txt,
    }));

  // Returning formatted forecasted weather data (hourly and daily)
  return { hourly, daily };
};

// Async function to get formatted weather data including current and forecasted weather
const getFormattedData = async (searchParams) => {
  // Fetching current weather data and formatting it
  const formattedWeatherData = await getWeatherData("weather", searchParams).then(
    formatCurrentData
  );

  // Destructuring necessary properties from formatted current weather data
  const { dt, lat, lon, timezone } = formattedWeatherData;

  // Fetching forecasted weather data based on latitude and longitude
  const formattedForecastedWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((data) => formatForecastWeather(dt, timezone, data.list));

  // Returning combined object containing formatted current and forecasted weather data
  return { ...formattedWeatherData, ...formattedForecastedWeather };
};

// Exporting the getFormattedData function as default
export default getFormattedData;
