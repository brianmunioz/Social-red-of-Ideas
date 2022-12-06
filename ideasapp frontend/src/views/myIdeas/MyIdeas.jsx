import React,{useState, useEffect} from 'react';
import axios from 'axios';
import IdeaCRUD from '../../components/idea/IdeaCRUD';
import Loading from '../../components/loading/Loading';
import logout from '../../helpers/logout';

const MyIdeas = () => {
    const [ideas,setIdeas] = useState('');
    const userID = JSON.parse(localStorage.getItem('user'));
    const token = document.cookie.replace('token=', '');
    if(!token) logout();
    const {REACT_APP_API_URL} = process.env;
    useEffect(()=>{
        axios.get(`${REACT_APP_API_URL}idea/${userID}/all`,{
          headers: {
              'Authorization': token
          }
      })
        .then((respuesta)=>{  
            
            setIdeas(respuesta.data);
          })
        .catch(
          (res)=>
          {
            if(res.response.status === 401){
              logout();
            }
      
          }
        )
    },[!ideas])
  
  return (
    <div className='container  pb-5'>
        <div className="d-flex align-items-center mt-5 justify-content-center">
        <a className='btn btn-outline-dark shadow text-center bold' href={"/create"} style={{width: '200px'}}>Create new idea</a>

        </div>

        {ideas.length > 0 && ideas.map((idea)=>{return <IdeaCRUD userIdeas={idea} key={ideas._id}/>})}
        {ideas.length === 0 &&<h1 className='text-center mt-5'>You not have ideas! Create a new idea!</h1>}
        {ideas === '' && <Loading/>}

    </div>
  )
}

export default MyIdeas