import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SectionBtn from '../alerts/btnAlerts/SectionBtn';
import logout from '../../helpers/logout';
const Idea = ({ data }) => {
  const token = document.cookie.replace('token=', '');
  const userLogged = JSON.parse(localStorage.getItem('user'));
  
  const voteScore = () => {
    if (data.vote.length > 0) {
      const positive = data.vote.filter(el => el.vote === true);
      const negative = data.vote.filter(el => el.vote === false);
      return positive.length - negative.length;
    }
  }
  const [totalVotes, setTotalVotes] = useState(voteScore);
  const [voted, setVoted] = useState('');
  const [idVote, setIdVote] = useState('');
  const allVotes = data.vote;
  const { REACT_APP_API_URL } = process.env;
  const idea = {
    id: data._id,
    title: data.idea,
    description: data.description,
    author: data.author.name,
    username: data.author.username,
    authorID: data.author._id,
    comments: data.comments.length
  };
  let date = new Date(data.createdAt);
  let onlyDate = date.toLocaleDateString('en-US');
  let dateandHour = date.toLocaleString("es-ES");
 

  useEffect(() => {
    if (allVotes.length > 0) {
      for (let i = 0; i < allVotes.length; i++) {
        if (allVotes[i].author._id === userLogged) {
          setIdVote(allVotes[i]._id);
          if (allVotes[i].vote === true) {
            setVoted(true);
          } else {
            setVoted(false);
          }
        }
      }
    }
  }, []);




  const downVote = e => {
    e.preventDefault();
    if (voted === false) {
      axios.delete(`${REACT_APP_API_URL}vote/${idVote}`, {
        headers: {
          'authorization': token
        }
      })
        .then(() => {
          setVoted('');
          setTotalVotes(totalVotes - 1);
        })
        .catch(res => {
          if (res.response.status === 401) logout();
        })
    } else if (voted === true) {
      axios.patch(`${REACT_APP_API_URL}vote/${idVote}`, {
        vote: false
      }, {
        headers: {
          'authorization': token
        }
      })
        .then(() => {
          setVoted(false);
        })
        .catch(res => {
          if (res.response.status === 401) logout();
        })
    } else {
      axios.post(`${REACT_APP_API_URL}vote/${data._id}`, {
        vote: false
      }, {
        headers: {
          'authorization': token
        }
      })
        .then(() => {
          setVoted(false);
          setTotalVotes(totalVotes - 1);
        })
        .catch(res => {
          if (res.response.status === 401) logout();
        })
    }

  }

  const upVote = e => {
    e.preventDefault();
    if (voted === true) {
      axios.delete(`${REACT_APP_API_URL}vote/${idVote}`, {
        headers: {
          'authorization': token
        }
      })
        .then(() => {
          setVoted('');
          setTotalVotes(totalVotes - 1);
        })
        .catch(res => {
          if (res.response.status === 401) logout();
        })
    } else if (voted === false) {
      axios.patch(`${REACT_APP_API_URL}vote/${idVote}`, {
        vote: true
      }, {
        headers: {
          'authorization': token
        }
      })
        .then(() => {
          setVoted(true);
        })
        .catch(res => {
          if (res.response.status === 401) logout();
        })
    } else {
      axios.post(`${REACT_APP_API_URL}vote/${data._id}`
        , {
          vote: true
        }, {
        headers: {
          'authorization': token
        }
      }
      )
        .then(() => {
          setVoted(true);
          setTotalVotes(totalVotes + 1);
        })
        .catch(res => {
          if (res.response.status === 401) logout();
        })
    }

  }



  const upclass = () => {
    if (voted === true) {
      return 'votedup'
    } else {
      return 'upvote'
    }


  }

  const downclass = () => {
    if (voted === false) {
      return 'voteddown'
    } else {
      return 'downvote'
    }
  }

  return (
    <>
      <Card
        bg={'transparent'}
        key={idea.id}
        text={'dark'}
        className=" mt-5 mx-auto col-12 col-sm-10 shadow"
      >
        <Card.Header className='fw-bold'>{idea.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            {idea.description}

            <p className='text-black-50'>-Posted at: <span className='text-muted'>{dateandHour}</span></p>
          </Card.Text>
          <footer className="blockquote-footer">
            <p className='text-black-50'>Author: <Link  to={'/profileUser/'+idea.authorID}className='text-muted' title={idea.author}>@{idea.username}</Link></p> 
          </footer>

        </Card.Body>
        <Card.Footer >
          <div className='d-flex justify-content-around'>
            <h2>Score: {totalVotes ? totalVotes : 0}</h2>
            {token ?
              <form onSubmit={upVote}>
                <input type="hidden" name="up" value={data._id} />
                <button className={upclass()} type="submit"></button>
              </form> :
              <form>
                <SectionBtn type='upvote'></SectionBtn>
              </form>


            }
            {token ?
              <form onSubmit={downVote}>
                <input type="hidden" name="down" value={data._id} />
                <button className={downclass()} type="submit"></button>
              </form> :
              <form>
                <SectionBtn type='downvote'></SectionBtn>
              </form>


            }

          </div>
          <hr />
          <Link to={`/idea/${idea.id}`} className='text-center  text-decoration-none' style={{ color: '#2b86c5' }} ><h3 >comments{`(${idea.comments})`}</h3></Link>
        </Card.Footer>
      </Card>
    </>

  )
}

export default Idea