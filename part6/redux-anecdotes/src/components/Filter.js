import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actionsFiler from '../store/filter';

function Filter() {
  const dispatch = useDispatch();
  const [filterBy, setfilterBy] = useState('');
  const handleFilter = (e) => {
    setfilterBy(e.target.value);
    dispatch(actionsFiler.filterCondition(e.target.value));
  };
  return (
    <div style={{ marginBottom: '40px' }}>
      filter:
      <input type='text' onChange={handleFilter} value={filterBy} />
    </div>
  );
}

export default Filter;
