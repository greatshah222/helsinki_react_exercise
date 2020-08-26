import React from 'react';
import { Link } from 'react-router-dom';

function User({ user }) {
  if (!user) {
    return null;
  }
  return (
    <>
      {' '}
      <div>
        {' '}
        <Link to={`/users/${user._id}`}> {user.name}</Link> {user.blogs.length}
      </div>
      <div></div>
    </>
  );
}

export default User;
