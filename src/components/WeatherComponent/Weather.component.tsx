import React, { useState } from 'react';
import './Weather.css';

interface Data {
  base: string;
  clouds: clouds;
  cod: 200;
  coord: coord;
  dt: number;
  id: number;
  main: main;
  name: string;
  sys: sys;
  timezone: number;
  visibilitu: number;
  weather: weather;
  wind: wind;
}
interface clouds {
  all: number;
}
interface coord {
  lon: number;
  lat: number;
}
interface main {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_min: number;
  temp_max: number;
}
interface sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
interface weather {
  0: weather_breakdown;
}
interface weather_breakdown {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface wind {
  speed: number;
  deg: number;
}

export const Weather: React.FC = () => {
  const [data, setData] = useState<Data | null>();
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  async function searchLocation(event: { key: string }) {
    if (event.key === 'Enter') {
      try {
        const response = await fetch(url);
        const { ...data } = await response.json();
        setData(data);
        console.log(data, 'get weather data');
      } catch (error) {
        console.error(error);
      }
      setLocation('');
    }
  }

  return (
    <div className="weather-container">
      <div>
        <input
          placeholder="Enter Location"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
        />
      </div>
      {data ? (
        <div>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <p>{(data.main.temp - 273.15).toFixed()}°C</p> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div>
            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <p className="bold">
                      {(data.main.feels_like - 273.15).toFixed()}°C
                    </p>
                  ) : null}
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">
                      {(data.wind.speed * 1.60934).toFixed()} KPH
                    </p>
                  ) : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Select city</div>
      )}
    </div>
  );
};
