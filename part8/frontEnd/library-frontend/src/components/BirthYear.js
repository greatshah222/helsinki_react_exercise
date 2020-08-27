import React, { useState } from 'react';
import {
  UPDATE_AUTHOR_DETAILS,
  ALL_AUTHORS,
  ALL_BOOKS,
} from './Queries/queries.js';
import { useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BirthYear({ authorname }) {
  const [name, setName] = useState('');
  const [setBornTo, setsetBornTo] = useState('');
  const [updateAuthor] = useMutation(UPDATE_AUTHOR_DETAILS, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });
  const formSumbithandler = async (e) => {
    e.preventDefault();
    const d = await updateAuthor({
      variables: {
        name,
        setBornTo,
      },
    });
    console.log(d);
    setName('');
    setsetBornTo('');
    toast.success('Changed birth date');
  };
  return (
    <div>
      <ToastContainer />
      <h1>Set birth year</h1>
      <form onSubmit={formSumbithandler}>
        <div>
          Select your Author
          <select
            type='number'
            placeholder='Select your Auhtor'
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value='' />

            {authorname.map((el) => (
              <option key={el.name} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Birth date
          <input
            type='number'
            placeholder='enter your birth year '
            value={setBornTo}
            onChange={({ target }) => setsetBornTo(target.value * 1)}
          />
        </div>

        <button>Change Birth Year</button>
      </form>
    </div>
  );
}

export default BirthYear;
