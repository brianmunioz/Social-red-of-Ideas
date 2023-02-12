import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useIdea, IdeaProvider } from '../../context/idea.context';
import Card from 'react-bootstrap/Card';
import IdeaPreview from '../../components/idea/IdeaPreview';
export default () =>
  <IdeaProvider>
    <UserProfile></UserProfile>
  </IdeaProvider>

const UserProfile = () => {
  const [data, setData] = useState({
    name: '',
    username: '',
    img_profile: '',
    totalIdeas: ''
  });
  let { userID } = useParams();
  const { getIdeas,
    ideas } = useIdea();
  useEffect(() => {
    getIdeas();
  }, []);
  let ideasfiltradas = ideas.filter(useridea => useridea.author._id === userID);
  data.totalIdeas = ideasfiltradas.length;



  const { REACT_APP_API_URL } = process.env;
  useEffect(() => {
    if (userID) {
      axios.get(REACT_APP_API_URL + 'user/' + userID)
        .then(dat => {
          setData({
            username: dat.data.username,
            name: dat.data.name,
            img_profile: dat.data.img_profile
          })

        })
        .catch(console.log)
    }
  }, [!data])


  return (
    <Card style={{ maxWidth: '320px', minWidth: '200px', margin: '0 auto' }} className="mt-5">
      {data.img_profile ? <Card.Img variant="top" src={data.img_profile} alt={data.name} />
        : <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt={data.name}/>
      }
      <Card.Body>
        <Card.Title className="text">@{data.username}</Card.Title>
        <Card.Text  >
          Name: <span className="text-dark" >{data.name}</span>
        </Card.Text>
        <Card.Text className="fw-bold" >
          Ideas <span className="text-dark" >{'('+data.totalIdeas+")"}</span>
        </Card.Text>
        {data.totalIdeas > 0&& ideasfiltradas.map((el) => { return <IdeaPreview id={el._id} idea={el.idea} description={el.description} maxChar="50"></IdeaPreview> })}

      </Card.Body>
    </Card>
  );
}

