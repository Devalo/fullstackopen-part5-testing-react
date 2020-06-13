import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login';
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null);
  // This gets set from the Login component
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.userToken);
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null)
    blogService.setToken(null);
  }

  const addBlog = (e) => {
    e.preventDefault();
    try {
      const blogObj = {
        title: title,
        author: author,
        url: url
      }
      console.log(blogObj);

      blogService
        .create(blogObj)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog));
          setTitle('');
          setAuthor('');
          setUrl('');
      setNotification(`added ${title} by ${author}`)
      setTimeout(() => {
        setNotification(null);
      }, 5000)
        })
      } catch(exeption){
          setNotification(exeption)
          setTimeout(() => {
            setNotification(null);
          }, 5000)
      }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  }
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  }

  const blogForm = () => (
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

  if (user === null) {
    return (
      <div>
        <h2>Please log into the application</h2>
        <Notification message={notification} />
        <Login setUser={setUser}  setNotification={setNotification} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={notification} />
        <p>Logged in as {user.username}</p>
        <button onClick={handleLogout} >Log out</button>
        <hr />
        {blogForm()}

        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notice">
      {message}
    </div>
  )
}

export default App