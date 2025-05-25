import React from 'react';

function Weather({ current, forecast }) {
  
  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">{current.name}</h3>
          <p className="card-text">Temperature: {current.main.temp} °C</p>
          <p className="card-text">Humidity: {current.main.humidity}%</p>
          <p className="card-text">Condition: {current.weather[0].description}</p>
          
        </div>
      </div>

      <h4 className="mb-3">5-Day Forecast</h4>
      <div className="row">
        {forecast.map((item, index) => (
          <div key={index} className="col-md-2 col-sm-4 col-6">
            <div className="card text-center mb-3">
              <div className="card-body">
                <h6>{new Date(item.dt_txt).toLocaleDateString()}</h6>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                />
                <p>{item.main.temp} °C</p>
                <p>{item.weather[0].main}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
