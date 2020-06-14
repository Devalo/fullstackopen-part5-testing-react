import React, { useState } from 'react';


const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  }
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  }

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <form onSubmit={addBlog}>
      <label htmlFor="title">Title</label>
      <input value={title} onChange={handleTitleChange} name="title" />
      <br />
      <label htmlFor="author">Author</label>
      <input value={author} onChange={handleAuthorChange} name="author" />
      <br />
      <label htmlFor="url">Url</label>
      <input value={url} onChange={handleUrlChange} name="url" />
      <br />
      <button type="submit">Save</button>
    </form>
  )
}

export default BlogForm;