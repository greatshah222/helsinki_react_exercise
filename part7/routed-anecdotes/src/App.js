import React, { useState } from 'react';
import Menu from './component/Menu';
import AnecdoteList from './component/AnecdoteList';
import About from './component/About';
import CreateNew from './component/CreateNew';
import Footer from './component/Footer';
import { Switch, Route } from 'react-router-dom';
import Anecdote from './component/Anecdote';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState(null);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };
  let time;
  if (notification) {
    time = setTimeout(() => {
      setNotification(null);
    }, 10000);
  }
  const clearAlert = () => {
    clearTimeout(time);
  };
  const route = (
    <Switch>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/create'>
        <CreateNew
          addNew={addNew}
          setNotification={setNotification}
          clearAlert={clearAlert}
        />
      </Route>
      <Route path='/anecdote/:id'>
        <Anecdote anecdotes={anecdotes} />
      </Route>
      <Route path='/' exact>
        <AnecdoteList anecdotes={anecdotes} />
      </Route>
    </Switch>
  );
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && (
        <p style={{ border: '2px solid black', padding: '10px' }}>
          {notification}
        </p>
      )}
      {route}
      <Footer />
    </div>
  );
};

export default App;
