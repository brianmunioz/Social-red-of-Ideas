import React, {useState}from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Idea from '../../components/idea/Idea';
import Comments from '../../components/comments/Comments';
import Loading from '../../components/loading/Loading';

const IdeaIndividual = () => {
  const [data,setData] = useState('');
  let {ideaID} = useParams();
  const {REACT_APP_API_URL} = process.env;

      useEffect(()=>{
        axios.get(REACT_APP_API_URL+'idea/'+ideaID)
        .then(dat => {
          const data = dat.data;
         setData(data);  
        })
        .catch(console.log)
      },[!data])
  

  return (
    <div className='container'>
        {data && <Idea data={data}></Idea>}
        {data && <Comments data={data} />}
        {!data && <Loading/>}
    </div>
  )
}

export default IdeaIndividual