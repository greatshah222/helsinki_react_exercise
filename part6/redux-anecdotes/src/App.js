import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnectodeContents from './components/AnectodeContents';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  const [showMessageNotification, setshowMessageNotification] = useState(false);
  const notification = useSelector((state) => state.notification);
  let timeout;

  if (showMessageNotification) {
    timeout = setTimeout(() => {
      setshowMessageNotification(false);
    }, 5000);
  }
  const clearTimeOutALert = () => {
    clearTimeout(timeout);
  };
  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {showMessageNotification && <Notification message={notification} />}

      <AnectodeContents
        setshowMessageNotification={setshowMessageNotification}
        clearTimeOutALert={clearTimeOutALert}
      />
      <AnecdoteForm
        setshowMessageNotification={setshowMessageNotification}
        clearTimeOutALert={clearTimeOutALert}
      />
    </>
  );
};

export default App;
