import React, { useState } from 'react';
import Weather from './Weather';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const API_KEY = 'bbfd3ed80db425131d30a01d78b3bfa3';

  const getWeather = async () => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const weatherData = await weatherResponse.json();
      
      const forecastData = await forecastResponse.json();
      console.log(weatherData)
      console.log(forecastData)

      if (weatherData.cod === 200 && forecastData.cod === "200") {
        setWeather(weatherData);
        const filteredForecast = forecastData.list.filter(item =>
          item.dt_txt.includes("12:00:00")
        );
        setForecast(filteredForecast.slice(0, 5));
      } else {
        setWeather(null);
        setForecast([]);
        alert("City not found. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Weather App</h1>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={getWeather}>
          Search
        </button>
      </div>

      {weather && <Weather current={weather} forecast={forecast} />}
    </div>
  );
}

export default App;
