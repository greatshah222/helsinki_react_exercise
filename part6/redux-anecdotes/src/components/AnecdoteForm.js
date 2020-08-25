import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as action from '../store/anecdote';
import * as actionsNotification from '../store/notification';

function AnecdoteForm({
  setshowMessageNotification,
  displayNotify,
  fetchData,
}) {
  const [content, setcontent] = useState('');

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setshowMessageNotification(false);

    await fetchData(content);
    await displayNotify(` ' ${content}' added successfully`);

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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (content) =>
      dispatch(action.getCreateNoteInfoFromServer(content)),
    displayNotify: (content) =>
      dispatch(
        actionsNotification.displayNotification(
          ` ' ${content}' added successfully`
        )
      ),
  };
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
