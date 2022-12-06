import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteBtn from '../alerts/btnAlerts/DeleteBtn';
const IdeaCRUD = ({ userIdeas }) => {
   const positiveVotes = ()=>{
    if(userIdeas.vote.length === 0){
      return 0;
    }
    const positive = userIdeas.vote.filter((el)=>{return el.vote === true });
    return positive.length;
   }
   const negativeVotes = ()=>{
    if(userIdeas.vote.length === 0){
      return 0;
    }
    const negative = userIdeas.vote.filter((el)=>{return el.vote === false});
    return negative.length;
   }
   const voteScore = ()=>{
    if(userIdeas.vote.length > 0){
        const positive = userIdeas.vote.filter(el => el.vote === true);
        const negative = userIdeas.vote.filter(el => el.vote === false);
        return positive.length - negative.length;
      }else{
        return 0;
      }
  }
  return (
    <>
      <Card
        bg={'transparent'}
        key={userIdeas._id}
        text={'dark'}
        className="mb-2 mt-5 shadow"
      >
        <Card.Header className='fw-bold'><Link className="text-decoration-none  text-dark"to={`/idea/${userIdeas._id}`}>{userIdeas.idea}</Link></Card.Header>
        <Card.Body>
          <h4 className='text-success '>Positive votes: {positiveVotes()}</h4>
          <h4 className='text-danger '>Negtive votes: {negativeVotes()}</h4>
          {
            userIdeas.vote.length >= 0 ?
              <h2 className='text-light d-inline-block p-1 rounded bg-success'>Your score: {voteScore() }</h2>
              :
              <h2 className='text-light d-inline-block p-1 rounded bg-danger'>Your score: {voteScore()}</h2>
          }
          <h4 className='text-secondary'>Total votes: {userIdeas.vote.length}</h4>
          <h4 className='text-primary'>Total comments: {userIdeas.comments.length}</h4>
        </Card.Body>
        <Card.Footer className='d-flex justify-content-around'>
          <Button variant="outline-primary" href={`/edit/${userIdeas._id}`}>Edit</Button>
          <DeleteBtn ideaID={userIdeas._id} />
        </Card.Footer>
      </Card>
    </>
  )
}

export default IdeaCRUD