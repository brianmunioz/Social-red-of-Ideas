import React, { useEffect, useState } from 'react';
import { useIdea, IdeaProvider } from '../../context/idea.context'
import Idea from '../../components/idea/Idea';
import Loading from '../../components/loading/Loading';

export default () =>
  <IdeaProvider>
    <Home></Home>
  </IdeaProvider>
const Home = () => {
  const [page, setPage] = useState(2);
  const [newIdeas, setNewIdeas] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const { getIdeas,
    ideas } = useIdea();
  useEffect(() => {
    getIdeas(1);
  }, [])

const updateIdeas = ()=>{
  const haveNewPagesBoolean = getIdeas(page);
  setPage(page+1)
  return haveNewPagesBoolean;
}
  return (
    <div className='container  pb-5'>
      <h1 className='text-center title  text-uppercase mt-5'>Latest <span></span> Ideas</h1>
      {
        ideas.length > 0  &&
        ideas.map((idea) => <Idea data={idea} key={idea._id} />)
      }
{isLoading?
  <div className="d-flex justify-content-center">

<Loading></Loading>
</div>

:

<div className="d-flex justify-content-center">
{ !newIdeas  || newIdeas === false?
  <h1>No more ideas create ideas!</h1>
          :
          <button className="btn btn-outline-primary" onClick={()=>{
            setIsLoading(true)
            setTimeout(()=>{
              if(!updateIdeas()){
                setTimeout(()=>{
                  setNewIdeas(false);

                },500)
              }
              setIsLoading(false)
            },500)
           
           }}>Load more ideas</button>

 }

 

   </div>



}
        

   

    </div>
    
    
  )
}

