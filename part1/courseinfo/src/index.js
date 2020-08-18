import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};
const Content = ({ parts }) => {
  return parts.map((el) => (
    <Part part={el.name} numberOfExercise={el.exercises} key={el.name} />
  ));
};

const Part = ({ part, numberOfExercise }) => {
  return (
    <p>
      {part}
      {numberOfExercise}
    </p>
  );
};
const Total = ({ parts }) => {
  const total = parts.map((el) => el.exercises).reduce((a, b) => a + b);
  return <p> Number of exercises {total}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React ',
      exercises: 10,
    },
    {
      name: 'Using props to pass data ',
      exercises: 7,
    },
    {
      name: 'State of a component ',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} /> <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
