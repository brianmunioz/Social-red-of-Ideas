import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import inputPasswordValidation from '../../helpers/inputPasswordValidation';
import inputTextValidation from '../../helpers/inputTextValidation';
import CreatedAlert from '../../components/alerts/CreatedAlert';
const Register = () => {
  const token = document.cookie.replace('token=', '');
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  if (token !== '') {
    navigate('/');
  }
  if(error){

  }

  function showError( message){
    setError(message);
    setTimeout(()=>{
      setError('')
    },3000)

  }
  const handleSubmit = e => {
    e.preventDefault();
    const userHaveSpace = Boolean(user.match(/\s/));
    const userNoValidChars = Boolean(user.match(/[^a-z0-9_.]+/));
    const validPass = inputPasswordValidation(pass);
    const validName = inputTextValidation(name, 'name');
    if (!user) {
      showError('Please, complete username field!');
      return;
    }else if(userHaveSpace){
      showError('Space is not valid in a user field!')
      return
    }else if(userNoValidChars){
      showError('You need  only use lowercase letters, numbers, dot, underscore.')
      return
    }
    if(validPass.validation === false){
      showError(validPass.error);
      return;
    }
    if (validName.validation === false) {
      showError(validName.error);
      return;
    }
    setError("");
    axios.post(REACT_APP_API_URL + 'auth/signup', {
      username: user,
      name: name,
      password: pass
    })
      .then(function () {
        setShow(true)
        setTimeout(()=>{
          navigate('/login');
          
        },5000)
      })
      .catch(function (error) {
        setError('Please try again later');
        setTimeout(() => {
          setError("");
        }, 3000)
      });
  }
  return (
    <Container>
      {show&& <CreatedAlert show={show} title='Your user is created, right now redirected to login in 5 seconds'/>}
      <div className="login">
        <h2 className="login-header  fw-bold">Register</h2>
        <form className="login-container shadow" onSubmit={handleSubmit}>
          <input className='mb-3' type="text" name="username" value={user} onChange={(e) => setUser(e.target.value)} placeholder="user" />
          <input className='mb-3' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
          <input className='mb-3' type="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
          {error && <Alert className='mt-3' variant='danger'>{error}</Alert>}
          <input type="submit" value="Sign up" className='border-0' />
        </form>
        
      </div>
    </Container>
  )
}
export default Register