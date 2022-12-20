import React, { useState } from 'react'
import SessionAlert from '../SectionAlert';

const SectionBtn = (props) => {
    
 
    const [modalShow, setModalShow] = useState(false);

    return (
        <>

           
                <button className={props.type} onClick={(e) =>{
                    e.preventDefault();
                    setModalShow(true)}}>{props.title} </button>

                <SessionAlert
                    show={modalShow}
                    title='You need have a account with realize this action!'  
                    onHide={() => setModalShow(false)}
                />


        </>);
}

export default SectionBtn;