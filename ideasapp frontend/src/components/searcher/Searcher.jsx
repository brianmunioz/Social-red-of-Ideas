import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useIdea, IdeaProvider } from '../../context/idea.context'
import IdeaPreview from '../idea/IdeaPreview';
export default () => <IdeaProvider>
  <Searcher></Searcher>
</IdeaProvider>

const Searcher = () => {
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState('');
  const { getIdeas,
    ideas } = useIdea();
  useEffect(() => {
    getIdeas();
  }, [])
  function search(e) {
    e.preventDefault();
    const ideasResponse = ideas.filter(el => el.idea.toLowerCase().includes(searchString.trim()) || el.description.toLowerCase().includes(searchString.trim()))
    setResults(ideasResponse)

  }
  return (
    <div className='container'>
      <form onSubmit={search} className="d-flex justify-content-center mt-5 mb-5">
        <div className="d-flex justify-content-center">
          <input type="text" value={searchString} onChange={(e) => {
              setSearchString(e.target.value.toLowerCase());
            search(e);
          }} style={{
            border: '0px',
            borderBottom: '2px solid black',
            background: 'transparent',
            outline: 'none',
            padding: '10px 20px',
            fontWeight: 'bold',
            fontSize: '20px',
            width: '100%'
          }} placeholder="Search by idea, author or description" />
        </div>
        {searchString && searchString.trim() !== '' ?
          <Button onClick={e => setSearchString('')} variant='transparent' className=" rounded-0 bg-transparent mr-1 fw-bold" style={{
            marginRight: '20px',
            border: '0px', borderBottom: '2px solid black'
          }}>
            x
          </Button>:
           <Button onClick={e => setSearchString('')} variant='transparent' className=" rounded-0  bg-transparent mr-1 fw-bold" style={{
            marginRight: '20px',
            border: '0px', borderBottom: '2px solid black',cursor: 'text',color:'transparent'
          }}>
             x
          </Button>

        }


        <input type="submit" value="Search"
          className='d-none' />
      </form>
      <div >
        {results.length >= 0 && results && searchString.trim() !== '' && results.map((el) => { return <IdeaPreview id={el._id} idea={el.idea} description={el.description} maxChar="150"></IdeaPreview> })}
        {results.length === 0 && searchString.trim() !== '' && <h2 className='text-center'>No results found for "{searchString}"</h2>}
      </div>
    </div>
  )
}

