import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Login from './components/login/Login';
import Blogs from './components/Blogs/Blogs';

import 'react-toastify/dist/ReactToastify.css';
import * as actions from './store/actions/index';
import { Switch, Route, Redirect } from 'react-router-dom';
import Users from './components/Users/Users';
import SingleUser from './components/Users/SingleUser';
import Navigation from './components/Navigation/Navigation';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [cookieFetch, setCookieFetch] = useState(false);

  useEffect(() => {
    const fetchCookie = async () => {
      await dispatch(actions.getCookieInfo());
      await setCookieFetch(true);
    };
    fetchCookie();
  }, [dispatch]);
  const logout = async () => {
    await dispatch(actions.logoutUserStart());
  };
  let route;
  console.log(user, token, cookieFetch);
  if (token && cookieFetch) {
    route = (
      <Switch>
        <Route path='/users/:id'>
          <SingleUser />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>

        <Route path='/' exact>
          <Blogs user={user} logout={logout} />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
  if (cookieFetch && (!token || !user)) {
    route = (
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Redirect to='/login' />
      </Switch>
    );
  }

  return (
    <div className='App'>
      <Navigation token={token} user={user} logout={logout} />
      {route}
    </div>
  );
}

export default App;
