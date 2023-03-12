import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import inputTextValidation from '../../helpers/inputTextValidation';
import CreatedAlert from '../../components/alerts/CreatedAlert';


const CreateSuspention = () => {
  let { userID } = useParams();
  const [initialLoading, setInitialLoading] = useState(true);
  setTimeout(() => {
    setInitialLoading(false);
  }, 500)
  const [user, setUser] = useState(userID);
  const [reason, setReason] = useState('');
  const [suspentionMinutesQuantity, setSuspentionMinutesQuantity] = useState(1440);
  const { REACT_APP_API_URL } = process.env;
  const token = document.cookie.replace('token=', '');
  const [userExist, setUserExist] = useState(false);
  const [error, setError] = useState('')
  const [show, setShow] = useState(false);
  const navigate = useNavigate()

  const addReport = (e) => {
    e.preventDefault();


    axios.get(REACT_APP_API_URL + '/user/' + user)
      .then(() => {
        setUserExist(true);
      })
      .catch(err => {
        if (err.response.status === 500) {
          setError('userID entered is incorrect');
          setTimeout(() => {
            setError('');
          }, 4000);
        }
      })


    if (userExist === true) {
      const isValidReason = inputTextValidation(reason, 'reason');
      const isNumber = Boolean(suspentionMinutesQuantity.match(/[0-9]/));

      if (isValidReason.validation === false) {
        setError(isValidReason.error);
        setTimeout(() => {
          setError('');
        }, 4000);
        return
      } else if (!isNumber) {
        setError('Quantity minutes need to be numbers');
        setTimeout(() => {
          setError('');
        }, 4000);
        return
      }

      axios.post(REACT_APP_API_URL + '/suspended', {
        reason,
        author: user,
        suspentionMinutesQuantity

      }, {
        headers: {
          'Authorization': token
        }
      })
        .then(() => {
          setShow(true);
          setTimeout(() => {
            navigate('/suspended')
          }, 5000)

        })
        .catch(err => {
          if (err.response.status === 500) {
            setError('ID entered is incorrect');
            setTimeout(() => {
              setError('');
            }, 4000);
          }
        })
    }
  }
  return (
    <div className="container mt-5">
      {show && <CreatedAlert show={show} title='Your Suspention is created! We redirected to suspentions' />}

      {initialLoading === false ?
        <>
          <h1 className="title">Create Suspention</h1>
          <Form onSubmit={(e) => addReport(e)} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='fw-bold'>User ID</Form.Label>
              <Form.Control type="text" placeholder="Enter idea ID" value={user} onChange={e => { setUser(e.target.value) }} />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className='fw-bold'>Reason</Form.Label>
              <Form.Control type="text" placeholder="Enter reason from report" value={reason} onChange={(e) => { setReason(e.target.value) }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="minutes">
              <Form.Label className='fw-bold'>quantity minutes</Form.Label>
              <Form.Control type="number" min={1440} step={1440} value={suspentionMinutesQuantity} onChange={(e) => { setSuspentionMinutesQuantity(e.target.value) }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="error">
              {error && <Alert className='mt-3' variant='danger'>{error}</Alert>}

            </Form.Group>
            <Button variant="danger" type="submit">
              Submit
            </Button>
          </Form>
        </> :
        <Loading />}

    </div>
  )
}

export default CreateSuspention