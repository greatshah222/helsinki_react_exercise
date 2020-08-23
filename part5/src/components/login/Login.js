import React from 'react';
import { useState } from 'react';
import { login } from '../Services/userService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setUser, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await login({
        username,
        password,
      });
      toast.success('error');

      setUser(res.doc);
      setToken(res.token);
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Log in to the application</h2>
      <form onSubmit={loginHandler}>
        <div>
          username{' '}
          <input
            // id are for testin gpurpose in cypress
            id='username'
            type='text'
            placeholder='input your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          {' '}
          password{' '}
          <input
            id='password'
            type='password'
            placeholder='input your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id='loginButton'>Log in </button>
      </form>
    </div>
  );
};

export default Login;
