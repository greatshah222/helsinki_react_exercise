import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const Button = (props) => {
  return (
    <button onClick={props.onClick} style={{ marginRight: '10px' }}>
      {props.children}
    </button>
  );
};

const Statistics = ({ text, value, secondvalue }) => {
  return (
    <tr>
      <th style={{ fontWeight: 300 }}>{text}</th>
      <th style={{ fontWeight: 300 }}>{value}</th>
      <th style={{ fontWeight: 300 }}>{secondvalue}</th>
    </tr>
  );
};
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let statContent = <p>No Feedback Given </p>;
  if (bad || neutral || good) {
    statContent = (
      <table>
        <tbody>
          <Statistics text='good' value={good} />
          <Statistics text='neutral' value={neutral} />
          <Statistics text='bad' value={bad} />
          <Statistics text='all' value={good + neutral + bad} />
          <Statistics text='average' value={good} />
          <Statistics
            text='positive'
            value={((good / (good + neutral + bad)) * 100).toFixed(0)}
            secondvalue={'%'}
          />
        </tbody>
      </table>
    );
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood((prevState) => prevState + 1)}>
        good
      </Button>
      <Button onClick={() => setNeutral((prevState) => prevState + 1)}>
        {' '}
        neutral
      </Button>
      <Button onClick={() => setBad((prevState) => prevState + 1)}>bad</Button>
      <h1>Statistics</h1>
      {statContent}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
