import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  // const [persons, setPersons] = useState([]);

  const [country, setcountry] = useState([]);
  const [searchInput, setsearchInput] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');

  const InputChangedHandler = async (e) => {
    try {
      setsearchInput(e.target.value);
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/name/${e.target.value}`
      );
      if (res.data.length === 1) {
        const params = {
          access_key: process.env.REACT_APP_WEATHER_API_KEY,
          query: res.data[0].capital,
        };
        const weatherRes = await axios.get(
          'http://api.weatherstack.com/current',
          {
            params,
          }
        );

        await console.log(weatherRes);

        setWeatherInfo(weatherRes.data);
      }
      setcountry(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const showCountryInfo = async (name) => {
    try {
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/name/${name}`
      );
      const params = {
        access_key: process.env.REACT_APP_WEATHER_API_KEY,
        query: res.data[0].capital,
      };
      const weatherRes = await axios.get(
        'http://api.weatherstack.com/current',
        {
          params,
        }
      );

      await console.log(weatherRes);
      console.log(res.data);
      console.log(res.data[0].capital);
      setWeatherInfo(weatherRes.data);

      setcountry(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(weatherInfo);
  console.log(country);
  return (
    <div>
      <h2>Search for countries</h2>
      <div>
        find countries :{' '}
        <input value={searchInput} onChange={InputChangedHandler} />
      </div>
      {country.length >= 10 ? (
        <p>Too many matches,specify another filter</p>
      ) : (
        <ul>
          {country.map((el) => (
            <li key={el.numericCode}>
              {el.name}{' '}
              <button onClick={() => showCountryInfo(el.name)}>Show</button>
            </li>
          ))}
        </ul>
      )}
      {country.length === 1 && (
        <>
          <h3>{country[0].name}</h3>
          <p>{country[0].capital}</p>
          <p>{country[0].population}</p>
          <ul>
            {country[0].languages.map((el) => (
              <li key={el.name}>{el.name}</li>
            ))}
          </ul>
          <img src={country[0].flag} alt='flag' height='100px' />
          <h3>Weather in {country[0].capital}</h3>
          <p>
            <strong>{weatherInfo.current.temperature} celsius</strong>
          </p>
          <p>
            <strong>wind:</strong> {weatherInfo.current.wind_degree} mps
            direction {weatherInfo.current.wind_dir}{' '}
          </p>
          <img src={weatherInfo.current.weather_icons[0]} alt='weather' />
        </>
      )}
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById('root'));
