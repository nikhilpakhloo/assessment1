import React, { useEffect, useState } from "react";
import TopCities from "./components/TopCities";
import SearchBar from "./components/SearchBar";
import TimeAndLocation from "./components/TimeAndLocation";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";


import { getFormattedData } from "./components/WeatherServices/WeatherServices";

export default function App() {
  const [query, setQuery] = useState({ q: "London" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const getWeather = async () => {
    await getFormattedData({ ...query, units }).then((data) => {
      setWeather(data);
    });
  };
  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formattedBg = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    4;
    const threshold = units === "metric" ? 20 : 68;
    if (weather.temp <= threshold) return "from-blue-400 to-blue-700";
    return "from-yellow-400 to-yellow-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-sm mt-4 py-5 px-4 bg-gradient-to-br ${formattedBg()} shadow-xl shadow-gray-400 rounded-xl `}
    >
      <TopCities setQuery={setQuery} />
      <SearchBar setQuery={setQuery} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <WeatherDetails weather={weather} units={units} />
          <Forecast title="Hourly forcast" data={weather.hourly} />
          <Forecast title="Daily forcast" data={weather.daily} />
        </>
      )}
    </div>
  );
}
