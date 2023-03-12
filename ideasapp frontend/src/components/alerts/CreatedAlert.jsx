import React from 'react';
import Modal from 'react-bootstrap/Modal';
const CreatedAlert = ({show,title}) => {
    
  return (
    <Modal show={show} >
    <Modal.Header className='bg-success rounded border-0' >
      <Modal.Title className='text-light' >{title}</Modal.Title>
    </Modal.Header>
 
  </Modal>  )
}

export default CreatedAlert