import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import SuspendedorReportedUsers from '../../components/admin/SuspendedorReportedUsers'

const Admin = ({ type }) => {
  const token = document.cookie.replace('token=', '');
  const [initialLoading, setInitialLoading] = useState(true);
  setTimeout(()=>{
      setInitialLoading(false);
          },500)

  const [page, setPage] = useState(2);
  const [data, setData] = useState([])
  const [newData, setNewData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const { REACT_APP_API_URL } = process.env;
  useEffect(() => {

    axios.get(REACT_APP_API_URL + '/' + type, {
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/')
        }

      })

  }, [])

  const updateData = () => {
    const haveNewPagesBoolean = false;
    setPage(page + 1)
    return haveNewPagesBoolean;
  }


  return (
    <div className='container mt-5'>
      {initialLoading === false ? 
      <>
      <h1 className='title text-center mb-5'>{type} {type === 'reported' ? "ideas" : "users"}</h1>

<div className="d-flex 
justify-content-between flex-wrap align-items-center">
  {data.length > 0 ? data.map((el) => {
    return <SuspendedorReportedUsers type={type} data={el} />
  })
:
<h1 className='text-center container text-secondary'>No Data</h1>
  }

</div>
{isLoading ?
  <div className="d-flex justify-content-center">

    <Loading></Loading>
  </div> :
  <div className="d-flex justify-content-center">
    {!newData || newData === false ?
      <h1 >No more data!</h1>
      :
      <button className="btn btn-outline-primary" onClick={() => {
        setIsLoading(true)

        setTimeout(() => {
          if (!updateData()) {
            setTimeout(() => {
              setNewData(false);

            }, 500)
          }
          setIsLoading(false)

        }, 500)

      }}>Load more </button>

    }

  </div>
}

      
      </>:
      <Loading/>}
      
    </div>
  )
}

export default Admin