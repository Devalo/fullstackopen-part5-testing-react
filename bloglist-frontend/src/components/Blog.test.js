import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

test('only renders title on default', () => {
  const blog = {
    title: 'This is title',
    author: 'Author Authorson',
    url: 'www.url.com'
  };

  const component = render(
    <Blog blog={blog} />
  );



  expect(component.container).toHaveTextContent(
    'This is title'
  )
});

test('rest of info is shown when button is clicked', () => {

  const blog = {
    title: 'This is title',
    author: 'Author Authorson',
    url: 'www.url.com'
  };

  const component = render(
    <Blog blog={blog} />
  );

  const button = component.getByText('View More');
  fireEvent.click(button)

  const url = component.getByText('www.url.com')
  const author = component.getByText('Author Authorson')
  const likes = component.getByText('Likes:')
  expect(url).toBeDefined()
  expect(author).toBeDefined()
  expect(likes).toBeDefined()
});

test('registers if like button has been clicked twice', () => {
  const blog = {
    title: 'This is title',
    author: 'Author Authorson',
    url: 'www.url.com'
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} updateVote={mockHandler} />
  );

  const button = component.container.querySelector('.likeBtn');

  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls).toHaveLength(2);
});