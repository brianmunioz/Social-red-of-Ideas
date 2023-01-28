import React from 'react';
import { Link } from 'react-router-dom';

const IndividualComment = (props) => {
    return (
        <>
            <div className="p-3 mb-3 shadow rounded-2 border-top border-5 border-primary">
                <Link to={'/profileUser/'+props.authorID} className='fs-4 text-bg-primary text-decoration-none d-inline-block rounded-2 p-1 shadow '>@{props.author}</Link>
                <p>{props.comment}</p>
            </div>
        </>
    )
}

export default IndividualComment