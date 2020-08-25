import React from 'react';
import { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import * as actionsFiler from '../store/filter';

function Filter({ setFilterCondition }) {
  const dispatch = useDispatch();
  const [filterBy, setfilterBy] = useState('');
  const handleFilter = (e) => {
    setfilterBy(e.target.value);
    setFilterCondition(e.target.value);
  };
  return (
    <div style={{ marginBottom: '40px' }}>
      filter:
      <input type='text' onChange={handleFilter} value={filterBy} />
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setFilterCondition: (val) => dispatch(actionsFiler.filterCondition(val)),
  };
};

export default connect(null, mapDispatchToProps)(Filter);
