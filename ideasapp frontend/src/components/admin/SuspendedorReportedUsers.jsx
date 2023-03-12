import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function SuspendedorReportedUsers({ type, data }) {
const createdAt = type === 'reported' ? new Date(data.createdAt): new Date(data.expireAt);
const dateNormalFormate =type === 'reported' ? createdAt.getDay() +"/"+ createdAt.getMonth()+"/"+ createdAt.getFullYear() : createdAt.getDay() +"/"+ createdAt.getMonth()+"/"+ createdAt.getFullYear();
const rol = localStorage.getItem('rol').replace("\"", "").replace("\"", "");
  return (
    <Card className="mx-auto" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>@{type==='reported'? data.idea.author.username :data.author.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">created at: {dateNormalFormate}</Card.Subtitle>
        {type !== 'reported' &&<Card.Subtitle className="mb-2 text-danger">Suspention Time: {data.suspentionMinutesQuantity / 1440} hours</Card.Subtitle>}
        <Card.Text>
         {data.reason}
        </Card.Text>


        {type === 'reported' && <div className="d-flex justify-content-around">
        <Link className="text-decoration-none fw-bold" to={'/idea/'+data.idea._id}>view post</Link>
        {rol === 'admin' &&<Link className="text-decoration-none fw-bold text-danger" to={'/create/suspention/'+data.idea.author._id}>Suspend User</Link>
}
        </div> 
}
      </Card.Body>
    </Card>
  );
}

export default SuspendedorReportedUsers;