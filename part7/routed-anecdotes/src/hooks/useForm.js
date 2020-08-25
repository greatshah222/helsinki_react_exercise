import React, { useState } from 'react';

function useForm(type) {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onClear = (e) => {
    setValue('');
  };
  return {
    type,
    value,
    onChange,
    onClear,
  };
}

export default useForm;
