import React, { useEffect, useState } from 'react';
import {
  TiWeatherDownpour,
  TiWeatherShower,
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherSunny,
  TiWeatherSnow,
  TiWeatherStormy,
} from 'react-icons/ti';
import { Data } from '../../types/Types';
import './Weather.css';
import spinner from '../../assets/spinnergen.svg';
export const Weather: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [url, setUrl] = useState('');
  const [noGeoLocation, setNoGeoLocation] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setNoGeoLocation(true);
      console.error('No data for weather error: ', error);
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
            <div className="icon-and-temp-container">
              <div className="weather-icon">
                {data.weather[0].main === 'Clear' ? <TiWeatherSunny /> : null}
                {data.weather[0].main === 'Rain' ? <TiWeatherDownpour /> : null}
                {data.weather[0].main === 'Drizzle' ? (
                  <TiWeatherShower />
                ) : null}
                {data.weather[0].main === 'Mist' ? <TiWeatherCloudy /> : null}
                {data.weather[0].main === 'Haze' ? <TiWeatherCloudy /> : null}
                {data.weather[0].main === 'Fog' ? <TiWeatherCloudy /> : null}
                {data.weather[0].main === 'Snow' ? <TiWeatherSnow /> : null}
                {data.weather[0].main === 'Thunderstorm' ? (
                  <TiWeatherStormy />
                ) : null}
                {data.weather[0].main === 'Clouds' ? (
                  <TiWeatherPartlySunny />
                ) : null}
              </div>
              <div className="temp">
                {data.main ? (
                  <p>{(data.main.temp - 273.15).toFixed()}°C</p>
                ) : null}
              </div>
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
      ) : noGeoLocation ? null : (
        <div className="weather-container">
          <img src={spinner} alt="" />
        </div>
      )}
    </div>
  );
};
