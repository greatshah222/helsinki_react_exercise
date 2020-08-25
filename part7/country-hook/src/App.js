import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let fetchCountryData;
    // try-catch should be inside the function to get in to error
    fetchCountryData = async () => {
      try {
        setFetchError(null);
        const res = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true

        `);

        setCountry(res.data[0]);
        console.log(res);
      } catch (error) {
        console.log(error.response.data.message);
        setFetchError(error.response.data.message);
      }
    };

    if (name) {
      fetchCountryData();
    }
  }, [name]);

  return { country, fetchError };
};

const Country = ({ country, fetchError }) => {
  console.log(fetchError, country);
  if (!country && !fetchError) {
    return null;
  }

  if (fetchError && !country) {
    return <h2>not found...</h2>;
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const { country, fetchError } = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };
  return (
    <div>
      <h2>Enter Full Name of the country for the details</h2>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} fetchError={fetchError} />
    </div>
  );
};

export default App;
