import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Authors from './Authors';
import { ALL_BOOKS } from './Queries/queries';

const Books = (props) => {
  const books = useQuery(ALL_BOOKS);
  console.log(books);
  const [bookdataForFilter, setBookDataForfilter] = useState();
  const [filterBy, setFilterBy] = useState(null);

  useEffect(() => {
    if (books.data) {
      setBookDataForfilter(books.data.allBooks);
    }
  });
  if (!props.show) {
    return null;
  }
  console.log(bookdataForFilter);
  if (books.loading) {
    return <div>Loading...</div>;
  }
  const genres = bookdataForFilter
    .map((el) => el.genres)
    .reduce((a, b) => [...a, ...b]);
  const uniqueGenres = [...new Set(genres)];
  console.log(uniqueGenres);

  const handlegenre = (name) => {
    console.log(name);
    setFilterBy(name);
  };

  return (
    <div>
      <h2>books</h2>
      <h3>Select to filter by genre</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '40px',
          alignItems: 'centers',
        }}
      >
        {uniqueGenres.map((el) => (
          <div
            onClick={() => handlegenre(el)}
            style={{
              background: 'grey',
              padding: '10px 30px',
              color: 'white',
              textTransform: 'uppercase',
            }}
            key={el}
          >
            {el}
          </div>
        ))}
        <div
          style={{
            background: 'grey',
            padding: '10px 30px',
            color: 'white',
            textTransform: 'uppercase',
          }}
          onClick={() => setFilterBy(null)}
        >
          All
        </div>
      </div>

      {!filterBy ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allBooks
              .filter((el) => el.genres.includes(filterBy))
              .map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
