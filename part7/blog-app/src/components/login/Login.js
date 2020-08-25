import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const loginHandler = async (e) => {
    e.preventDefault();

    await dispatch(actions.loginUser({ username, password }));
    console.log(error);
    if (error) {
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
