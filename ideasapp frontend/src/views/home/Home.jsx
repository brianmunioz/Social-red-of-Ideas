import React, { useEffect } from 'react';
import { useIdea, IdeaProvider } from '../../context/idea.context'
import Idea from '../../components/idea/Idea';

export default () =>
  <IdeaProvider>
    <Home></Home>
  </IdeaProvider>
const Home = () => {
  const { getIdeas,
    ideas } = useIdea();
  useEffect(() => {
    getIdeas();
  }, [])


  return (
    <div className='container  pb-5'>
      <h1 className='text-center title  text-uppercase mt-5'>Latest <span></span> Ideas</h1>
      {
        ideas.length > 0 &&
        ideas.map((idea) => <Idea data={idea} key={idea._id} />)
      }
    </div>
  )
}

