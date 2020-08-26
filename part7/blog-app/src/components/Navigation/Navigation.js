import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import profile from '../../assets/download.png';

function Navigation({ token, logout, user }) {
  return (
    <div className={classes.Navigation}>
      {token && (
        <NavLink activeClassName={classes.active} to='/' exact>
          Blog
        </NavLink>
      )}
      {token && (
        <NavLink activeClassName={classes.active} to='/users' exact>
          Users
        </NavLink>
      )}
      {!token && (
        <NavLink activeClassName={classes.active} to='/login' exact>
          Login
        </NavLink>
      )}
      {token && user && (
        <NavLink activeClassName={classes.active} to='/f' exact>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {user.name}{' '}
            <img
              src={profile}
              alt=''
              height='30px'
              style={{ borderRadius: '50%', marginLeft: '10px' }}
            />
          </div>
        </NavLink>
      )}
      {token && (
        <NavLink
          activeClassName={classes.active}
          to='/logout'
          exact
          onClick={logout}
        >
          Logout
        </NavLink>
      )}{' '}
    </div>
  );
}

export default Navigation;
