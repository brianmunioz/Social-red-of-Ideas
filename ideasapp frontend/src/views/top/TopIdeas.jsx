import React, { useEffect, useState } from 'react';
import { useIdea, IdeaProvider } from '../../context/idea.context'
import Idea from '../../components/idea/Idea';
import Loading from '../../components/loading/Loading';

export default () => <IdeaProvider>
  <TopIdeas></TopIdeas>
</IdeaProvider>
const TopIdeas = () => {
  const { getIdeas,
    ideas
  } = useIdea();


  useEffect(() => {
    getIdeas(1,9000);
  }, [])
  const [initialLoading, setInitialLoading] = useState(true);
  setTimeout(()=>{
      setInitialLoading(false);
          },500)

  const theMostVoted = ideas.filter(idea => { return idea.vote.length > 0 }).sort((a, b) => {
    const votesA = a.vote.length;
    const votesB = b.vote.length;
    return votesB - votesA;
  })
  const theMostCommented = ideas.filter(vote => { return vote.comments.length > 0 }).sort((a, b) => {
    const commentsA = a.comments.length;
    const commentsB = b.comments.length;
    return commentsB - commentsA;
  });
  if (theMostCommented.length > 10) {
    theMostCommented.length = 10;
  } else if (theMostVoted > 10) {
    theMostVoted.length = 10;

  }



  return (
    <div className='container pb-5'>
      {initialLoading === false ? 
      <>
       <h1 className='text-center title text-uppercase mt-5'>Top 10 ideas with most voted</h1>

{
  theMostVoted.length > 0 &&
  theMostVoted.map((idea, index) =>
    <div >
      <a href={`/idea/${idea._id}`} key={idea._id} style={{ textDecoration: 'none' }}>


        <Idea data={idea} topIdea={index + 1} key={idea._id} />
      </a>
    </div>

  )
}
<h1 className='text-center title text-uppercase mt-5'>Top 10 ideas most commented</h1>

{
  theMostCommented.length > 0 &&
  theMostCommented.map((idea, index) =>
    <div >
      <a href={`/idea/${idea._id}`} key={idea._id} style={{ textDecoration: 'none' }}>
        <Idea data={idea} topIdea={index + 1} key={idea._id} />
      </a>
    </div>
  )
}
      </> :
      <Loading/>}


     

    </div>
  )
}

