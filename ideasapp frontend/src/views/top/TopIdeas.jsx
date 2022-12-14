import React, { useEffect } from 'react';
import { useIdea, IdeaProvider } from '../../context/idea.context'
import Idea from '../../components/idea/Idea';

export default () => <IdeaProvider>
  <TopIdeas></TopIdeas>
</IdeaProvider>
const TopIdeas = () => {
  const { getIdeas,
    ideas
  } = useIdea();

  useEffect(() => {
    getIdeas();
  }, [])

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


      <h1 className='text-center title text-uppercase mt-5'>Top 10 ideas with most voted</h1>

      {
        theMostVoted.length > 0 &&
        theMostVoted.map((idea, index) =>
          <div >
            <h2 className='top mt-5 btn btn-dark fw-bold text-uppercase ' >{`Position N°${index + 1}`}</h2>
            <a href={`/idea/${idea._id}`} key={idea._id} style={{ textDecoration: 'none' }}>

              <Idea data={idea} key={idea._id} />
            </a>
          </div>

        )
      }
      <h1 className='text-center title text-uppercase mt-5'>Top 10 ideas most commented</h1>

      {
        theMostCommented.length > 0 &&
        theMostCommented.map((idea, index) =>
          <div >
            <h2 className='top mt-5 btn btn-warning fw-bold text-uppercase ' >{`Position N°${index + 1}`}</h2>
            <a href={`/idea/${idea._id}`} key={idea._id} style={{ textDecoration: 'none' }}>
              <Idea data={idea} key={idea._id} />
            </a>
          </div>
        )
      }

    </div>
  )
}

