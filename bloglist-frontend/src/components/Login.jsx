import React, {useState} from 'react';
import loginService from '../services/logins';
import blogService from '../services/blogs';

import PropTypes from "prop-types";

const Login = ({setUser, setNotification} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.userToken);

      setUser(user);
      setUsername('');
      setPassword('');


    } catch(exeption) {
      console.log(exeption)
      setNotification("Wrong username or password")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username 
          <input type="text" id="username" name="username" value={username}
                onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          Password  
          <input type="password" id="password" name="password" value={password}
                onChange={({target}) => setPassword(target.value)} />
        </div>
        <div>
          <button type="submit" id="loginBtn">Login</button>
        </div>
      </form>

    </>
  )
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login;