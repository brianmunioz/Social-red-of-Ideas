import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
const Register = () => {
  const token = document.cookie.replace('token=', '');
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  if (token) {
    navigate('/');
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (!user) {
      setError('Please, complete username field!');
      return;
    }
    if (!name) {
      setError('Please, complete name field!');
      return;
    }
    if (!pass) {
      setError('Please complete password field!');
      return;
    }
    setError("");
    axios.post(REACT_APP_API_URL + 'auth/signup', {
      username: user,
      name: name,
      password: pass
    })
      .then(function () {
        navigate('/login');
      })
      .catch(function () {
        setError('Please try again later');
        setTimeout(() => {
          setError("");
        }, 3000)
      });
  }
  return (
    <Container>
      <div className="login">
        <div className="login-triangle " />
        <h2 className="login-header bg-dark fw-bold">Register</h2>
        <form className="login-container shadow" onSubmit={handleSubmit}>
          <input className='mb-3' type="text" name="username" value={user} onChange={(e) => setUser(e.target.value)} placeholder="user" />
          <input className='mb-3' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
          <input className='mb-3' type="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
          <input type="submit" value="Sign up" className='bg-dark' />
        </form>
        {error && <Alert className='mt-3' variant='danger'>{error}</Alert>}
      </div>
    </Container>
  )
}
export default Register