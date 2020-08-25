import React from 'react';
import { useParams } from 'react-router-dom';

function Anecdote({ anecdotes }) {
  const id = useParams().id;
  const singleItem = anecdotes.find((el) => el.id === id);
  if (singleItem) {
    return (
      <div>
        <h2>
          {singleItem.content} by {singleItem.author}
        </h2>
        <p> has {singleItem.votes} votes</p>
        <p>
          {' '}
          for more info see <a href={singleItem.info}>{singleItem.info}</a>{' '}
        </p>
      </div>
    );
  }
}

export default Anecdote;
