import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <NavLink exact to='/' style={padding}>
        anecdotes
      </NavLink>
      <NavLink exact to='/create' style={padding}>
        create new
      </NavLink>
      <NavLink exact to='/about' style={padding}>
        about
      </NavLink>
    </div>
  );
};

export default Menu;
