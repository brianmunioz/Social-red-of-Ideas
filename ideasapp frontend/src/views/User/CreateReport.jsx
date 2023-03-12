import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import inputTextValidation from '../../helpers/inputTextValidation';
import { Alert } from 'react-bootstrap';
import CreatedAlert from '../../components/alerts/CreatedAlert';
const CreateReport = () => {
  const [ideaID, setIdeaID] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);
  setTimeout(() => {
    setInitialLoading(false);
  }, 500)
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const { REACT_APP_API_URL } = process.env;
  const token = document.cookie.replace('token=', '');
  const [ideaReportedExist, setIdeaReportedExist] = useState(false);
  
  const addReport = (e) => {
    e.preventDefault();
    

    axios.get(REACT_APP_API_URL + '/idea/' + ideaID)
      .then(() => {
        setIdeaReportedExist(true)
      })
      .catch(err=>{
        if(err.response.status === 500){
          setError('ideaID entered is incorrect');
          setTimeout(() => {
            setError('');
          }, 4000);
        }
      })

    if (ideaReportedExist === true) {
      setIdeaReportedExist(false)
      const isValidReason = inputTextValidation(reason, 'reason');
      if (isValidReason.validation === false) {
        setError(isValidReason.error);
        setTimeout(() => {
          setError('');
        }, 4000);
        return
      } else {
        axios.post(REACT_APP_API_URL + '/reported', {
          reason,
          idea: ideaID
        }, {
          headers: {
            'Authorization': token
          }
        })
          .then((res) => {
            if (res.status === 201 || res.status === 200) {
              setShow(true)
              setTimeout(() => {
                navigate('/reported');

              }, 5000)
            }
          })
          .catch(
            err=>{
              if(err.response.status === 500){
                setError('ID entered is incorrect');
                setTimeout(() => {
                  setError('');
                }, 4000);
              }
            }
          )
      }
    }
  }
  return (
    <div className="container mt-5">
      {show && <CreatedAlert show={show} title='Your report is created! We redirected to reports' />}

      {
        initialLoading === false ?
          <>
            <h1 className="title">Create Report</h1>
            <Form onSubmit={(e) => addReport(e)} >
              <Form.Group className="mb-3" controlId="idea">
                <Form.Label className='fw-bold'>Idea ID</Form.Label>
                <Form.Control type="text" placeholder="Enter idea ID" value={ideaID} onChange={e => { setIdeaID(e.target.value) }} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="reason">
                <Form.Label className='fw-bold'>Reason</Form.Label>
                <Form.Control type="text" placeholder="Enter reason from report" value={reason} onChange={(e) => { setReason(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="error">
                {error && <Alert className='mt-3' variant='danger'>{error}</Alert>}
              </Form.Group>
              <Button variant="danger" type="submit">
                Submit
              </Button>
            </Form>
          </>
          :
          <Loading />
      }

    </div>
  )


}

export default CreateReport