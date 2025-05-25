import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Weather({ current, forecast }) {
  if (!current || !forecast) return null;

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between py-3 flex-wrap">
        <div className="font-1">{current.name}</div>
        <div className="font-1">{new Date().toLocaleDateString()}</div>
      </div>

      <div className="py-3 text-center">
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          <h1 className="font-2 text-center mb-0">{Math.round(current.main.temp)}°</h1>
          <div className="px-3 mt-3 mt-md-0">
            <p className="font2-color font-1 mb-1">
              <i className="bi bi-wind"></i> {current.wind.speed} m/s
            </p>
            <p className="font2-color font-1 mb-0">
              <i className="bi bi-moisture"></i> {current.main.humidity} %
            </p>
          </div>
        </div>
        <h4 className="text-center font2-color mt-3">
          {current.weather[0].main} - {current.weather[0].description}
        </h4>
      </div>

      <div className="d-flex justify-content-start flex-wrap gap-2">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="card p-3 rounded flex-grow-1"
            style={{ minWidth: '120px', maxWidth: '180px' }}
          >
            <p className="font-4 mb-2 text-center">
              {new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="d-block mx-auto"
              style={{ width: '40px', height: '40px' }}
            />
            <p className="font-3 font2-color text-center mb-1">{Math.round(item.main.temp)}°</p>
            <p className="font2-color text-center mb-0">{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
