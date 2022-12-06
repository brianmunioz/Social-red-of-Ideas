import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import DeleteAlert from '../DeleteAlert';

const DeleteBtn = (props) => {
    const config = {
        button: 'danger',
        btnText: 'Delete'
    }
    const [modalShow, setModalShow] = useState(false);

    return (
        <>


            <Button variant={config.button} onClick={() => setModalShow(true)}>{config.btnText}</Button>
            <DeleteAlert
                show={modalShow}
                ideaID={props.ideaID}
                title='¿Are you sure delete this idea?'
                onHide={() => setModalShow(false)}
            />
        </>);
}

export default DeleteBtn;