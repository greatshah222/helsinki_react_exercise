import React from 'react';

function Persons({ persons, filterValue, personHandleDelete }) {
  return persons.length > 0 && !filterValue
    ? persons.map((el) => (
        <p key={el.name}>
          {el.name} : {el.phoneNumber}
          <button
            style={{ marginLeft: '20px' }}
            onClick={() => personHandleDelete(el.id, el.name)}
          >
            delete
          </button>
        </p>
      ))
    : persons
        .filter((el) =>
          el.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((el) => (
          <p key={el.name}>
            {el.name} : {el.phoneNumber}
          </p>
        ));
}

export default Persons;
