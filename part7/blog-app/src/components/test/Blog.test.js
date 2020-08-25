import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// fireEvent is for button handling event
import { render, fireEvent } from '@testing-library/react';
import Blog from '../Blogs/Blog';

import { prettyDOM } from '@testing-library/dom';
const blogs = [
  {
    blogInformation: {
      id: '5f3f51cf50f3102ed26a978c',
      author: 'matti',
      title: 'new title',
      url: 'https://bishalshah.ml/',
      likes: 0,
      user: {
        _id: '5f3f08e42be55a229a0d0a50',
      },
    },
    showDetail: true,
  },
];
const blog = {
  blogInformation: {
    id: 'fuiehrfiberube',
    author: 'test author',
    title: 'tes title',
    url: 'url.com',
    likes: 10,
    user: {
      _id: 'new_user',
    },
  },
  showDetail: false,
};
const blogWithDetail = {
  blogInformation: {
    id: '5f3f51cf50f3102ed26a978c',
    author: 'matti',
    title: 'new title',
    url: 'https://bishalshah.ml/',
    likes: 0,
    user: {
      _id: '5f3f08e42be55a229a0d0a50',
    },
  },
  showDetail: true,
};

const userID = {
  _id: '5f3f08e42be55a229a0d0a50',
};
// to run the test     CI=true npm test

test('exercise 5.13 only showing title of the blog by default ', () => {
  const component = render(<Blog blog={blog} blogs={blogs} userID={userID} />);
  // method 1
  expect(component.container).toHaveTextContent('tes title');

  // method2
  const element = component.getByText('tes title');
  expect(element).toBeDefined();
  // for printing the above component in the console
  //   component.debug();

  // we can also use to print in the console here in our case it prints the element which has the text fiuer
  //   console.log(prettyDOM(element));

  // method 3
  //   const div = component.container.querySelector('.blog');
  //   expect(div).toHaveTextContent('fiuer');
});

test('exercise 5.14 implies when the button (show details) is clicked it shows the remaining detail of the blog  ', () => {
  // here is how u define event handler in jest

  const setBlogs = jest.fn();
  // here since setBlogs is passed as setState function we are setting it as jest.fn()
  // in compoonent  the details is hidden
  const component = render(
    <Blog blog={blog} blogs={blogs} userID={userID} setBlogs={setBlogs} />
  );
  // in compoonent 1  the details is shown which means button hide details is visible and then we can click that button

  const component1 = render(
    <Blog
      blog={blogWithDetail}
      blogs={blogs}
      userID={userID}
      setBlogs={setBlogs}
    />
  );
  const button = component.getByText('Show Details');
  const hideDetailButton = component1.getByText('Hide Details');

  //   console.log(prettyDOM(button));
  //   component.debug();

  fireEvent.click(button);
  fireEvent.click(hideDetailButton);
  // we are also checking the event on setBlogs since it was passed as a function(props) in Blog
  expect(setBlogs.mock.calls).toHaveLength(2);
  //   expect(setBlogs.mock.calls).toHaveLength(1);
});

test('exercise 5.15 when like btn is presses twice   ', async (done) => {
  // here is how u define event handler in jest
  //
  try {
    const setBlogs = jest.fn();

    const component = render(
      <Blog
        blog={blogWithDetail}
        setBlogs={setBlogs}
        blogs={blogs}
        userID={userID}
      />
    );

    const button = component.getByText('Like');

    console.log(prettyDOM(button));
    component.debug();

    fireEvent.click(button);
    fireEvent.click(button);

    await expect(button).toBeDefined();
    await expect(setBlogs.mock.calls).toHaveLength(2);
    done();
  } catch (error) {
    done(error);
  }
});
//We can easily find out the coverage of our tests by running them with the command

// CI=true npm test -- --coverage
// A quite primitive HTML report will be generated to the coverage/lcov-report directory. The report will tell us i.e the lines of untested code in each component:
