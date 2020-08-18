import React from 'react';
import Input from './Input';

function Filter({ filterValue, setfilterValue }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Input
        type='text'
        value={filterValue}
        onChangeComp={setfilterValue}
        label='filter shown with'
      />{' '}
    </div>
  );
}

export default Filter;
