import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

function SingleUser() {
  const id = useParams().id;
  const dispatch = useDispatch();
  console.log(id);
  const singleUser = useSelector((state) => state.auth.singleUser);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(actions.fetchSingleUserStart(id));
    };
    fetchData();
  }, [id, dispatch]);
  console.log(singleUser);
  if (singleUser) {
    return (
      <>
        {' '}
        <h1> Some of the Blogs by {singleUser.name}</h1>
        <ul>
          {singleUser.blogs.map((el) => (
            <li key={el.id}> {el.title}</li>
          ))}
        </ul>
      </>
    );
  } else {
    return null;
  }
}

export default SingleUser;
