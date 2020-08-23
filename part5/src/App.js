import React, { useState, useEffect } from 'react';

import Login from './components/login/Login';
import Blogs from './components/Blogs/Blogs';
import {
  fetchTokenCookie,
  logoutBackend,
} from './components/Services/userService';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cookieFetch, setCookieFetch] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    let fetchToken;
    try {
      fetchToken = async () => {
        const res = await fetchTokenCookie();
        console.log(res);

        setToken(res.token);
        setUser(res.currentUser);
        setCookieFetch(true);
      };
    } catch (error) {
      console.log(error);
      setCookieFetch(true);
    }

    fetchToken();
  }, []);
  const logout = async () => {
    await logoutBackend();
    setToken(null);
    setUser(null);
  };

  return (
    <div className='App'>
      {user && token && cookieFetch ? (
        <Blogs user={user} logout={logout} />
      ) : (
        <Login setUser={setUser} setToken={setToken} />
      )}
    </div>
  );
}

export default App;
