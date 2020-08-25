import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useForm from '../hooks/useForm';

const CreateNew = ({ setNotification, addNew, clearAlert }) => {
  // const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('');
  // const [info, setInfo] = useState('');

  // using custom hook
  const history = useHistory();

  const content = useForm('text');
  const author = useForm('text');
  const info = useForm('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    clearAlert();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    setNotification(`${content.value} added successfully`);

    history.push('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          {/* we can use spread operator cause we have same value there as well which means onChange is also onChange in our custom hooks */}
          {/* <input {...author} /> */}
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
      </form>
      <button
        onClick={() => {
          content.onClear();
          author.onClear();
          info.onClear();
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default CreateNew;
