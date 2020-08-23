import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import Blogs from '../Blogs/Blogs';
import BlogForm from '../Blogs/BlogForm';

const user = {
  _id: '5f3f08e42be55a229a0d0a50',
  name: 'bishal',
};
const blogs = [];

test('should ', () => {
  const toggleFormHandler = jest.fn();
  const setShowForm = jest.fn();
  const setBlogs = jest.fn();
  const component = render(
    <BlogForm
      blogs={blogs}
      toggleFormHandler={toggleFormHandler}
      setBlogs={setBlogs}
      setShowForm={setShowForm}
    />
  );

  const title = component.container.querySelector('.title');
  const author = component.container.querySelector('.author');
  const url = component.container.querySelector('.url');
  const form = component.container.querySelector('.form');
  fireEvent.change(title, {
    target: {
      value: 'testing title of react component',
    },
  });
  fireEvent.change(author, {
    target: {
      value: 'testing title of react component',
    },
  });
  fireEvent.change(url, {
    target: {
      value: 'testing title of react component',
    },
  });
  fireEvent.submit(form);
  expect(form).toBeDefined();
});
