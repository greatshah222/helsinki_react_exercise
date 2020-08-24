import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as action from '../store/anecdote';
import * as actionsNotification from '../store/notification';
import { createSingleAnecdoteBackend } from '../services/blogs';

function AnecdoteForm({ setshowMessageNotification }) {
  const [content, setcontent] = useState('');
  const dispatch = useDispatch();

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setshowMessageNotification(false);

    await dispatch(action.getCreateNoteInfoFromServer(content));
    dispatch(
      actionsNotification.displayNotification(
        ` ' ${content}' added successfully`
      )
    );

    setshowMessageNotification(true);
    setcontent('');
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={sumbitHandler}>
        <div>
          <input
            type='text'
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
