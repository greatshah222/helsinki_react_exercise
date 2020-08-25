import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import * as actions from '../store/anecdote';
import * as actionsNotification from '../store/notification';
import { useEffect } from 'react';
import { getAll } from '../services/blogs';

function AnectodeContents({
  setshowMessageNotification,
  clearTimeOutALert,
  anecdotes,
  filterValue,
  fetchBlogPost,
  displayNotify,
  updateBlogPost,
}) {
  // since we have only one object we are taking the whole state in the
  // const anecdotes = useSelector((state) => state.anecdote);
  // const filterValue = useSelector((state) => state.filterValue);

  // const dispatch = useDispatch();
  // console.log(anecdotes);
  useEffect(() => {
    let fetchBlog;
    fetchBlog = async () => {
      await fetchBlogPost();
    };
    fetchBlog();
  }, []);

  const vote = async (id, content) => {
    clearTimeOutALert();
    setshowMessageNotification(false);

    console.log(id);
    await updateBlogPost(id);

    await displayNotify(` you voted for ' ${content}'`);
    setshowMessageNotification(true);
  };
  console.log(anecdotes);

  if (filterValue && anecdotes) {
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
  if (anecdotes) {
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
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote,
    filterValue: state.filterValue,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogPost: () => dispatch(actions.fetchBlogPostFromServer()),
    updateBlogPost: (id) => dispatch(actions.updateNoteInfoToServer(id)),
    displayNotify: (content) =>
      dispatch(
        actionsNotification.displayNotification(` you voted for ' ${content}'`)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnectodeContents);
