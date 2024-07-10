import React from "react";

export default function Forecast({data, title}) {

  return (
    <div>
      <div className="flex item-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="flex items-center justify-between">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center">


            <p>{item.title}</p>
            <img src={item.icon} alt="icon" className="w-12 my-1" />
            <p className="font-medium">{`${item.temp.toFixed()}`}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
