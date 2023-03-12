import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import logout from '../../helpers/logout';
import inputTextValidation from '../../helpers/inputTextValidation';
import CreatedAlert from '../alerts/CreatedAlert';


const createDeleteForm = ({ mode }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [idea, setIdea] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [dateUpdated, setDateUpdated] = useState('')
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  let { ideaID } = useParams();
  const token = document.cookie.replace('token=', '');
  const { REACT_APP_API_URL } = process.env;

  if (mode === 'edit') {
    useEffect(() => {
      axios.get(REACT_APP_API_URL + 'idea/' + ideaID)
        .then(dat => {
          if (dat.status !== 200 && dat.status !== 201) {
            logout();
            return navigate('/');
          }
          setIdea(dat.data.idea);
          setDescription(dat.data.description);
          setDateCreated(dat.data.createdAt)
          setDateUpdated(dat.data.updatedAt)
        }
        )
        .catch(res => {
          if (res.response.status === 401) logout();
        })
    }, []);
  }


  const edit = (e) => {
    e.preventDefault();
    const validIdea = inputTextValidation(idea, 'idea');
    const validDescription = inputTextValidation(description, 'description');
    if (validIdea.validation === false) {
      setError(validIdea.error);
      setTimeout(()=>{
        setError('');
      },3000)
      return
    } else if (validDescription.validation === false) {
      setError(validDescription.error);
      setTimeout(()=>{
        setError('');
      },3000)
      return
    } else {
      axios.patch(REACT_APP_API_URL + 'idea/' + ideaID, {
        idea: idea,
        description: description,
        dateCreated,
        dateUpdated,
        typeUpdate: 'idea'
      }, {
        headers: {
          'Authorization': token
        }
      })
        .then(dat => {
          console.log(dat)
          if (dat.status === 200 || dat.status === 201) {
            setShow(true);
            setTimeout(()=>{
              navigate('/myideas')
            },3000)

          }
        })
        .catch(res => {
          console.log(res)
          if(res.response.status === 400){
            setError(res.response.data.message);
      setTimeout(()=>{
        setError('');
      },3000)
          }
          if (res.response.status === 401) logout();
        })

    }


  }
  const createIdea = (e) => {
    e.preventDefault();
    const validIdea = inputTextValidation(idea, 'idea');
    const validDescription = inputTextValidation(description, 'description');
    if (validIdea.validation === false) {
      setError(validIdea.error);
      setTimeout(()=>{
        setError('');
      },3000)
      return
    } else if (validDescription.validation === false) {
      setError(validDescription.error);
      setTimeout(()=>{
        setError('');
      },3000)
      return
    } else  {
      axios.post(REACT_APP_API_URL + 'idea', {
        idea: idea,
        description: description
      }, {
        headers: {
          'Authorization': token
        }
      }).then(
        (dat) => {
          if (dat.status === 200 || dat.status === 201 ) {
            setShow(true);
            setTimeout(()=>{
              navigate('/myideas')
            },3000)
          }
        }
      )
      .catch(res => {
        console.log(res)
          if (res.response.status === 401) logout();
        })
    }
  }

  return (
    <div className="container mt-5">
            {show && <CreatedAlert show={show} title={'Your idea is '+mode+'! We redirected to your ideas'} />}

      <h1 className='title'>{ideaID ? ('Edit idea') : ('Create new idea')}</h1>
      <Form onSubmit={ideaID ? (edit) : (createIdea)}>
        {error  && <Alert className='mt-3' variant='danger'> {error}</Alert>}


        <Form.Group className="mb-3" >
          <Form.Label className='fw-bold'>Title with idea</Form.Label>
          <Form.Control type="text" name="idea" value={idea} onChange={(e) => setIdea(e.target.value)} />

        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label className='fw-bold'>Idea description</Form.Label>
          <Form.Control as="textarea" rows={15} name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Button variant="outline-dark" type="submit" >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default createDeleteForm