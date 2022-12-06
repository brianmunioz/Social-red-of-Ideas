import React, { useState } from 'react';
import IndividualComment from './IndividualComment';
import axios from 'axios';
import SectionBtn from '../alerts/btnAlerts/SectionBtn';
const Comments = (data) => {
  const [othersComments, setOthersComments] = useState(data.data.comments);
  const [userComment, setUserComment] = useState('');
  const token = document.cookie.replace('token=', '');
  function comment(e) {
e.preventDefault();
    axios.post('http://localhost:5000/v1/api/comment/' + data.data._id,
      {
        comment: userComment
      },
      {
        headers: {
          'Authorization': token
        }
      })
      .then(apiComments => {
        setOthersComments(apiComments);
      })
      .catch(console.log)
  }
  return (
    <div className='pb-3 mt-5'>
      {othersComments && othersComments.map((el) => {
        return <IndividualComment author={el.author.name} comment={el.comment}></IndividualComment>
      })}
      {token ?
        <form className='d-flex justify-content-center  mt-5 col-12' onSubmit={comment}>
          <textarea name="comment" id="comment" placeholder='Write your comment...' className='col-9 me-2 p-1 rounded-3 border border-primary border-2 ' style={
            {
              'max-height': '60px'
            }
          }
            value={userComment}
            onChange={(e) => { setUserComment(e.target.value) }}
          ></textarea>
          <input type="submit" className='btn btn-primary' value={'comment'} />
        </form>
        :
        <form className='d-flex justify-content-center  mt-5 col-12'>
          <textarea placeholder='Write your comment...' className='col-6 me-2 p-1 rounded-3 border border-primary border-2 ' style={
            {
              'max-height': '60px'
            }

          }
            value={userComment}
            onChange={(e) => { setUserComment(e.target.value) }}
          ></textarea>
          <SectionBtn
            type=' btn btn-outline-dark'
            title={'comment'}
          ></SectionBtn>
        </form>
      }

    </div>
  )
}

export default Comments