import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Error(props) {
  const valorInicial = true;
  const [show, setShow] = useState(valorInicial);
  const handleClose = () => {
    if (show === true) {
      setShow(false);

    } else {
      setShow(true)
    }
  };


  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.error}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
    
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Error