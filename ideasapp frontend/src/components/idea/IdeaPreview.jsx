import Card from 'react-bootstrap/Card';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function IdeaPreview({ id, idea, description, maxChar }) {
  const ideaCut = idea.substring(0, maxChar);
  const descriptionCut = description.substring(0, maxChar);

  return (
    <Card className='bg-transparent'>
      <Card.Header>{ideaCut}
        {ideaCut.length < description.length && '...'}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {descriptionCut}
            {descriptionCut.length < description.length && '...'}
          </p>
          <footer >
            <Button variant='dark'><Link to={"/idea/" + id} className="text-decoration-none text-white">Go to idea</Link></Button>
          </footer>
        </blockquote>

      </Card.Body>
    </Card>
  );
}

export default IdeaPreview;