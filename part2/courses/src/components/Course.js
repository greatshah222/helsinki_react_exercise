import React from 'react';
const Header = ({ name }) => {
  return <h1>{name}</h1>;
};
const Content = ({ parts }) => {
  return parts.map((el) => (
    <Part part={el.name} numberOfExercise={el.exercises} key={el.id} />
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
  return (
    <p>
      {' '}
      <strong>Number of {total} exercises </strong>{' '}
    </p>
  );
};
function Course({ course }) {
  return course.map((el) => (
    <div key={el.id}>
      <Header name={el.name} />
      <Content parts={el.parts} />
      <Total parts={el.parts} />
    </div>
  ));
}

export default Course;
