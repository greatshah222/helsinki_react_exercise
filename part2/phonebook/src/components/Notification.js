import React from 'react';
import classes from './Notification.module.css';

function Notification({ message, color }) {
  if (!message) return null;
  return (
    <div className={classes.error} style={{ color: color }}>
      {message}
    </div>
  );
}

export default Notification;
