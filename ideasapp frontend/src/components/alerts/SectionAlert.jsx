import React from 'react';
import './style.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const SectionAlert = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="backgroundAlertSession rounded">
                <Modal.Header closeButton className='bg-transparent'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Link className="text-decoration-none text-center h1 text-primary"
                        to="/register">Create account</Link>
                    <br />
                    <h4>or</h4>

                    <Link className="text-decoration-none text-center h3 text-secondary" to="/login">Log in</Link>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className='btn-danger'>Close</Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default SectionAlert;