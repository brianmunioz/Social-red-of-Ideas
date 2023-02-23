import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useIdea, IdeaProvider } from '../../context/idea.context'
import IdeaPreview from '../idea/IdeaPreview';
import './index.css'
export default () => <IdeaProvider>
  <Searcher></Searcher>
</IdeaProvider>

const Searcher = () => {
  const [searchString, setSearchString] = useState('');
  const [checkAuthor, setCheckAuthor] = useState(false);
  const [checkIdea, setCheckIdea] = useState(false);
  const [checkDescription, setCheckDescription] = useState(false);


  const [results, setResults] = useState('');
  const { getIdeas,
    ideas } = useIdea();
  useEffect(() => {
    getIdeas();
  }, [])
  function search(e) {
    e.preventDefault();
    let ideasResponse;
    if ((checkAuthor && checkDescription && checkIdea) || (!checkAuthor && !checkDescription && !checkIdea)) {
      ideasResponse = ideas.filter(el => el.idea.toLowerCase().includes(searchString.trim()) || el.description.toLowerCase().includes(searchString.trim()) || el.author.username.toLowerCase().includes(searchString.trim()))

    } else if (checkAuthor && !checkDescription && !checkIdea) {
      ideasResponse = ideas.filter(el => el.author.username.toLowerCase().includes(searchString.trim()))

    } else if (checkAuthor && checkDescription && !checkIdea) {
      ideasResponse = ideas.filter(el => el.description.toLowerCase().includes(searchString.trim()) || el.author.username.toLowerCase().includes(searchString.trim()))

    } else if (checkAuthor && !checkDescription && checkIdea) {
      ideasResponse = ideas.filter(el => el.idea.toLowerCase().includes(searchString.trim()) || el.author.username.toLowerCase().includes(searchString.trim()))
    } else if (checkIdea && !checkDescription && !checkAuthor) {
      ideasResponse = ideas.filter(el => el.idea.toLowerCase().includes(searchString.trim()))
    } else if (!checkIdea && checkDescription && checkAuthor) {
      ideasResponse = ideas.filter(el => el.description.toLowerCase().includes(searchString.trim()) || el.author.username.toLowerCase().includes(searchString.trim()))

    } else if (checkIdea && checkDescription && !checkAuthor) {
      ideasResponse = ideas.filter(el => el.idea.toLowerCase().includes(searchString.trim()) || el.description.toLowerCase().includes(searchString.trim()))

    } else if (!checkIdea && checkDescription && !checkAuthor) {
      ideasResponse = ideas.filter(el => el.description.toLowerCase().includes(searchString.trim()))

    } else if (checkAuthor && !checkDescription && checkDescription) {
      ideasResponse = ideas.filter(el => el.idea.toLowerCase().includes(searchString.trim()) || el.author.username.toLowerCase().includes(searchString.trim()))

    }
    setResults(ideasResponse)

  }
  return (
    <div className='container'>
      <form onSubmit={search} className="d-flex justify-content-center mt-5 mb-0">
        <div className="d-flex w-100 justify-content-center mb-5">
          <input type="text" value={searchString} onChange={(e) => {
            setSearchString(e.target.value.toLowerCase());
            search(e);
          }} style={{
            border: '0px',
            borderBottom: '2px solid black',
            background: 'transparent',
            outline: 'none',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '20px',
            width: '100%'
          }} placeholder="Search idea by title, author or description" />
        </div>
        {searchString && searchString.trim() !== '' ?
          <Button onClick={e => setSearchString('')} variant='transparent' className=" rounded-0 bg-transparent mr-1 mb-5 fw-bold" style={{
            marginRight: '20px',
            border: '0px', borderBottom: '2px solid black'
          }}>
            x
          </Button> :
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" style={{
            marginRight: '20px',
            border: '0px', borderBottom: '2px solid black',
            height: '52px',
            width: '20px'
          }}> <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path> </svg>

        }


        <input type="submit" value="Search"
          className='d-none' />
      </form>
      <div className="d-flex justify-content-between pb-5" style={{ maxWidth: '310px' }}>

        {checkAuthor === false ? <label htmlFor="author" className="text-white fw-bold rounded checkGrey">Author</label>
          : <label htmlFor="author" className="text-dark fw-bold rounded checkSelected">Author</label>
        }
        <input type="checkbox" className='d-none' name="author" id="author" value={checkAuthor} onChange={ e => {

           setCheckAuthor(e.target.checked);
          search(e);
        }} />


        {checkIdea === false ? <label htmlFor="idea" className="text-white fw-bold rounded checkGrey">Idea</label>
          : <label htmlFor="idea" className="text-dark fw-bold rounded checkSelected">Idea</label>
        }
        <input type="checkbox" className='d-none' name="idea" id="idea" value={checkIdea} onChange={e => {

          setCheckIdea(e.target.checked);
          search(e);
        }} />


        {checkDescription === false ? <label htmlFor="description" className="text-white fw-bold rounded checkGrey">Description</label> :
          <label htmlFor="description" className="text-dark fw-bold rounded checkSelected">Description</label>


        }

        <input type="checkbox" className='d-none' name="description" id="description" value={checkDescription} onChange={e => {

          setCheckDescription(e.target.checked);
          search(e);
        }} />

      </div>

      <div className='pb-5'>
        {results.length >= 0 && results && searchString.trim() !== '' && results.map((el) => { return <IdeaPreview id={el._id} idea={el.idea} description={el.description} maxChar="150"></IdeaPreview> })}
        {results.length === 0 && searchString.trim() !== '' && <h2 className='text-center'>No results found for "{searchString}"</h2>}
      </div>
    </div>
  )
}

