import React from "react";

export default function TopCities({setQuery}) {
  const cities = [
    {
      id: 1,
      name: "Chandigarh",
    },
    {
      id: 2,
      name: "Himachal Pradesh",
    },
    {
      id: 3,
      name: "Delhi",
    },
    {
      id: 4,
      name: "London",
    },
    {
      id: 5,
      name: "Dehradun",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((item) => (
        <button
          key={item.id}
          className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in"
          onClick={()=>setQuery({q:item.name})}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
