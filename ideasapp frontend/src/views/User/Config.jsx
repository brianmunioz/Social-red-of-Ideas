import React, { useState } from 'react'
import { useEffect } from 'react';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios';
import logout from '../../helpers/logout';

const Config = () => {
  const token = document.cookie.replace('token=', '');
  const user = JSON.parse(localStorage.getItem('user'));
  const [usernameClick, setUsernameClick] = useState(false);
  const [nameClick, setNameClick] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [imageUpload, setImageUpload] = useState('');
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    if (!token || !user) logout();
  }, [])
  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}user/${user}`)
      .then((response) => {

        setName(response.data.name);
        setUsername(response.data.username);
        setImage(response.data.img_profile);
      })
      .catch(console.log)
  }, [])

  function editInput(valor, setValor) {
    if (valor === true) {
      setValor(false);
    } else {
      setValor(true);
    }
  }
  const deleteAccount = (e) => {
    e.preventDefault();
    axios.delete(`${REACT_APP_API_URL}user/${user}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(
        (res) => {
          if (res.data.status === 200 && res.data.status === 201) {
            setError(false);
            logout();
          } else {
            setError(true);
          }
        }
      )
      .catch((res) => {
        if (res.response.data.status === 401) {
          logout();
        }
        setError(true);
        setErrorMsg('Could not delete account, please try again later');
      }

      )
  }
  const handleImage = (e) => {
    setImageUpload(e.target.files[0])
  }

  const editUser = (e) => {
    e.preventDefault();
 
    if (name.trim() === '' || username.trim() === '') {
      setError(true);
      setErrorMsg('You should complete all field´s');
    } else {
      console.log(imageUpload);
      if (imageUpload !== undefined) {
        let formdata = new FormData();
        formdata.append('myFile', imageUpload);
        axios.post('http://localhost:3001/v1/api/upload/image', formdata)
          .then((res) => {
            console.log(res.data );
              setImageUpload(res.data.filename)
            
          })
          .catch(() => {
            setImageUpload('')
          })
      }
      axios.patch(`${REACT_APP_API_URL}user/${user}`, {
        name: name,
        username: username,
        img_profile: imageUpload

      }, {
        headers: {
          'Authorization': token
        }
      })
        .then(
          (res) => {
            console.log(res);
            if (res.status === 200 && res.status === 201) {
              setError(false);
            } else {
              setError(true);
              setErrorMsg('Could not edit this account, please try again later')
            }
          }
        )
        .catch(
          (res) => {
            if (res.response.status === 401) {
              logout();
            }
            setError(true);
            setErrorMsg('Could not edit account, please try again later');
          }
        )
    }
  }
  return (
    <div className=' d-flex flex-column align-items-center  justify-content-center '>
      <Form className='form-config rounded shadow mt-5 border-0' onSubmit={editUser}>

        <InputGroup className=' d-flex flex-column align-items-center justify-content-between mb-5' >
        <label className='fw-bold'  htmlFor="image">Profile image</label>

        {image ? <img src={REACT_APP_API_URL +'images/'+ image} alt={username}  class="rounded-circle mb-3 mt-3"style={{width: '80px',height: '80px'}}></img>:
         <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} class="rounded-circle mb-3 mt-3" alt={username} style={{width: '80px',height: '80px'}}></img>}

          <input type="file"  name="image" accept="image/png, .jpeg, .jpg" onChange={handleImage}></input>
        </InputGroup>

        <InputGroup className=' d-flex align-items-center justify-content-between mb-5' >

          <label className='fw-bold' htmlFor="cantidad">Nombre</label>
          {
            nameClick === false ? <input className='bg-dark text-light p-1 shadow border-0 rounded' type="text" name="cantidad" id="cantidad" readonly="readonly" value={name} />
              : <input type="text" className='bg-light  p-1 shadow border-0 rounded' name="cantidad" id="cantidad" value={name} onChange={(e) => setName(e.target.value)} />

          }
          <Button className='shadow' variant='secondary' onClick={() => editInput(nameClick, setNameClick)}>Edit</Button>
        </InputGroup>
        <InputGroup className=' d-flex align-items-center justify-content-between mb-5'>
          <label className='fw-bold' htmlFor="username">Username</label>
          {
            usernameClick === false ? <input className='bg-dark text-light p-1 shadow border-0 rounded' type="text" name="username" id="username" readonly="readonly" value={username} />
              : <input type="text" className='bg-light  p-1 shadow border-0 rounded' name="username" id="username" value={username} />


          }
          <Button variant='secondary' onClick={() => editInput(usernameClick, setUsernameClick)}>Edit</Button>
        </InputGroup>

        <Button type="submit" variant='success'>Save changes</Button>
      </Form>

      <Form onSubmit={deleteAccount}>
        <input type="submit" className='text-danger mt-5 btn btn-outline-danger fw-bold bg-transparent' value={'Delete this account forever'} />
      </Form>
      {error &&
        <Alert className='mt-5'> {errorMsg}</Alert>
      }

    </div>
  )
}

export default Config