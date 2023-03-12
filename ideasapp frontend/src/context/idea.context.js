import React, { useState, useMemo } from "react";

import axios from "axios";
const IdeaContext = React.createContext();

export function IdeaProvider(props) {
  const { REACT_APP_API_URL } = process.env;
  const [ideas, setIdeas] = useState([]);
  const [login, setLogin] = useState(false);

  let login_out;
  function getIdeas(page, size) {
    if (!size) {
      size = 5;
    }

    axios.get(REACT_APP_API_URL + 'idea/?pageSize=' + size + '&pageNum=' + page)
      .then(dat => {
        if (page > 1) {
          const dataIdeas = ideas;
          if (dat.data.length === 0) {
            return false;
          }
          else {
            const newDataUpload = dataIdeas.concat(dat.data);
            setIdeas(newDataUpload)
            return true
          }
        } else {
          setIdeas(dat.data);
          return true
        }
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