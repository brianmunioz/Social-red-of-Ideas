import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Loading from '../loading/Loading';
import {useNavigate} from 'react-router-dom';

const DeleteAlert = (props) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('Are you sure you want to delete the idea?');
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const {REACT_APP_API_URL} = process.env;

  if (loading === true && deleted === true) {

    setTimeout(() => {
      setTitle('Deleted! Redirecting to home...');
   setTimeout(() => {
    navigate('/');
      }, 2000)
    }, 3000)

  } else if (loading === true && deleted === false) {
    setTimeout(() => {
      setTitle('Your idea could not be deleted, please try again later');
    }, 3000)
  }

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/idea/${props.ideaID}`)
      .then((dat) => {
        const userLocalStorage = localStorage.getItem('user').replace(/[ '"]+/g, '').trim();
        if (dat.data.author._id !== userLocalStorage) {
          return navigate('/');
        }
      })
      .catch(console.log)
  }, [])




  const deleteIdea = () => {

    const token = document.cookie.replace('token=', '');
    axios.delete(REACT_APP_API_URL+'/idea/' + props.ideaID,
      {
        headers: {
          'Authorization': token
        }
      })
      .then((data) => {
        setTitle('Deleting...');
        setLoading(true);
        if (data.status === 200)
          setDeleted(true);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      rounded
    >
      <div className="backgroundAlertDelete text-light border-o">      
      <Modal.Header closeButton className='bg-transparent border-0'>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading === true ? <Loading /> : 'This action is irreversible'}
      </Modal.Body>
      <Modal.Footer className='border-0'>
        <Button onClick={props.onHide} variant='outline-light'>Close</Button>
        <Button variant="danger" onClick={deleteIdea} >
          Delete
        </Button>
      </Modal.Footer>
      </div>
    </Modal>
  );
}

export default DeleteAlert;