import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faTemperatureHalf,
  faDroplet,
  faWind,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import heroBg from "./assets/hero-bg.jpg";
import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    console.log("[getWeather] city =", city);
    if (!city.trim()) return;

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`,
    );

    const data = await response.json();
    console.log("[getWeather] response data =", data);

    try {
      if (data.error) {
        console.error("[getWeather] API error =", data.error);
        alert("there is been some error");
        setWeather(null);
      } else {
        setWeather(data);
        setCountry(data.location.country);
        setState(data.location.region);
      }
    } catch (error) {
      console.error(`[getWeather] problem = ${error}`);
      alert("Weather fetch failed. Check console for details.");
    }
  };

  return (
    <>
      <div
        className="App min-h-screen"
        id="app"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="Header pt-10 sm:text-left">
          <h1 className="font-medium text-center text-2xl md:text-3xl text-white">
            <span>
              <FontAwesomeIcon icon={faCloudSun} className="mr-2" />
            </span>
            SkyVista ⭐
          </h1>
          <p className="text-center text-xl font-normal text-white mt-2">
            Live weather, beautifully delivered.
          </p>
        </div>

        <div className="form flex justify-center mt-4 md:mt-6">
          <div action="">
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl px-4">
              <input
                type="text"
                placeholder="Search city..."
                className="w-full p-3 bg-white/15
backdrop-blur-md
border-white/20
text-white
placeholder:text-gray-300
rounded-full
px-6 auto-focus sm:text-left"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && getWeather()}
              />

              <button
                className="bg-gradient-to-r from-blue-600 via-violet-500 to-pink-500
text-white
px-6
py-3
rounded-full
font-semibold
shadow-lg
hover:scale-105
transition-all
duration-300"
                onClick={getWeather}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-4 md:mt-10 w-auto">
          <div
            className="result-section bg-white/15
backdrop-blur-xl
border
border-white/20 max-w-5xl
w-full
mx-6 flex flex-col justify-center rounded-2xl shadow-lg p-2 md:p-4 m-2 md:m-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 " id="results">
              <div className="p-2 md:p-6 text-center md:text-left ">
                <p className="text-4xl semibold">{city}</p>
                <p className="text-sm">
                  {state}, {country}
                </p>
                <p
                  className="text-6xl
font-bold
tracking-tight"
                >
                  {weather?.current?.temp_c ?? ""}°C
                </p>
                <p
                  className="text-lg
text-gray-200
uppercase
tracking-wide"
                >
                  {weather?.current?.condition?.text ?? ""}
                </p>
              </div>
              <div className="flex justify-center items-center p-4">
                <img
                  src={weather?.current?.condition?.icon}
                  alt="Weather image"
                  className="w-16 h-16 md:w-32 md:h-32 drop-shadow-xl"
                />
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-2 shadow-lg  m-4"
              id="lessImpResults"
            >
              <div
                className="bg-white/10
backdrop-blur-lg
border
border-white/10 rounded-lg p-2 md:p-4 flex flex-col items-center text-center hover:scale-105
hover:bg-white/20
transition
duration-300"
              >
                <p className="text-sm pt-0 ps-0 p-4">
                  <span>
                    <FontAwesomeIcon
                      icon={faTemperatureHalf}
                      className="text-xl text-orange-400"
                    />
                  </span>
                  Feels like
                </p>
                <p className="text-xl font-bold m-2 ps-4">
                  {weather?.current?.feelslike_c ?? ""}°C
                </p>
              </div>

              <div
                className="bg-white/10
backdrop-blur-lg
border
border-white/10 rounded-lg p-2 md:p-4 flex flex-col items-center text-center hover:scale-105
hover:bg-white/20
transition
duration-300"
              >
                <p className="text-sm pt-0 ps-0 p-4">
                  <span>
                    <FontAwesomeIcon
                      icon={faDroplet}
                      className="text-xl text-cyan-400"
                    />
                  </span>
                  Humidity
                </p>
                <p className="text-xl font-bold m-2 ps-4">
                  {weather?.current?.humidity ?? ""}%
                </p>
              </div>

              <div
                className="bg-white/10
backdrop-blur-lg
border
border-white/10 rounded-lg p-2 md:p-4 flex flex-col items-center text-center hover:scale-105
hover:bg-white/20
transition
duration-300"
              >
                <p className="text-sm pt-0 ps-0 p-4">
                  <span>
                    <FontAwesomeIcon
                      icon={faWind}
                      className="text-xl text-yellow-400"
                    />
                  </span>
                  Wind
                </p>
                <p className="text-xl font-bold m-2 ps-4">
                  {weather?.current?.wind_kph ?? ""} km/h
                </p>
              </div>

              <div
                className="bg-white/10
backdrop-blur-lg
border
border-white/10 rounded-lg p-2 md:p-4 flex flex-col items-center text-center hover:scale-105
hover:bg-white/20
transition
duration-300"
              >
                <p className="text-sm pt-0 ps-0 p-4">
                  <span>
                    <FontAwesomeIcon
                      icon={faGaugeHigh}
                      className="text-xl text-purple-400"
                    />
                  </span>
                  Pressure
                </p>
                <p className="text-xl font-bold m-2 ps-4">
                  {weather?.current?.pressure_mb ?? ""} mb
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
