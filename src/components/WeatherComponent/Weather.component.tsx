import React, { useEffect, useState } from 'react';
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
  const [data, setData] = useState<Data | null>(null);
  const [url, setUrl] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error, 'no data error');
    }
  };

  useEffect(() => {
    const getLocationPromise = new Promise<{
      latitude: number;
      longitude: number;
    }>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          resolve({ latitude: lat, longitude: long });
        });
      } else {
        reject("your browser doesn't support geolocation API");
      }
    });
    getLocationPromise
      .then(location => {
        const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=bdc27bcefe054e17fc40f6db933fb96c`;
        setUrl(url2);
      })
      .catch(err => {
        console.error(err, 'location promise error');
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div className="weather-container">
      {data ? (
        <div>
          <div className="weather-top">
            <div className="temp">
              {data.main ? (
                <p>{(data.main.temp - 273.15).toFixed()}°C</p>
              ) : null}
            </div>
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
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
        <div></div>
      )}
    </div>
  );
};
