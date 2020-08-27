import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from './Queries/queries';
import BirthYear from './BirthYear';

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  console.log(authors);
  if (!props.show) {
    return null;
  }
  if (authors.loading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BirthYear authorname={authors.data.allAuthors} />
    </>
  );
};

export default Authors;
