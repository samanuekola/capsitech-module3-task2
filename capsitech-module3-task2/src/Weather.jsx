import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Weather({ current, forecast }) {
  if (!current || !forecast) return null;

  return (
    <div className="card p-4 weather-container">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="font-1 mb-0">{current.name}</h2>
        <span className="font-1 text-muted">{new Date().toLocaleDateString()}</span>
      </div>

      <div className="text-center my-4">
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          <h1 className="font-2 mb-0">{Math.round(current.main.temp)}°</h1>
          <div className="ps-4 mt-3 mt-md-0 text-start">
            <p className="font-1 font2-color mb-2">
              <i className="bi bi-wind me-2"></i>{current.wind.speed} m/s
            </p>
            <p className="font-1 font2-color mb-0">
              <i className="bi bi-moisture me-2"></i>{current.main.humidity}%
            </p>
          </div>
        </div>
        <h5 className="font-1 text-muted mt-4 text-capitalize">
          {current.weather[0].main} - {current.weather[0].description}
        </h5>
      </div>

      <h5 className="mb-3 font-1 text-muted text-center py-4">5-Day Forecast</h5>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {forecast.slice(0, 5).map((item, index) => (
          <div key={index} className="forecast-card shadow-sm">
            <div className="text-center">
              <p className="font-4 mb-1">
                {new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="mb-2"
                style={{ width: '50px', height: '50px' }}
              />
              <p className="font-3 mb-1">{Math.round(item.main.temp)}°</p>
              <p className="font2-color mb-0 small">{item.weather[0].main}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
