import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [city, setCity] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [showWeather, setShowWeather] = useState(false);

  const API_KEY = 'bbfd3ed80db425131d30a01d78b3bfa3';

  useEffect(() => {
    if (city.trim() === '') return;

    const getWeather = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        const weatherData = weatherResponse.data;
        const forecastData = forecastResponse.data;

        if (weatherData.cod === 200 && forecastData.cod === '200') {
          setWeather(weatherData);
          const filteredForecast = forecastData.list.filter(item =>
            item.dt_txt.includes('12:00:00')
          );
          setForecast(filteredForecast.slice(0, 5));
          setShowWeather(true);
        } else {
          setWeather(null);
          setForecast([]);
          alert('City not found. Please try again.');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data.');
      }
    };

    getWeather();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim() === '') {
      alert('Please enter a city name');
      return;
    }
    setCity(inputCity);
  };

  return (
    <div className="container py-5">
      {!showWeather ? (
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h2 className="mb-4">Enter City to Get Weather</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter city"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-100">
                Show Weather
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <Weather current={weather} forecast={forecast} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
