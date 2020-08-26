import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import User from './User';

function Users() {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      await dispatch(actions.fetchAllUserStart());
    };
    fetchdata();
  }, [dispatch]);

  console.log(users);

  return (
    <>
      <h3>User List</h3>

      {users && users.map((el) => <User user={el} key={el._id} />)}
    </>
  );
}

export default Users;
