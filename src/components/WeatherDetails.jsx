import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export default function WeatherDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) {
  const weatherDataVertical = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Feels Like:",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "miles/hr"} `,
    },
  ];
  const weatherDataHorizontal = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}`,
    },
  ];
  return (
    <div className="">
      <div className="flex flex-row justify-center items-center ">
        <img src={icon} alt="icon " className="w-30" />
        <p className="text-7xl ">{`${temp.toFixed()}°`}</p>
      </div>
      <div className="flex items-center justify-center  py-2 text-xl ">
        <p>{details}</p>
      </div>

      <div className="flex items-center justify-center space-x-10 text-sm py-3">
        {weatherDataVertical.map(({ id, Icon, title, value }) => (
          <div
            key={id}
            className="flex font-light text-sm items-center justify-center"
          >
            <Icon size={18} className="mr-1" />
            {title} <span className="font-medium ml-1">{value}</span>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-center space-x-10 text-sm py-3">
          {weatherDataHorizontal.map(({ id, Icon, title, value }) => (
            <div key={id} className="flex items-center">
              <Icon size={30} />
              <p className="font-light ml-1">
                {" "}
                {title} <span className="font-medium ml-1">{value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
