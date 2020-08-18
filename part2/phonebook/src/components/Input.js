import React from 'react';

function Input({ value, onChangeComp, type, label }) {
  return (
    <>
      {' '}
      {label}:{' '}
      <input
        value={value}
        onChange={(e) => onChangeComp(e.target.value)}
        type={type}
      />
    </>
  );
}

export default Input;
