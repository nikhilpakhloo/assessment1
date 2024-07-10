import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

export default function SearchBar({ setQuery, setUnits }) {
  // State to manage the input field for city
  const [city, setCity] = useState("");

  // Function to handle city search
  const handleSearch = () => {
    // If city input is not empty, set the query with 'q' parameter
    if (city !== "") setQuery({ q: city });
    // Clear the city input after search
    setCity("");
  };

  // Function to handle Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Function to handle current location button click
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Set the query with 'lat' and 'lon' parameters for current location
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      {/* Search input field */}
      <div className="flex flex-row justify-center space-x-4 w-3/4 items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search by City..."
          className="text-gray-500 text-xl font-light py-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase rounded-full px-4 placeholder:text-gray-300"
        />
        {/* Search button */}
        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearch}
        />
        {/* Current location button */}
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      {/* Unit selection buttons */}
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>

        <p className="text-2xl font-medium mx-1">|</p>

        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}
