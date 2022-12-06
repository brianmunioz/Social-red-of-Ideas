import React, { useState, useMemo } from "react";

import axios from "axios";
const IdeaContext = React.createContext();

export function IdeaProvider(props) {
  const {REACT_APP_API_URL} = process.env;
  const [ideas, setIdeas] = useState([]);
  const [login,setLogin] = useState(false);
  let login_out;
  function getIdeas() {
    axios.get(REACT_APP_API_URL+'idea')
      .then(dat => {
        setIdeas(dat.data);
      })
      .catch(console.log)
  }

  const value = useMemo(() => {
    return ({
      getIdeas,
      setIdeas,
      ideas,
      login,
      setLogin,
      login_out
    })
  }, [ideas])
  return <IdeaContext.Provider value={value} {...props} />
}

export function useIdea() {
  const context = React.useContext(IdeaContext);
  if (!context) {
    throw new Error('useIdea need to be inside the provider');
  }
  return context;
}