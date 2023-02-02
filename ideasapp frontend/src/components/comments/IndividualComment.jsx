import React from 'react';
import { Link } from 'react-router-dom';

const IndividualComment = (props) => {
    return (
        <>
            <div className="p-3 mb-3 shadow rounded-2 border-top border-5 border-primary">
                <Link to={'/profileUser/' + props.authorID} className='fs-4 text-bg-primary text-decoration-none d-inline-block rounded-2 p-1 shadow '>
                    {props.authorIMG !== '' ?
                        <img src={props.authorIMG} style={
                            {
                                width: '30px',
                                height: '30px',
                                borderRadius: '40px',
                                marginRight: '10px'
                            }}></img>
                        :
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" style={
                            {
                                width: '30px',
                                height: '30px',
                                borderRadius: '40px',
                                marginRight: '10px'
                            }}></img>
                    }@{props.author}</Link>
                <p>{props.comment}</p>
            </div>
        </>
    )
}

export default IndividualComment