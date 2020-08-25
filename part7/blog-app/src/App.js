import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Login from './components/login/Login';
import Blogs from './components/Blogs/Blogs';

import 'react-toastify/dist/ReactToastify.css';
import * as actions from './store/actions/index';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [cookieFetch, setCookieFetch] = useState(false);

  useEffect(() => {
    dispatch(actions.getCookieInfo());
    setCookieFetch(true);
  }, [dispatch]);
  const logout = async () => {
    await dispatch(actions.logoutUserStart());
  };

  return (
    <div className='App'>
      {user && token && cookieFetch ? (
        <Blogs user={user} logout={logout} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
