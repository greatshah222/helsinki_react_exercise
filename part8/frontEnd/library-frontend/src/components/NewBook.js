import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NEW_BOOK, ALL_AUTHORS } from './Queries/queries';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const NewBook = ({ show, updateCacheWith }) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [createNewBook] = useMutation(
    ADD_NEW_BOOK,
    // after the person is created we are refetching the queries
    {
      refetchQueries: [{ query: ALL_AUTHORS }],
      update: (store, response) => {
        updateCacheWith(response.data.addBook);
      },
      onError: (error) => {
        setErrorMessage(error.graphQLErrors[0].message);
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    try {
      setErrorMessage(null);
      event.preventDefault();

      console.log('add book...');
      await createNewBook({
        variables: { title, author, published, genres },
      });

      setTitle('');
      setPublished('');
      setAuhtor('');
      setGenres([]);
      setGenre('');
      toast.success('added new book');
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };
  return (
    <div>
      {errorMessage && toast.error(errorMessage)}
      <ToastContainer />
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value * 1)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default NewBook;
