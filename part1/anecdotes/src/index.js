import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);

  const nextAnectodeHandler = () => {
    const value = Math.floor(Math.random() * 5) + 1;
    setSelected(value);
  };
  const voteHandler = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  const largestVote = votes.indexOf(Math.max(...votes));
  console.log(largestVote);
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <h1>Anecdote of the day</h1>

        {props.anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
      </div>

      <div>
        {' '}
        <button onClick={voteHandler}>vote</button>
        <button onClick={nextAnectodeHandler}>next anecdote</button>
      </div>
      <div style={{ marginTop: '50px' }}>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[largestVote]}
        <p>has {votes[largestVote]} votes</p>
      </div>
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
