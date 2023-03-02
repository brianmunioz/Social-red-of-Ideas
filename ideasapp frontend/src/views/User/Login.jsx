import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

export default () => <Login></Login>

const Login = () => {
  const token = document.cookie.replace('token=', '');
  const navigate = useNavigate();
  const {REACT_APP_API_URL} = process.env;
  if (token) {
    navigate('/');
  }
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!user) {
      setError('Please complete username field!');
      setTimeout(() => {
        setError('');
      }, 3000)
      return;
    }
    if (!pass) {
      setError('Please complete password field!');
      setTimeout(() => {
        setError('');
      }, 3000)
      return;
    }

    axios.post(REACT_APP_API_URL+'auth/signin', {
      username: user,
      password: pass
    })
      .then(response => {
        document.cookie = `token=${response.data.token}; max-age=${60 * 300}; path=/; samesite=strict`;
        localStorage.setItem('user', JSON.stringify(response.data.user._id));
        setError("");
window.location = '/myaccount'
      })
      .catch(() => {
        setError('Please try again later');
        setTimeout(() => {
          setError("");
        }, 3000)
      });
  }


  return (
    <Container>
      <div className="login">
        <h2 className="login-header  fw-bold">Log in</h2>
        <form className="login-container shadow" onSubmit={handleSubmit} >
          <input className='mb-3' type="text" name="username" value={user} onChange={(e) => setUser(e.target.value)} placeholder="user" />
          <input className='mb-3' type="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
          <input type="submit" value="Log in" className='border-0' />
        </form>
        {error && <Alert className='mt-3' variant='danger'>{error}</Alert>}


      </div>
    </Container>
  )
}

