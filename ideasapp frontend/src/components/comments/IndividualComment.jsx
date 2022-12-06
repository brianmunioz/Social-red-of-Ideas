import React from 'react';

const IndividualComment = (props) => {
    return (
        <>
            <div className="p-3 mb-3 shadow rounded-2 border-top border-5 border-primary">
                <h2 className='fs-4 text-bg-primary d-inline-block rounded-2 p-1 shadow '>{props.author}</h2>
                <p>{props.comment}</p>
            </div>
        </>
    )
}

export default IndividualComment