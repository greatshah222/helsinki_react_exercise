import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import Input from './components/Input';
import Persons from './components/Persons';
import Notification from './components/Notification';
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} from './services/Notes';

const App = () => {
  // const [persons, setPersons] = useState([]);
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);

  const [newName, setNewName] = useState('');
  const [newphoneNumber, setNewphoneNumber] = useState('');
  const [filterValue, setfilterValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllNotes();
      console.log(res.data);
      setPersons(res.data);
    };
    fetchData();
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: newName,
      phoneNumber: newphoneNumber,
    };

    if (persons.some((el) => el.name === newName)) {
      setMessage(null);
      const confirm = window.confirm(
        `${newName} is already addded to phonebook,DO you want to replace the old number with a new one`
      );
      if (confirm) {
        const singlePerson = persons.filter((el) => el.name === newName);
        console.log(singlePerson);
        const id = singlePerson[0].id;
        console.log(id);

        await updateNote(id, data);
        const res2 = await getAllNotes();

        await setPersons(res2.data);
        setMessage(`Changed number of ${newName} successfully`);
        setMessageColor('green');

        setNewName('');
        setNewphoneNumber('');
      }
    } else {
      const res = await createNote(data);
      console.log(res);
      const res2 = await getAllNotes();

      await setPersons(res2.data);
      setMessage(` Added ${newName} successfully`);
      setMessageColor('green');

      setNewName('');
      setNewphoneNumber('');
    }
  };
  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }
  // delete

  const personHandleDelete = async (id, name) => {
    console.log(id);
    const confirm = window.confirm(`Do you really want to Delete ${name} ?`);
    // confirm will give true or false , true if pressed ok
    if (confirm) {
      try {
        const res = await deleteNote(id);
        console.log(res);
        const newPersons = persons.filter((el) => el.id !== id);
        await setPersons(newPersons);
      } catch (error) {
        setMessageColor('red');
        setMessage(
          `Information of this person has already been removed from the server. Please refresh the page`
        );
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Notification message={message} color={messageColor} />
      <h2>Phonebook</h2>
      <Filter value={filterValue} setfilterValue={setfilterValue} />

      <form onSubmit={formHandler}>
        <div style={{ marginBottom: '20px' }}>
          <Input
            label='name'
            value={newName}
            onChangeComp={setNewName}
            type='text'
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Input
            label='phoneNumber'
            value={newphoneNumber}
            onChangeComp={setNewphoneNumber}
            type='number'
          />
        </div>

        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterValue={filterValue}
        personHandleDelete={personHandleDelete}
      />
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById('root'));
