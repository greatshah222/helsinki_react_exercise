import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/anecdote';
import * as actionsNotification from '../store/notification';

function AnectodeContents({ setshowMessageNotification }) {
  // since we have only one object we are taking the whole state in the
  const anecdotes = useSelector((state) => state.anecdote);
  const filterValue = useSelector((state) => state.filterValue);

  const dispatch = useDispatch();

  const vote = (id, content) => {
    setshowMessageNotification(false);

    console.log(id);
    dispatch(actions.increaseVote(id));
    dispatch(
      actionsNotification.displayNotification(` you voted for ' ${content}'`)
    );
    setshowMessageNotification(true);
  };
  if (filterValue) {
    return (
      <div>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .filter((el) =>
            el.content.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>
                  vote
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnectodeContents;
