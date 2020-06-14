import React, { useState } from 'react'
const Blog = ({ blog, updateVote, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' }

  const [btnName, setBtnName] = useState('View More');

  const toggleVisibility = () => {
    setVisible(!visible)

    if (btnName === 'View More'){
      setBtnName('View Less');
    } else {
      setBtnName('View More');
    }
  }

  const voteUp = () => {
    updateVote({
      id: blog.id,
      title: blog.title,
      author: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    });

  }
  return (
    <div>
      <hr />
      {blog.title}<button onClick={toggleVisibility}>{btnName}</button>
      <div style={showWhenVisible}>

        <table>
          <tbody>
            <tr>
              <td>URL:</td>
              <td>{blog.url}</td>
            </tr>
            <tr>
              <td>Likes:</td>
              <td>{blog.likes} | <button onClick={voteUp}>Like</button></td>
            </tr>
            <tr>
              <td>Author:</td>
              <td>{blog.author}</td>
            </tr>
            <tr>
              <td><button onClick={(() => {deleteBlog(blog.id)})}>Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )


}

export default Blog
