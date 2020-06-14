import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login';
import blogService from './services/blogs';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null);
  // This gets set from the Login component
  const [user, setUser] = useState(null);

  const blogFromRef = React.createRef();


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort(function(a, b){
        return b.likes - a.likes;
      }))
    })  
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

  const addBlog = (blogObj) => {
    blogService
      .create(blogObj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
      });
  }

  const updateVote = (blogObj) => {
    blogService 
      .update(blogObj.id, blogObj)
      .then(changedBlog => {
        setBlogs(blogs.map(blog => blog.id !== blogObj.id ? blog : changedBlog));
      });
  }

  const deleteBlog = (id) => {
    const result = window.confirm('Are you sure?');

    if (result) {
      blogService 
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        });
    }
  }


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

        <Togglable buttonLabel="New blog" ref={blogFromRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        {blogs.map(blog => 
          <>
          <Blog key={blog.id} blog={blog} updateVote={updateVote} deleteBlog={deleteBlog} />
          </>
          
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