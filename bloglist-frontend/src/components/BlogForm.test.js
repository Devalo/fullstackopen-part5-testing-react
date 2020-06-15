import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm';

test('should call the eventhandler with right details', () => {

  const createBlog = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} />
  );

  component.debug();

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'New Blog'}
  });
  fireEvent.change(author, {
    target: { value: 'Author Authorson'}
  });
  fireEvent.change(url, {
    target: { value: 'www.url.com'}
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls[0][0].title).toBe('New Blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Author Authorson')
  expect(createBlog.mock.calls[0][0].url).toBe('www.url.com')



});